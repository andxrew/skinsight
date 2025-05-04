import * as SQLite from "expo-sqlite"
import { v4 as uuidv4 } from "uuid"

// Database reference
let db: SQLite.SQLiteDatabase | null = null

// Scan Result Interface
export interface ScanResult {
	id: string
	imageUri: string
	diagnosis: "Benign" | "Malignant"
	date: string
	confidence?: number
	tags?: string[]
}

// Initialize Database
export async function initHistoryTable() {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	// Add 'tags' column if it doesn't already exist
	await db!.runAsync(`ALTER TABLE scans ADD COLUMN tags TEXT;`).catch(() => {})

	await db.withTransactionAsync(async () => {
		await db!.runAsync(`
      CREATE TABLE IF NOT EXISTS scans (
        id TEXT PRIMARY KEY NOT NULL,
        imageUri TEXT,
        diagnosis TEXT,
        date TEXT,
        confidence INTEGER,
        tags TEXT
      );
    `)
	})
}

// Save a Scan
export async function saveScanResult(scan: ScanResult) {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	try {
		await db.withTransactionAsync(async () => {
			await db!.runAsync(
				`INSERT INTO scans (id, imageUri, diagnosis, date, confidence, tags) VALUES (?, ?, ?, ?, ?, ?);`,
				[
					scan.id,
					scan.imageUri,
					scan.diagnosis,
					scan.date,
					scan.confidence ?? null,
					JSON.stringify(scan.tags ?? []), // Save as JSON string
				]
			)
		})
	} catch (error) {
		console.error("🔥 Error saving scan to DB:", error)
	}
}

// Update Tags for Existing Scan
export async function updateScanTags(scanId: string, tags: string[]) {
	if (!db) db = await SQLite.openDatabaseAsync("skinsight.db")
	await db.withTransactionAsync(async () => {
		await db!.runAsync(`UPDATE scans SET tags = ? WHERE id = ?;`, [
			JSON.stringify(tags),
			scanId,
		])
	})
}

// Load History
export async function loadScanHistory(): Promise<ScanResult[]> {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	const result = await db.getAllAsync<any>(
		`SELECT * FROM scans ORDER BY date DESC;`
	)
	return result.map((scan) => ({
		...scan,
		tags: scan.tags ? JSON.parse(scan.tags) : [],
	}))
}

// Load only the latest scan
export async function loadLatestScan(): Promise<ScanResult | null> {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	const result = await db.getFirstAsync<any>(
		`SELECT * FROM scans ORDER BY date DESC LIMIT 1;`
	)
	if (!result) return null

	return {
		...result,
		tags: result.tags ? result.tags.split(",") : [],
	}
}

// Clear History
export async function clearScanHistory() {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	await db.withTransactionAsync(async () => {
		await db!.runAsync(`DELETE FROM scans;`)
	})
}

// Delete Single Scan
export async function clearSingleScan(id: string) {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	await db.withTransactionAsync(async () => {
		await db!.runAsync(`DELETE FROM scans WHERE id = ?;`, [id])
	})
}

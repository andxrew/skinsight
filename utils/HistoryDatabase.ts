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
}

// Initialize Database
export async function initHistoryTable() {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	await db.withTransactionAsync(async () => {
		await db!.runAsync(`
      CREATE TABLE IF NOT EXISTS scans (
        id TEXT PRIMARY KEY NOT NULL,
        imageUri TEXT,
        diagnosis TEXT,
        date TEXT,
        confidence INTEGER
      );
    `)
	})
}

// Save a Scan
export async function saveScanResult(scan: ScanResult) {
	console.log("🛠 Attempting to save scan to DB:", scan)

	if (!db) {
		console.log("⚠️ DB is null, opening DB...")
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	try {
		await db.withTransactionAsync(async () => {
			console.log("🚀 Starting DB transaction...")
			await db!.runAsync(
				`INSERT INTO scans (id, imageUri, diagnosis, date, confidence) VALUES (?, ?, ?, ?, ?);`,
				[
					scan.id,
					scan.imageUri,
					scan.diagnosis,
					scan.date,
					scan.confidence ?? null,
				]
			)
			console.log("✅ Scan INSERTED into database successfully!")
		})
	} catch (error) {
		console.error("🔥 Error saving scan to DB:", error)
	}
}

// Load History
export async function loadScanHistory(): Promise<ScanResult[]> {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	const result = await db.getAllAsync<ScanResult>(
		`SELECT * FROM scans ORDER BY date DESC;`
	)
	return result // ✅ result itself is the ScanResult[]
}

// Load only the latest scan
export async function loadLatestScan(): Promise<ScanResult | null> {
	if (!db) {
		db = await SQLite.openDatabaseAsync("skinsight.db")
	}

	const result = await db.getFirstAsync<ScanResult>(
		`SELECT * FROM scans ORDER BY date DESC LIMIT 1;`
	)

	return result ?? null
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

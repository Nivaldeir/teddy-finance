import fs from "fs";
import { PgAdapter } from "../infra/database/PgAdapter";
import path from "path";
const runMigration = async () => {
  try {
    const pgp = new PgAdapter(
      `postgresql://${process.env.WSRS_DATABASE_USER}:${process.env.WSRS_DATABASE_PASSWORD}@${process.env.WSRS_DATABASE_HOST}:${process.env.WSRS_DATABASE_PORT}/${process.env.WSRS_DATABASE_NAME}`
    );
    const sqlPath = path.join(__dirname, "../../init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    await pgp.query(sql);
    console.log("Migration script executed successfully");
  } catch (error) {
    console.error("Error executing migration script:", error);
  } 
};

runMigration();

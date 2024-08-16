import fs from "fs";
import { PgAdapter } from "../src/infra/database/PgAdapter";
const createTable = async (client: PgAdapter) => {
  const sql = fs.readFileSync(process.cwd()+"/init.sql", "utf8");
  await client.query(sql);
};

console.log("testing working...");
export { createTable };

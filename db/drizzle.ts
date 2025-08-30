// import { drizzle } from "drizzle-orm/neon-http";
// import { schema } from "./schema";

// export const db = drizzle(process.env.DATABASE_URL! , {schema});


// ✅ CORRECT - Create Neon SQL client first
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

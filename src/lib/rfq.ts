import { db } from "@/lib/db";

export async function generateRFQNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await db.rFQ.count();
  const seq = String(count + 1).padStart(4, "0");
  return `VC-${year}-${seq}`;
}

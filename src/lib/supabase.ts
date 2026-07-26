import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials not configured. Using local data fallback.");
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      })
    : null;

export async function queryTable<T>(table: string): Promise<T[]> {
  if (!supabase) return [];
  const { data } = await supabase.from(table).select("*");
  return (data as T[]) || [];
}

export async function insertRecord(table: string, record: Record<string, unknown>) {
  if (!supabase) return null;
  const { data } = await supabase.from(table).insert(record).select().single();
  return data;
}

export async function updateRecord(table: string, id: string, record: Record<string, unknown>) {
  if (!supabase) return null;
  const { data } = await supabase.from(table).update(record).eq("id", id).select().single();
  return data;
}

export async function deleteRecord(table: string, id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from(table).delete().eq("id", id);
  return !error;
}

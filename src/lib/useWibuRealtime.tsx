import {
  createClient,
  RealtimeChannel,
  SupabaseClient
} from "@supabase/supabase-js";
import { jwtVerify } from "jose";
import { useEffect, useRef, useState } from "react";

interface UseClientRealtimeProps {
  WIBU_REALTIME_TOKEN: string;
  project: "sdm" | "hipmi";
}

export function useWibuRealtime({
  WIBU_REALTIME_TOKEN,
  project
}: UseClientRealtimeProps) {
  // Ref untuk menyimpan klien Supabase
  const supabaseRef = useRef<SupabaseClient | null>(null);
  // Ref untuk menyimpan channel realtime
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [currentData, setCurrentData] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeRealtime = async () => {
      try {

        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3p5aml4c2J1c2diYnR2am9namhvLnN1cGFiYXNlLmNvIiwia2V5IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW5wNWFtbDRjMkoxYzJkaVluUjJhbTluYW1odklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTWpZM016azFORFVzSW1WNGNDSTZNakEwTWpNeE5UVTBOWDAuakhOVzVQd2hqLUtYVVFPTXF6SUxhQXo2MmszeGxLRUw1WEtFNHhvUjdYYyJ9.liCfw07nhEx_us1tV82I_osAQZxcMlolsOBA016A6S0";

        // Verifikasi JWT
        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(WIBU_REALTIME_TOKEN)
        );

        // Pastikan payload memiliki 'url' dan 'key'
        const { url, key } = payload as any;

        // Membuat klien Supabase dan menyimpannya dalam ref
        const supabase = createClient(url, key);
        supabaseRef.current = supabase;

        // Berlangganan ke channel realtime
        const channel = supabase
          .channel(project)
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: project },
            (payload: any) => {
              const data = payload.new?.data ?? null;
              if (isMounted) {
                setCurrentData(data);
              }
            }
          )
          .subscribe();

        // Menyimpan channel dalam ref untuk cleanup nanti
        channelRef.current = channel;
      } catch (error) {
        console.error("Error initializing realtime:", error);
      }
    };

    initializeRealtime();

    // Fungsi cleanup untuk useEffect
    return () => {
      isMounted = false;
      if (channelRef.current && supabaseRef.current) {
        supabaseRef.current.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      supabaseRef.current = null;
    };
  }, [WIBU_REALTIME_TOKEN, project]);

  // Fungsi untuk melakukan upsert data
  async function upsertData(val: Record<string, any>) {
    // Pertimbangkan untuk mengganti 'any' dengan type yang lebih spesifik
    const supabase = supabaseRef.current;
    if (!supabase) {
      console.error("Supabase client not initialized");
      return null;
    }

    try {
      const { status, error } = await supabase.from(project).upsert({
        id: "123e4567-e89b-12d3-a456-426614174000", // Gantilah ini sesuai kebutuhan atau buat dinamis
        data: val
      });

      if (error) {
        console.error("Error upserting data:", error);
        return null;
      } else {
        return {
          status,
          val
        };
      }
    } catch (error) {
      console.error("Error performing upsert:", error);
      return null;
    }
  }

  // Mengembalikan currentData dan fungsi upsertData sebagai array
  return [currentData, upsertData] as const;
}

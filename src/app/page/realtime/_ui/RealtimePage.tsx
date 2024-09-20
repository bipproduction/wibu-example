"use client";
import { useWibuRealtime } from "@/lib/useWibuRealtime";
import { Button, Group, Stack } from "@mantine/core";

const secret = "padahariminggukuturutayahkekotanaikdelmanistimewakududukdimuka";
// async function useClientRealtime({
//   WIBU_REALTIME_TOKEN,
//   project,
//   onData
// }: {
//   WIBU_REALTIME_TOKEN: string;
//   project: "sdm" | "hipmi";
//   onData: (data: any | null) => void;
// }) {
//   const token =
//     "eyJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3p5aml4c2J1c2diYnR2am9namhvLnN1cGFiYXNlLmNvIiwia2V5IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW5wNWFtbDRjMkoxYzJkaVluUjJhbTluYW1odklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTWpZM016azFORFVzSW1WNGNDSTZNakEwTWpNeE5UVTBOWDAuakhOVzVQd2hqLUtYVVFPTXF6SUxhQXo2MmszeGxLRUw1WEtFNHhvUjdYYyJ9.liCfw07nhEx_us1tV82I_osAQZxcMlolsOBA016A6S0";
//   const { url, key }: any = await jwtVerify(
//     token,
//     new TextEncoder().encode(WIBU_REALTIME_TOKEN)
//   );
//   const supabase = createClient(url, key);

//   useShallowEffect(() => {
//     const handleInserts = (payload: any) => {
//       const data = payload.new.data;
//       onData(data);
//     };

//     // Subscribe to realtime changes
//     const messageSubscription = supabase
//       .channel(project)
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: project },
//         handleInserts
//       )
//       .subscribe();

//     // Cleanup subscription on unmount
//     return () => {
//       supabase.removeChannel(messageSubscription);
//     };
//   }, []);
// }

export function RealtimePage() {
  //   async function onKLirim() {
  //     const { status, error } = await supabase.from("sdm").upsert({
  //       id: "123e4567-e89b-12d3-a456-426614174000",
  //       data: {
  //         name: "wibu 2"
  //       }
  //     });

  //     if (error) {
  //       console.error("Error:", JSON.stringify(error));
  //     } else {
  //       console.log("Upsert status:", status);
  //     }
  //   }

  const [data, setData] = useWibuRealtime({
    project: "hipmi",
    WIBU_REALTIME_TOKEN: secret
  });

  return (
    <Stack p={"lg"}>
      {JSON.stringify(data)}
      <Group>
        <Stack>
          Realtime page
          <Button onClick={() => setData({ name: Math.random().toString() })}>Kirim</Button>
        </Stack>
      </Group>
    </Stack>
  );
}

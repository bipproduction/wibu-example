import { jwtVerify, SignJWT } from "jose";
const secret =
  "padahariminggukuturutayahkekotanaikdelmanistimewakududukdimuka";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3p5aml4c2J1c2diYnR2am9namhvLnN1cGFiYXNlLmNvIiwia2V5IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW5wNWFtbDRjMkoxYzJkaVluUjJhbTluYW1odklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTWpZM016azFORFVzSW1WNGNDSTZNakEwTWpNeE5UVTBOWDAuakhOVzVQd2hqLUtYVVFPTXF6SUxhQXo2MmszeGxLRUw1WEtFNHhvUjdYYyJ9.liCfw07nhEx_us1tV82I_osAQZxcMlolsOBA016A6S0";

(async () => {
    // decript()
    // encrypt()
})();

async function encrypt() {
  const jwt = await new SignJWT({
    url: "https://zyjixsbusgbbtvjogjho.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5aml4c2J1c2diYnR2am9namhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mzk1NDUsImV4cCI6MjA0MjMxNTU0NX0.jHNW5Pwhj-KXUQOMqzILaAz62k3xlKEL5XKE4xoR7Xc"
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(secret));

  console.log(jwt);
}

async function decript() {
  const data = await jwtVerify(token, new TextEncoder().encode(secret));
  console.log(data.payload);
}

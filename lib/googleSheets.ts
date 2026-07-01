import { google } from "googleapis";

interface LeadData {
  name: string;
  whatsapp: string;
  date: string;
  source?: string;
}

export async function appendLeadToSheet(data: LeadData) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !rawKey || !sheetId) {
    throw new Error(
      "Variables d'environnement Google manquantes (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID)."
    );
  }

  const auth = new google.auth.JWT({
    email,
    // Vercel stocke les sauts de ligne comme "\n" littéral, il faut les reconvertir
    key: rawKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    // "Leads" doit être le nom exact de l'onglet dans votre Google Sheet
    range: "Leads!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[data.date, data.name, data.whatsapp, data.source ?? "landing-page"]],
    },
  });
}
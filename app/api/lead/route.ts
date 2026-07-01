import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/googleSheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body.name ?? "").toString().trim();
    const whatsapp = (body.whatsapp ?? "").toString().trim();

    if (name.length < 2) {
      return NextResponse.json({ error: "Veuillez entrer un nom valide." }, { status: 400 });
    }

    // Accepte +228 91 90 28 24, 90902824, etc.
    const phoneRegex = /^[+]?[\d\s-]{8,16}$/;
    if (!phoneRegex.test(whatsapp)) {
      return NextResponse.json({ error: "Veuillez entrer un numéro WhatsApp valide." }, { status: 400 });
    }

    await appendLeadToSheet({
      name,
      whatsapp,
      date: new Date().toLocaleString("fr-FR", { timeZone: "Africa/Lome" }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur capture lead:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
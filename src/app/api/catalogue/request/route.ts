import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendCatalogueNotification, sendCatalogueConfirmation } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, phone, company, pdfUrl } = data;

        if (!name || !email || !phone || !company) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const fallbackPdfUrl = "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/datasheets/safetyppe.pdf";
        const targetPdfUrl = pdfUrl || fallbackPdfUrl;

        // 1. Save data to database
        const request = await db.catalogueRequest.create({
            data: {
                name,
                email,
                phone,
                company,
                pdfUrl: targetPdfUrl,
                approved: false,
            },
        });

        // 2. Send notification to admin
        await sendCatalogueNotification({
            id: request.id,
            name,
            email,
            phone,
            company,
            pdfUrl: targetPdfUrl,
        });

        // 3. Send confirmation to user
        await sendCatalogueConfirmation({
            name,
            email,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("[Catalogue Request API Error]:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}

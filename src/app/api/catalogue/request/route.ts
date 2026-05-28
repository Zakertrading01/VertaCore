import { NextResponse } from "next/server";
import { sendCatalogueNotification, sendCatalogueConfirmation } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, phone, company } = data;

        if (!name || !email || !phone || !company) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 1. Send notification to admin
        await sendCatalogueNotification({
            name,
            email,
            phone,
            company,
        });

        // 2. Send confirmation to user
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

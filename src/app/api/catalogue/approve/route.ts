import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendCataloguePDFEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const pdfUrl = searchParams.get("pdfUrl");

        if (!id) {
            return new NextResponse("Missing request ID", { status: 400 });
        }

        // Find the request first
        const request = await db.catalogueRequest.findUnique({
            where: { id },
        });

        if (!request) {
            return new NextResponse("Catalogue request not found.", { status: 404 });
        }

        if (request.approved) {
            return new NextResponse(
                `<html>
                  <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #0A101D; color: #ffffff;">
                    <h1 style="color: #E7C85A; margin-bottom: 20px;">Already Approved</h1>
                    <p style="font-size: 16px; color: #94a3b8;">This request for <strong>${request.name}</strong> (${request.email}) has already been approved and the catalogue was sent.</p>
                  </body>
                </html>`,
                { headers: { "Content-Type": "text/html" } }
            );
        }

        const fallbackPdfUrl = "https://pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev/datasheets/safetyppe.pdf";
        const finalPdfUrl = pdfUrl || request.pdfUrl || fallbackPdfUrl;

        // Update the status in the database
        await db.catalogueRequest.update({
            where: { id },
            data: {
                approved: true,
                pdfUrl: finalPdfUrl,
            },
        });

        // Send the PDF catalogue to the requested user's email
        await sendCataloguePDFEmail({
            name: request.name,
            email: request.email,
            pdfUrl: finalPdfUrl,
        });

        return new NextResponse(
            `<html>
              <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #0A101D; color: #ffffff;">
                <h1 style="color: #10b981; margin-bottom: 20px;">Request Approved Successfully!</h1>
                <p style="font-size: 16px; color: #e2e8f0; margin-bottom: 10px;">Catalogue request for <strong>${request.name}</strong> has been approved.</p>
                <p style="font-size: 14px; color: #94a3b8;">The PDF download email was sent to: <strong>${request.email}</strong>.</p>
                <p style="margin-top: 30px;">
                  <a href="${finalPdfUrl}" target="_blank" style="color: #E7C85A; font-weight: bold; text-decoration: none; border: 1px solid #E7C85A; padding: 10px 20px; border-radius: 6px; display: inline-block;">View the Sent PDF</a>
                </p>
              </body>
            </html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    } catch (err: any) {
        console.error("[Catalogue Approval API Error]:", err);
        return new NextResponse("An error occurred during approval processing.", { status: 500 });
    }
}

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "noreply@vertacore.com";
const SALES = process.env.EMAIL_SALES ?? "sales@vertacore.com";

export interface RFQEmailData {
  rfqNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  country?: string;
  industry?: string;
  items: string;
  message?: string;
}

export async function sendRFQNotification(data: RFQEmailData) {
  await resend.emails.send({
    from: FROM,
    to: SALES,
    replyTo: data.email,
    subject: `New RFQ ${data.rfqNumber} — ${data.company}`,
    html: buildRFQNotificationHtml(data),
  });
}

export async function sendRFQConfirmation(data: RFQEmailData) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Your RFQ has been received — ${data.rfqNumber}`,
    html: buildRFQConfirmationHtml(data),
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: SALES,
    replyTo: data.email,
    subject: `Contact: ${data.subject} — ${data.name}`,
    html: `
      <h2>New Contact Enquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr />
      <p>${data.message.replace(/\n/g, "<br />")}</p>
    `,
  });
}

function buildRFQNotificationHtml(data: RFQEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; color: #102544;">
  <div style="background: #102544; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #E7C85A; margin: 0; font-size: 20px;">New Request for Quotation</h1>
    <p style="color: #94a3b8; margin: 4px 0 0;">${data.rfqNumber}</p>
  </div>
  <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #64748b;">Company</td><td style="padding: 8px 0; font-weight: 600;">${data.company}</td></tr>
      ${data.jobTitle ? `<tr><td style="padding: 8px 0; color: #64748b;">Job Title</td><td style="padding: 8px 0;">${data.jobTitle}</td></tr>` : ""}
      ${data.phone ? `<tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
      ${data.country ? `<tr><td style="padding: 8px 0; color: #64748b;">Country</td><td style="padding: 8px 0;">${data.country}</td></tr>` : ""}
      ${data.industry ? `<tr><td style="padding: 8px 0; color: #64748b;">Industry</td><td style="padding: 8px 0;">${data.industry}</td></tr>` : ""}
    </table>
    <div style="background: #f8fafc; border-left: 3px solid #E7C85A; padding: 16px; margin-top: 16px; border-radius: 0 4px 4px 0;">
      <p style="color: #64748b; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Items Requested</p>
      <p style="margin: 0;">${data.items.replace(/\n/g, "<br />")}</p>
    </div>
    ${data.message ? `<div style="margin-top: 16px;"><p style="color: #64748b; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Additional Notes</p><p style="margin: 0;">${data.message.replace(/\n/g, "<br />")}</p></div>` : ""}
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
      <a href="https://vertacore.com/admin/rfq" style="background: #E7C85A; color: #102544; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">View in Admin Panel →</a>
    </div>
  </div>
</body>
</html>`;
}

function buildRFQConfirmationHtml(data: RFQEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; color: #102544;">
  <div style="background: #102544; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #E7C85A; margin: 0; font-size: 20px;">VERTACORE</h1>
    <p style="color: #94a3b8; margin: 4px 0 0;">MRO Industrial Supply & Procurement</p>
  </div>
  <div style="background: #fff; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
    <h2 style="margin: 0 0 16px; color: #102544;">We've received your enquiry.</h2>
    <p style="color: #64748b; line-height: 1.6;">Thank you, ${data.firstName}. Your request for quotation has been received and is being reviewed by our team.</p>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 24px 0;">
      <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Reference Number</p>
      <p style="margin: 8px 0 0; font-size: 20px; font-weight: 700; color: #102544;">${data.rfqNumber}</p>
    </div>
    <p style="color: #64748b; line-height: 1.6;">Our technical team will review your requirements and respond within <strong>24 business hours</strong>.</p>
    <p style="color: #64748b; line-height: 1.6;">If you have urgent requirements or wish to speak with our team directly, please contact us at <a href="mailto:${SALES}" style="color: #102544;">${SALES}</a>.</p>
    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">VERTACORE — ISO 9001:2015 Certified Industrial Supply</p>
      <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;"><a href="https://vertacore.com" style="color: #94a3b8;">vertacore.com</a></p>
    </div>
  </div>
</body>
</html>`;
}

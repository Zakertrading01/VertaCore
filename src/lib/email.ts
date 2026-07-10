import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = process.env.EMAIL_FROM ?? "noreply@vertacore.ae";
const SALES = process.env.EMAIL_SALES ?? "info@vertacore.ae";
const COMPANY_PHONE = "+971 02 886 4430";
const COMPANY_ADDRESS =
  "P.O. Box 3705, 11th Floor, Office No. 44, Trustwell Properties,<br>Dar Al Salam Bldg, Liwa St, Corniche<br>Abu Dhabi, United Arab Emirates";

const ASSETS = {
  logo: "https://assets.vertacore.ae/public/images/image.png",
  certs: "https://assets.vertacore.ae/public/images/vertacore-certs.png",
  iconPhone: "https://assets.vertacore.ae/public/images/icon-phone.png",
  iconEmail: "https://assets.vertacore.ae/public/images/icon-email.png",
  iconWeb: "https://assets.vertacore.ae/public/images/icon-web.png",
  iconLocation: "https://assets.vertacore.ae/public/images/icon-location.png",
};

/** Shared header (logo on navy) + footer (company block + cert badges) wrapper for customer-facing emails. */
function renderBrandedEmail(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e3e8ee;">
          <tr>
            <td style="background:#102544;padding:14px 32px;text-align:center;">
              <img src="${ASSETS.logo}" alt="Verta Core" width="240" style="display:inline-block;width:240px;height:auto;border:0;">
            </td>
          </tr>
          <tr><td style="height:4px;background:#E7C85A;line-height:4px;font-size:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:36px 32px 8px;color:#243240;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;">
              <div style="border-top:1px solid #e3e8ee;margin-bottom:20px;"></div>
              <table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
                <tr><td colspan="2" style="font-size:13px;font-weight:bold;color:#102544;padding-bottom:8px;">Verta Core General Trading LLC</td></tr>
                <tr>
                  <td valign="middle" style="padding:2px 8px 2px 0;"><img src="${ASSETS.iconPhone}" width="13" height="13" alt="Phone" style="display:block;border:0;"></td>
                  <td valign="middle" style="font-size:12.5px;color:#333;padding:2px 0;">${COMPANY_PHONE}</td>
                </tr>
                <tr>
                  <td valign="middle" style="padding:2px 8px 2px 0;"><img src="${ASSETS.iconEmail}" width="13" height="13" alt="Email" style="display:block;border:0;"></td>
                  <td valign="middle" style="font-size:12.5px;padding:2px 0;"><a href="mailto:${SALES}" style="color:#102544;text-decoration:none;">${SALES}</a></td>
                </tr>
                <tr>
                  <td valign="middle" style="padding:2px 8px 2px 0;"><img src="${ASSETS.iconWeb}" width="13" height="13" alt="Website" style="display:block;border:0;"></td>
                  <td valign="middle" style="font-size:12.5px;padding:2px 0;"><a href="https://www.vertacore.ae" style="color:#102544;text-decoration:none;">www.vertacore.ae</a></td>
                </tr>
                <tr>
                  <td valign="top" style="padding:2px 8px 2px 0;"><img src="${ASSETS.iconLocation}" width="13" height="13" alt="Address" style="display:block;border:0;"></td>
                  <td valign="top" style="font-size:12.5px;color:#333;padding:2px 0;">${COMPANY_ADDRESS}</td>
                </tr>
              </table>
              <div style="margin-top:14px;"><img src="${ASSETS.certs}" alt="Certifications: ICV, ISO 9001:2015, USCB 5169" width="190" style="display:block;width:190px;height:auto;border:0;"></div>
            </td>
          </tr>
        </table>
        <p style="max-width:600px;margin:16px auto 0;font-size:11px;color:#94a3b8;text-align:center;">This is an automated acknowledgement — please do not reply directly to this email.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildContactConfirmationHtml(data: {
  name: string;
  email: string;
  subject: string;
}): string {
  return renderBrandedEmail(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Dear ${data.name},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thank you for reaching out to us. We have received your message regarding "<strong>${data.subject}</strong>".</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Our team will review your enquiry and get back to you within <strong>24 business hours</strong>.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">If you have urgent procurement needs, please reach out to us directly at <a href="mailto:${SALES}" style="color:#102544;font-weight:600;">${SALES}</a>.</p>
    <p style="margin:0;font-size:15px;line-height:1.6;">Best regards,<br><strong>Team Verta Core</strong></p>
  `);
}

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
  await getResend().emails.send({
    from: FROM,
    to: SALES,
    replyTo: data.email,
    subject: `New RFQ ${data.rfqNumber} — ${data.company}`,
    html: buildRFQNotificationHtml(data),
  });
}

export async function sendRFQConfirmation(data: RFQEmailData) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `Your RFQ has been received — ${data.rfqNumber}`,
    html: buildRFQConfirmationHtml(data),
  });
}

export async function sendCatalogueNotification(data: {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  pdfUrl: string;
}) {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const approveUrl = `${baseUrl}/api/catalogue/approve?id=${data.id}&pdfUrl=${encodeURIComponent(data.pdfUrl)}`;

  await getResend().emails.send({
    from: FROM,
    to: SALES,
    replyTo: data.email,
    subject: `Catalogue Request: ${data.company} — ${data.name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #102544;">
        <h2 style="color: #102544;">New Catalogue Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Requested Catalogue:</strong> ${data.pdfUrl}</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p>Click the button below to approve this request and automatically send the catalogue PDF to the client's email:</p>
        <p style="margin: 24px 0;">
          <a href="${approveUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
            Approve & Send Catalogue
          </a>
        </p>
      </div>
    `,
  });
}

export async function sendCataloguePDFEmail(data: {
  name: string;
  email: string;
  pdfUrl: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: "Approved: Your VERTA CORE Catalogue Access",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #102544;">
        <h1 style="color: #E7C85A;">VERTA CORE</h1>
        <p>Dear ${data.name},</p>
        <p>We are pleased to inform you that your request for the <strong>VERTA CORE Product Catalogue</strong> has been approved!</p>
        <p>You can access and download the high-resolution PDF catalogue using the link below:</p>
        <p style="margin: 24px 0;">
          <a href="${data.pdfUrl}" target="_blank" style="background-color: #E7C85A; color: #102544; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
            Download/View Catalogue PDF
          </a>
        </p>
        <p>If the link above does not work, please copy and paste the following URL into your browser's address bar:</p>
        <p><a href="${data.pdfUrl}">${data.pdfUrl}</a></p>
        <br />
        <p>Best regards,<br />Technical Team<br />VERTA CORE</p>
      </div>
    `,
  });
}

export async function sendCatalogueConfirmation(data: {
  name: string;
  email: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: "Request Received: Your VERTA CORE Catalogue Request",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #102544;">
        <h1 style="color: #E7C85A;">VERTACORE</h1>
        <p>Dear ${data.name},</p>
        <p>Thank you for your interest in our range of industrial products. We have received your request for the <strong>VERTA CORE Product Catalogue</strong>.</p>
        <p>Our sales team is reviewing your details. Once approved, you will receive another email containing the download link for the PDF catalogue.</p>
        <p>If you have any urgent procurement enquiries, please do not hesitate to contact us directly at <a href="mailto:${SALES}">${SALES}</a>.</p>
        <br />
        <p>Best regards,<br />Team VERTA CORE</p>
      </div>
    `,
  });
}

function buildContactNotificationHtml(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; color: #102544;">
  <div style="background: #102544; padding: 24px; border-radius: 8px 8px 0 0; text-align:center;">
    <h1 style="color: #E7C85A; margin: 0; font-size: 20px;">New Contact Enquiry</h1>
    <p style="color: #94a3b8; margin: 4px 0 0;">${data.subject}</p>
  </div>
  <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color:#102544;">${data.email}</a></td></tr>
      ${data.company ? `<tr><td style="padding: 8px 0; color: #64748b;">Company</td><td style="padding: 8px 0; font-weight: 600;">${data.company}</td></tr>` : ""}
      ${data.phone ? `<tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
    </table>
    <div style="background: #f8fafc; border-left: 3px solid #E7C85A; padding: 16px; margin-top: 16px; border-radius: 0 4px 4px 0;">
      <p style="color: #64748b; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
      <p style="margin: 0;">${data.message.replace(/\n/g, "<br />")}</p>
    </div>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
      <a href="mailto:${data.email}" style="background: #E7C85A; color: #102544; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${data.name} →</a>
    </div>
  </div>
</body>
</html>`;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  console.log("Sending Contact Notification to Admin:", {
    from: FROM,
    to: SALES,
    replyTo: data.email,
  });

  const res = await getResend().emails.send({
    from: FROM,
    to: SALES,
    replyTo: data.email,
    subject: `Contact: ${data.subject} — ${data.name}`,
    html: buildContactNotificationHtml(data),
  });

  if (res.error) {
    console.error("Resend Error (Admin Notification):", res.error);
    throw new Error(`Failed to send notification: ${res.error.message}`);
  }

  console.log("Contact Notification sent to Admin successfully:", res.data?.id);
}

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  subject: string;
}) {
  console.log("Sending Contact Confirmation to User:", data.email);

  const res = await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `Acknowledgement: ${data.subject}`,
    html: buildContactConfirmationHtml(data),
  });

  if (res.error) {
    console.error("Resend Error (User Confirmation):", res.error);
    // We don't necessarily want to throw here if the admin notification already succeeded,
    // but for debugging, we will.
    throw new Error(`Failed to send confirmation: ${res.error.message}`);
  }

  console.log("Contact Confirmation sent to User successfully:", res.data?.id);
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
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">VERTACORE — Premium Industrial Supply</p>
      <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;"><a href="https://vertacore.com" style="color: #94a3b8;">vertacore.com</a></p>
    </div>
  </div>
</body>
</html>`;
}

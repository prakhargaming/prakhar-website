import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { Webhook } from "svix";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_PROD;

  if (!webhookSecret) {
    console.error("Webhook secret not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  try {
    const headers = {
      "svix-id": req.headers.get("svix-id") || "",
      "svix-timestamp": req.headers.get("svix-timestamp") || "",
      "svix-signature": req.headers.get("svix-signature") || "",
    };

    // Log headers for debugging
    console.log("Received headers:", headers);

    const payload = await req.text();

    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(payload, headers) as any;

    if (evt.type !== "user.created") {
      return NextResponse.json(
        { message: "Skipping non-user.created event" },
        { status: 200 },
      );
    }

    const email = evt.data.email_addresses?.[0]?.email_address;
    const firstName = evt.data.first_name || "there";

    if (!email) {
      return NextResponse.json(
        { error: "No email found in webhook payload" },
        { status: 400 },
      );
    }

    const msg = {
      to: email,
      from: "prakhar@em101.prakhargaming.com",
      subject: "Thanks for Signing Up with prakhargaming.com",
      text: `Hi ${firstName},\n\nI'm Prakhar! I'm really glad you signed up! It means a lot. There's not much going on here as of yet but stay tuned!\n\nBest,\nPrakhar Gaming`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; color: #000000;">
        <table role="presentation" style="width: 100%; border-spacing: 0; margin: 0; padding: 0; background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table role="presentation" style="max-width: 600px; width: 100%; border-spacing: 0; text-align: left; background-color: #ffffff; border: 1px solid #e0e0e0;">
                <tr>
                  <td style="padding: 20px; font-size: 16px; line-height: 1.5; color: #000000;">
                    <h1 style="font-size: 24px; margin: 0 0 20px; color: #000000;">Hi ${firstName},</h1>
                    <p style="margin: 0 0 20px; color: #000000;">
                      I'm really glad you signed up! It means a lot. There's not much going on here as of yet, but stay tuned for updates and exciting content in the future!
                    </p>
                    <p style="margin: 0 0 10px; font-weight: bold; color: #000000;">Best,</p>
                    <p style="margin: 0; font-weight: bold; color: #000000;">Prakhar Gaming</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Webhook error:", error);

    if (error) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

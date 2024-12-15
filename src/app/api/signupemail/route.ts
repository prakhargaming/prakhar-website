import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { Webhook } from 'svix';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_PROD;

  if (!webhookSecret) {
    console.error('Webhook secret not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' }, 
      { status: 500 }
    );
  }

  try {
    const headers = {
      'svix-id': req.headers.get('svix-id') || '',
      'svix-timestamp': req.headers.get('svix-timestamp') || '',
      'svix-signature': req.headers.get('svix-signature') || '',
    };

    // Log headers for debugging
    console.log('Received headers:', headers);

    const payload = await req.text();

    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(payload, headers) as any;

    if (evt.type !== 'user.created') {
      return NextResponse.json(
        { message: 'Skipping non-user.created event' }, 
        { status: 200 }
      );
    }

    const email = evt.data.email_addresses?.[0]?.email_address;
    const firstName = evt.data.first_name || 'there';

    if (!email) {
      return NextResponse.json(
        { error: 'No email found in webhook payload' }, 
        { status: 400 }
      );
    }

    const msg = {
      to: email,
      from: 'prakhar@em101.prakhargaming.com',
      subject: 'Thanks for Signing Up with prakhargaming.com',
      text: `Hi ${firstName},\n\nI'm Prakhar! I'm really glad you signed up! It means a lot. There's not much going on here as of yet but stay tuned!\nBest,\nPrakhar Gaming`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h1 style="font-size: 24px; color: #333;">Welcome to Prakhar Gaming, ${firstName}!</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Hi ${firstName},
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          I'm <strong>Prakhar</strong>! I'm really glad you signed up! It means a lot. There's not much going on here as of yet, but stay tuned for updates and exciting content in the future!
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Thank you for being a part of this journey.
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Best regards,<br />
          <strong>Prakhar Gaming</strong>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          You are receiving this email because you signed up at <a href="https://prakhargaming.com" style="color: #3498db; text-decoration: none;">prakhargaming.com</a>.
        </p>
      </div>
    `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Webhook error:', error);

    if (error) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' }, 
    { status: 405 }
  );
}


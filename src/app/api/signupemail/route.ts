import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { Webhook } from 'svix';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

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
      html: `<p>Hi ${firstName},</p><p>I'm Prakhar! I'm really glad you signed up! It means a lot. There's not much going on here as of yet but stay tuned!</p>Best,</p>Prakhar Gaming`,
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


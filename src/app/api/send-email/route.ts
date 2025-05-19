// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || 'YOUR_MAILGUN_API_KEY', // Use environment variable
      // When you have an EU-domain, you must specify the endpoint:
      // url: "https://api.eu.mailgun.net"
    });

    const data = {
      from: `Contact Form <postmaster@demo.devtogether.eu>`,
      to: ['Volodymyr Chornyi <vchornyy12@gmail.com>'],
      subject: `New Contact Form Submission from ${name || 'Visitor'}`,
      text: `Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Message: ${message}`,
    };

    const response = await mg.messages.create('demo.devtogether.eu', data);

    console.log(response); // logs response data

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

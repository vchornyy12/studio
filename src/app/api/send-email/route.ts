// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email'; // Import the helper function

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');

    // Use the helper function to send the email
    await sendContactFormEmail({ name, email, company, message });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

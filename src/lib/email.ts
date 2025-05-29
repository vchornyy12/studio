import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name?: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactFormEmail({
  name,
  email,
  company,
  message,
}: ContactFormData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified Resend sender email
      to: 'your-receiving-email@example.com', // Replace with the email you want to receive messages
      subject: `New Contact Form Submission from ${name || 'Anonymous'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error sending email with Resend:', error);
      throw new Error(error.message);
    }

    console.log('Email sent successfully with Resend:', data);
    return data;
  } catch (error) {
    console.error('Failed to send email with Resend:', error);
    throw error;
  }
}

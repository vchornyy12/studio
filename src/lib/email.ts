import postmark from 'postmark';

// Initialize Postmark client with the API key from environment variables
// Use `as string` to assert type, as process.env values are strings or undefined
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY as string);

interface SendContactEmailParams {
  name?: string | FormDataEntryValue | null;
  email?: string | FormDataEntryValue | null;
  company?: string | FormDataEntryValue | null;
  message?: string | FormDataEntryValue | null;
}

export async function sendContactFormEmail({ name, email, company, message }: SendContactEmailParams) {
  const emailContent = {
    "From": "info@devtogether.eu", // Replace with your From email
    "To": "info@devtogether.eu", // Replace with your To email
    "Subject": `New Contact Form Submission from ${name || 'Visitor'}`,
    "HtmlBody": `<strong>Name:</strong> ${name}<br>
                 <strong>Email:</strong> ${email}<br>
                 <strong>Company:</strong> ${company || 'N/A'}<br>
                 <strong>Message:</strong> ${message}`,
    "TextBody": `Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Message: ${message}`,
    "MessageStream": "outbound" // Assuming you have an 'outbound' message stream
  };

  try {
    const response = await postmarkClient.sendEmail(emailContent);
    console.log('Contact form email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    // Re-throw the error so the calling function can handle it
    throw error;
  }
}
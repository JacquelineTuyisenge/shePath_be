import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to: string, message: string): Promise<any> => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
      to: to, // The recipient's phone number
    });

    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('SMS sending failed');
  }
};

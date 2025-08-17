import { config } from 'dotenv';
config();

// IMPORTANT: The following imports must come AFTER dotenv has been configured.
import '@/lib/firebase-admin'; // Ensures admin SDK is initialized early.
import '@/ai/flows/generate-quiz.ts';
import '@/ai/flows/register-device.ts';

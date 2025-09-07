
'use server';

/**
 * @fileOverview A Genkit flow for tracking student interaction with videos.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { adminDB } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';


export const TrackVideoEventInputSchema = z.object({
  studentId: z.string().describe('The UID of the student.'),
  courseId: z.string().describe('The ID of the course.'),
  videoId: z.string().describe('A unique identifier for the video being watched.'),
  event: z.string().describe('The type of event (e.g., "videoStarted", "videoPaused", "videoFinished").'),
  timestamp: z.number().describe('The video timestamp in seconds where the event occurred.'),
});

export type TrackVideoEventInput = z.infer<typeof TrackVideoEventInputSchema>;

export async function trackVideoEvent(input: TrackVideoEventInput): Promise<{success: boolean}> {
  return trackVideoEventFlow(input);
}

const trackVideoEventFlow = ai.defineFlow(
  {
    name: 'trackVideoEventFlow',
    inputSchema: TrackVideoEventInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    // For now, we will just log the event.
    // In the future, this data would be stored in Firestore for analysis.
    console.log('Received video event:', input);
    
    // Here you would add the logic to save the event to a new 'videoEvents' collection in Firestore.
    await adminDB.collection('videoEvents').add({
      ...input,
      serverTimestamp: FieldValue.serverTimestamp(),
    });

    return { success: true };
  }
);

import { defineCollection, z } from 'astro:content';

const devicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    soc: z.string(),
    gpu: z.string(),
    ram: z.string(),
    display: z.string().optional(),
    battery: z.string().optional(),
    cooling: z.string().optional(),
    status: z.enum(['recommended', 'good', 'mixed', 'limited', 'not-recommended']),
    rating: z.number().min(1).max(5),
    source: z.enum(['verified', 'community', 'testing', 'untested']),
    fsrSupport: z.boolean().default(true),
    testedVersion: z.string().optional(),
    lastUpdated: z.string().optional(),
    summary: z.string(),
  }),
});

const gamesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    genre: z.string(),
    category: z.enum(['indie-60fps', 'aaa-playable', 'not-recommended', 'testing']),
    steamId: z.string().optional(),
    rating: z.number().min(1).max(5),
    source: z.enum(['verified', 'community', 'testing', 'untested']),
    recommendedSettings: z.string(),
    performanceNotes: z.string(),
    compatibility: z.array(
      z.object({
        device: z.string(),
        rating: z.number().min(1).max(5),
        fps: z.string(),
        settings: z.string(),
        notes: z.string().optional(),
      })
    ),
    lastUpdated: z.string().optional(),
  }),
});

export const collections = {
  devices: devicesCollection,
  games: gamesCollection,
};

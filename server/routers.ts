import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";
import { heritageSites } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Heritage Sites
  sites: router({
    list: publicProcedure.query(async () => {
      return await db.getAllHeritageSites();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getHeritageSiteById(input.id);
      }),

    seed: publicProcedure.mutation(async () => {
      const database = await db.getDb();
      if (!database) return { success: false, message: "Database not available" };

      try {
        // Delete existing sites
        await database.delete(heritageSites);

        // Insert Tunisian heritage sites
        const tunisianSites = [
          { name: 'Médina de Tunis', description: 'Ancienne médina avec souks traditionnels et mosquées historiques', latitude: '36.7969', longitude: '10.1669', category: 'archaeology', historicalPeriod: 'Medieval-Ottoman', currentCrowdLevel: 45, maxCapacity: 8000 },
          { name: 'Amphithéâtre d\'El Djem', description: 'Amphithéâtre romain du 3e siècle, le plus grand d\'Afrique du Nord', latitude: '35.2969', longitude: '10.7347', category: 'monument', historicalPeriod: 'Roman', currentCrowdLevel: 32, maxCapacity: 7000 },
          { name: 'Dougga', description: 'Site archéologique romain avec temples, théâtre et maisons anciennes', latitude: '36.4617', longitude: '9.2267', category: 'archaeology', historicalPeriod: 'Roman', currentCrowdLevel: 28, maxCapacity: 6000 },
          { name: 'Kairouan', description: 'Ville sainte avec la Grande Mosquée et médina historique', latitude: '35.6711', longitude: '10.0967', category: 'monument', historicalPeriod: 'Islamic', currentCrowdLevel: 35, maxCapacity: 7500 },
          { name: 'Musée du Bardo', description: 'Musée national avec mosaïques romaines et artefacts archéologiques', latitude: '36.8033', longitude: '10.1658', category: 'museum', historicalPeriod: 'Multi-period', currentCrowdLevel: 56, maxCapacity: 10000 },
          { name: 'Carthage', description: 'Ruines de l\'ancienne cité punique et romaine', latitude: '36.8621', longitude: '10.3268', category: 'archaeology', historicalPeriod: 'Punic-Roman', currentCrowdLevel: 42, maxCapacity: 8500 },
          { name: 'Île de Djerba', description: 'Île historique avec synagogues anciennes et forteresses', latitude: '33.8869', longitude: '10.9369', category: 'monument', historicalPeriod: 'Medieval-Ottoman', currentCrowdLevel: 68, maxCapacity: 12000 },
          { name: 'Sidi Bou Saïd', description: 'Village côtier pittoresque avec architecture traditionnelle bleue et blanche', latitude: '36.8689', longitude: '10.3597', category: 'monument', historicalPeriod: 'Ottoman', currentCrowdLevel: 52, maxCapacity: 9000 },
          { name: 'Tozeur', description: 'Oasis du désert avec architecture traditionnelle et palmeraie', latitude: '33.9197', longitude: '8.1347', category: 'monument', historicalPeriod: 'Ottoman', currentCrowdLevel: 29, maxCapacity: 6000 },
          { name: 'Sbeitla', description: 'Site archéologique romain avec temples et basiliques byzantines', latitude: '35.7833', longitude: '9.7833', category: 'archaeology', historicalPeriod: 'Roman-Byzantine', currentCrowdLevel: 18, maxCapacity: 4500 },
        ];

        for (const site of tunisianSites) {
          await database.insert(heritageSites).values({
            name: site.name,
            description: site.description,
            latitude: site.latitude,
            longitude: site.longitude,
            category: site.category,
            historicalPeriod: site.historicalPeriod,
            currentCrowdLevel: site.currentCrowdLevel,
            maxCapacity: site.maxCapacity,
          });
        }

        return { success: true, message: "10 Tunisian heritage sites inserted successfully!" };
      } catch (error) {
        console.error("Seed error:", error);
        return { success: false, message: "Error seeding database" };
      }
    }),
  }),

  // User Preferences
  preferences: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserPreferences(ctx.user.id);
    }),

    set: protectedProcedure
      .input(z.object({
        interests: z.string().optional(),
        budget: z.enum(["low", "medium", "high"]).optional(),
        visitDuration: z.number().optional(),
        preferredLanguage: z.string().optional(),
        sustainabilityPreference: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // This would be implemented with actual database insert/update
        return { success: true, userId: ctx.user.id };
      }),
  }),

  // Recommendations
  recommendations: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserRecommendations(ctx.user.id);
    }),

    generate: protectedProcedure
      .input(z.object({
        interests: z.array(z.string()),
        budget: z.string(),
        duration: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Generate recommendations using LLM
        const prompt = `Based on the following user preferences, recommend 5 heritage sites:
        - Interests: ${input.interests.join(", ")}
        - Budget: ${input.budget}
        - Available time: ${input.duration} hours
        
        Return JSON with site recommendations including name, reason, and estimated time.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are a cultural heritage tourism expert. Provide recommendations in JSON format." },
            { role: "user", content: prompt },
          ],
        });

        return {
          success: true,
          recommendations: response.choices[0]?.message.content || "No recommendations generated",
        };
      }),
  }),

  // Itineraries
  itineraries: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserItineraries(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        siteIds: z.array(z.number()),
        sustainabilityScore: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return {
          success: true,
          userId: ctx.user.id,
          itinerary: input,
        };
      }),
  }),

  // Visits
  visits: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserVisits(ctx.user.id);
    }),

    record: protectedProcedure
      .input(z.object({
        siteId: z.number(),
        duration: z.number(),
        rating: z.number().min(1).max(5),
        feedback: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return {
          success: true,
          visit: {
            userId: ctx.user.id,
            ...input,
          },
        };
      }),
  }),

  // Badges
  badges: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBadges(ctx.user.id);
    }),
  }),

  // Chatbot
  chatbot: router({
    ask: publicProcedure
      .input(z.object({
        question: z.string(),
        language: z.string().default("en"),
      }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: `You are HeritageFlow AI, a cultural heritage tourism assistant. Answer in ${input.language}.` },
            { role: "user", content: input.question },
          ],
        });

        return {
          answer: response.choices[0]?.message.content || "I couldn't generate a response.",
          language: input.language,
        };
      }),
  }),

  // Analytics
  analytics: router({
    getDashboard: protectedProcedure.query(async ({ ctx }) => {
      return {
        userId: ctx.user.id,
        visitsCount: 0,
        badgesEarned: 0,
        sustainabilityScore: 50,
        totalDistanceExplored: 0,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;

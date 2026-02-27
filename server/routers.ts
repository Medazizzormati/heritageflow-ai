import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";

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

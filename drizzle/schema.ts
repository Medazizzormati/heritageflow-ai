import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Heritage Sites Table
export const heritageSites = mysqlTable("heritage_sites", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  latitude: varchar("latitude", { length: 20 }).notNull(),
  longitude: varchar("longitude", { length: 20 }).notNull(),
  category: varchar("category", { length: 100 }), // archaeology, museum, monument, etc.
  historicalPeriod: varchar("historical_period", { length: 100 }),
  currentCrowdLevel: int("current_crowd_level").default(0), // 0-100
  maxCapacity: int("max_capacity").default(1000),
  accessibilityInfo: text("accessibility_info"),
  openingHours: varchar("opening_hours", { length: 255 }),
  entryFee: varchar("entry_fee", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HeritageSite = typeof heritageSites.$inferSelect;
export type InsertHeritageSite = typeof heritageSites.$inferInsert;

// User Preferences Table
export const userPreferences = mysqlTable("user_preferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  interests: varchar("interests", { length: 500 }), // comma-separated: archaeology, art, history, etc.
  budget: varchar("budget", { length: 50 }), // low, medium, high
  visitDuration: int("visit_duration"), // in hours
  preferredLanguage: varchar("preferred_language", { length: 10 }).default("en"),
  sustainabilityPreference: int("sustainability_preference").default(50), // 0-100 scale
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = typeof userPreferences.$inferInsert;

// Visits Table
export const visits = mysqlTable("visits", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  siteId: int("site_id").notNull().references(() => heritageSites.id),
  visitDate: timestamp("visit_date").defaultNow().notNull(),
  duration: int("duration"), // in minutes
  rating: int("rating"), // 1-5
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Visit = typeof visits.$inferSelect;
export type InsertVisit = typeof visits.$inferInsert;

// Recommendations Table
export const recommendations = mysqlTable("recommendations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  siteId: int("site_id").notNull().references(() => heritageSites.id),
  score: varchar("score", { length: 10 }), // confidence score
  reason: text("reason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = typeof recommendations.$inferInsert;

// User Badges Table
export const userBadges = mysqlTable("user_badges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  badgeName: varchar("badge_name", { length: 100 }).notNull(),
  badgeDescription: text("badge_description"),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

// Itineraries Table
export const itineraries = mysqlTable("itineraries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  siteIds: varchar("site_ids", { length: 1000 }), // comma-separated site IDs
  totalDuration: int("total_duration"), // in hours
  estimatedCost: varchar("estimated_cost", { length: 100 }),
  sustainabilityScore: int("sustainability_score").default(50), // 0-100
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = typeof itineraries.$inferInsert;
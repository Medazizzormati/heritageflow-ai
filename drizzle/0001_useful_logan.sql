CREATE TABLE `heritage_sites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`latitude` varchar(20) NOT NULL,
	`longitude` varchar(20) NOT NULL,
	`category` varchar(100),
	`historical_period` varchar(100),
	`current_crowd_level` int DEFAULT 0,
	`max_capacity` int DEFAULT 1000,
	`accessibility_info` text,
	`opening_hours` varchar(255),
	`entry_fee` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `heritage_sites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `itineraries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`site_ids` varchar(1000),
	`total_duration` int,
	`estimated_cost` varchar(100),
	`sustainability_score` int DEFAULT 50,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `itineraries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`site_id` int NOT NULL,
	`score` varchar(10),
	`reason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `recommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`badge_name` varchar(100) NOT NULL,
	`badge_description` text,
	`earned_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_badges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`interests` varchar(500),
	`budget` varchar(50),
	`visit_duration` int,
	`preferred_language` varchar(10) DEFAULT 'en',
	`sustainability_preference` int DEFAULT 50,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_preferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`site_id` int NOT NULL,
	`visit_date` timestamp NOT NULL DEFAULT (now()),
	`duration` int,
	`rating` int,
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `visits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `itineraries` ADD CONSTRAINT `itineraries_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendations` ADD CONSTRAINT `recommendations_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recommendations` ADD CONSTRAINT `recommendations_site_id_heritage_sites_id_fk` FOREIGN KEY (`site_id`) REFERENCES `heritage_sites`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_badges` ADD CONSTRAINT `user_badges_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `visits` ADD CONSTRAINT `visits_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `visits` ADD CONSTRAINT `visits_site_id_heritage_sites_id_fk` FOREIGN KEY (`site_id`) REFERENCES `heritage_sites`(`id`) ON DELETE no action ON UPDATE no action;
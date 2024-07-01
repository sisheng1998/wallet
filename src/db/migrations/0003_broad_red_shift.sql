CREATE TABLE `otps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`code` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `otps_user_id_unique` ON `otps` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `magic_links_user_id_unique` ON `magic_links` (`user_id`);
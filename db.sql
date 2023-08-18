CREATE DATABASE `blog`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(150) NOT NULL UNIQUE,
  `first_name` varchar(1000) NOT NULL,
  `last_name` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `created_dt` timestamp,
  `updated_dt` timestamp
);

CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(1000) NOT NULL,
  `content` blob NOT NULL,
  `created_dt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_dt` timestamp NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);
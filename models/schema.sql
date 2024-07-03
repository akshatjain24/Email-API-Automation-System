-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2024 at 08:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `email_api`
--
CREATE DATABASE IF NOT EXISTS `email_api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `email_api`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(2) NOT NULL,
  `cat_name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `lead_count` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_name`, `created_at`, `lead_count`) VALUES
(2, '0wefwvsc23141334', '2024-06-20 08:06:48', NULL),
(3, '0', '2024-06-20 08:07:51', NULL),
(4, 'New', '2024-06-20 08:08:17', 7),
(5, 'Drop/Lost', '2024-06-20 11:32:59', 3),
(6, 'hi', '2024-06-20 11:38:26', 5),
(7, '0', '2024-07-01 12:15:28', NULL),
(8, '0', '2024-07-01 12:17:27', NULL),
(9, '0', '2024-07-01 12:18:08', NULL),
(10, '675ghmftm', '2024-07-01 12:18:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `lead_id` int(8) NOT NULL,
  `lead_name` varchar(25) NOT NULL,
  `category_ref` int(2) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` bigint(15) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `messages_sent` int(15) DEFAULT NULL,
  `messages_left` int(15) DEFAULT NULL,
  `ref_date` date NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) DEFAULT NULL,
  `lead_del` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`lead_id`, `lead_name`, `category_ref`, `email`, `phone`, `created_at`, `messages_sent`, `messages_left`, `ref_date`, `status`, `lead_del`) VALUES
(1, 'Kalpana', 5, 'kalpanajainmail@gmail.com', 7838473476, '2024-06-19 23:27:22', NULL, NULL, '2024-06-28', 1, 0),
(2, 'Pranav J', 6, 'akshatjainmail@gmail.com', 8368265329, '2024-06-19 23:28:41', NULL, NULL, '2024-06-28', 1, 0),
(3, 'Darpan', 5, 'darpanjainmail@gmail.com', 8700272101, '2024-06-19 23:30:30', NULL, NULL, '2024-06-28', 1, 0),
(4, 'Dev Naagar', 5, 'devnaagar12@gmail.com', 9582812111, '2024-06-20 07:49:56', NULL, NULL, '2024-06-28', 1, 1),
(6, 'Rahul Dua singh', 6, 'akshatjainmail@gmail.com', 4564564567, '2024-06-20 11:33:29', NULL, NULL, '2024-06-28', 1, 0),
(7, 'chahal', 5, 'chandan@gmail.com', 12121212212, '2024-06-20 11:37:03', NULL, NULL, '2024-06-28', 1, 0),
(8, 'Virag', 5, 'chandan@gmail.com', 7838473476, '2024-06-20 11:38:37', NULL, NULL, '2024-06-28', 1, 0),
(9, 'Chandu Champion', 5, 'chandan@gmail.com', 1231231231, '2024-06-20 15:26:25', NULL, NULL, '2024-06-28', 1, 0),
(13, 'Anushka', 6, 'akshatjain2678@gmail.com', 242424242424, '2024-06-20 23:46:38', NULL, NULL, '2024-06-28', 1, 0),
(14, 'Akshat Shukla', 5, 'chandan@gmail.com', 8700272101, '2024-06-21 15:32:08', NULL, NULL, '2024-06-28', 1, 0),
(16, 'Kalapana', 5, 'chandan@gmail.com', 7838473476, '2024-06-21 17:54:55', NULL, NULL, '2024-06-20', 1, 1),
(17, 'Kalapana', 3, 'akshat.jain2022@vitstudent.ac.in', 8700272101, '2024-06-21 18:03:58', NULL, NULL, '2024-06-28', 1, 0),
(19, 'Anuj Singh Rathore', 2, 'akshatjain2678@gmail.com', 1234509876, '2024-07-01 14:55:38', NULL, NULL, '2024-07-01', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `mess_id` int(15) NOT NULL,
  `lead_ref` int(8) NOT NULL,
  `sched_ref` int(5) NOT NULL,
  `mess_date` date NOT NULL,
  `mess_time` time NOT NULL,
  `mess_template` mediumtext DEFAULT NULL,
  `mess_status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`mess_id`, `lead_ref`, `sched_ref`, `mess_date`, `mess_time`, `mess_template`, `mess_status`, `created_at`) VALUES
(95, 1, 2, '2024-04-10', '20:12:31', 'accha', 0, '2024-06-29 13:13:35'),
(117, 19, 1, '2024-07-02', '22:16:00', 'testing', 0, '2024-07-02 22:16:46'),
(118, 2, 4, '2024-07-02', '22:19:00', 'Hello Everyone', 0, '2024-07-02 22:19:47'),
(119, 17, 6, '2024-07-02', '22:22:12', 'Hello Everyone', 0, '2024-07-02 22:22:50'),
(120, 2, 2, '2024-07-03', '11:14:00', 'remainder 2; sched_id: 2', 0, '2024-07-03 11:14:12'),
(121, 6, 2, '2024-07-03', '11:14:00', 'remainder 2; sched_id: 2', 0, '2024-07-03 11:14:12'),
(122, 13, 2, '2024-07-03', '11:14:00', 'remainder 2; sched_id: 2', 0, '2024-07-03 11:14:12'),
(123, 2, 8, '2024-07-03', '11:17:00', 'test1234, id: 8', 0, '2024-07-03 11:17:12'),
(124, 6, 8, '2024-07-03', '11:17:00', 'test1234, id: 8', 0, '2024-07-03 11:17:12'),
(125, 13, 8, '2024-07-03', '11:17:00', 'test1234, id: 8', 0, '2024-07-03 11:17:12'),
(126, 2, 13, '2024-07-03', '11:20:00', 'wrewerwerwer', 0, '2024-07-03 11:20:14'),
(127, 6, 13, '2024-07-03', '11:20:00', 'wrewerwerwer', 0, '2024-07-03 11:20:14'),
(128, 4, 13, '2024-07-03', '11:20:00', 'wrewerwerwer', 0, '2024-07-03 11:20:14');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `sched_id` int(3) NOT NULL,
  `sched_name` varchar(20) NOT NULL,
  `template` varchar(200) DEFAULT NULL,
  `day_interval` int(4) NOT NULL,
  `time` time NOT NULL,
  `sched_status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_ref` int(2) NOT NULL,
  `sched_del` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`sched_id`, `sched_name`, `template`, `day_interval`, `time`, `sched_status`, `created_at`, `category_ref`, `sched_del`) VALUES
(1, 'rem 1', 'testing', 1, '22:16:00', 1, '2024-06-20 10:16:07', 2, 0),
(2, 'remainder 2', 'remainder 2; sched_id: 2', 5, '11:14:00', 1, '2024-06-20 10:17:48', 6, 1),
(3, 'rem2', 'Hello Everyone', 22, '23:00:00', 1, '2024-06-20 11:52:24', 6, 0),
(4, 'rem2', 'Hello Everyone', 4, '22:19:00', 1, '2024-06-20 15:59:18', 4, 0),
(5, 'rem2', 'Hello Everyone', 5, '14:05:00', 1, '2024-06-20 16:12:31', 4, 0),
(6, 'rem2', 'Hello Everyone', 4, '22:22:12', 1, '2024-06-20 16:15:59', 3, 0),
(7, 'rem 1', 'Hello Everyone', 2, '12:53:00', 1, '2024-06-20 16:55:06', 6, 0),
(8, 'test1234', 'test1234, id: 8', 5, '11:17:00', 1, '2024-06-20 17:04:12', 6, 0),
(9, 'test', 'testing', 0, '17:05:00', 1, '2024-06-20 17:05:07', 3, 0),
(10, 'remainder 2', 'Hello Everyone', 2, '01:37:00', 1, '2024-06-20 17:25:18', 4, 0),
(11, 'ok', 'achha', 4, '13:58:00', 1, '2024-06-20 21:45:31', 4, 1),
(12, 'test', 'list', 0, '12:12:00', 1, '2024-06-20 21:48:01', 4, 0),
(13, 'erwwre', 'wrewerwerwer', 5, '11:20:00', 1, '2024-07-01 15:25:45', 6, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`lead_id`),
  ADD KEY `cat_ref` (`category_ref`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`mess_id`),
  ADD KEY `lead_ref` (`lead_ref`),
  ADD KEY `sched_ref` (`sched_ref`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`sched_id`),
  ADD KEY `category_ref` (`category_ref`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `lead_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `mess_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `sched_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `cat_ref` FOREIGN KEY (`category_ref`) REFERENCES `categories` (`cat_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `lead_ref` FOREIGN KEY (`lead_ref`) REFERENCES `leads` (`lead_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sched_ref` FOREIGN KEY (`sched_ref`) REFERENCES `schedule` (`sched_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `category_ref` FOREIGN KEY (`category_ref`) REFERENCES `categories` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

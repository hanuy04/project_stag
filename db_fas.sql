-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 02:55 PM
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
-- Database: `db_fas`
--
CREATE DATABASE IF NOT EXISTS `db_fas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_fas`;

-- --------------------------------------------------------

--
-- Table structure for table `complains`
--

DROP TABLE IF EXISTS `complains`;
CREATE TABLE `complains` (
  `complain_id` varchar(5) NOT NULL,
  `username` varchar(5) NOT NULL,
  `classroom_facilities_id` varchar(5) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `status` enum('resolved','still resolving','unresolved') NOT NULL DEFAULT 'unresolved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `complains`
--

INSERT INTO `complains` (`complain_id`, `username`, `classroom_facilities_id`, `description`, `created_at`, `status`) VALUES
('C001', 'MR001', 'CF001', 'Projector not working properly.', '2024-11-01 10:00:00.000', 'unresolved'),
('C002', 'MR002', 'CF002', 'Whiteboard has scratches.', '2024-11-02 11:30:00.000', 'still resolving'),
('C003', 'MR003', 'CF003', 'PC is running slow.', '2024-11-03 14:00:00.000', 'resolved'),
('C004', 'MR004', 'CF004', 'Table leg is broken.', '2024-11-04 09:15:00.000', 'unresolved'),
('C005', 'MR005', 'CF005', 'Chair cushion is torn.', '2024-11-05 12:45:00.000', 'unresolved'),
('C006', 'GR001', 'CF006', 'Sound system has static noise.', '2024-11-06 10:00:00.000', 'resolved'),
('C007', 'GR002', 'CF007', 'Air conditioner is not cooling.', '2024-11-07 08:30:00.000', 'still resolving'),
('C008', 'GR003', 'CF008', 'Monitor screen is flickering.', '2024-11-08 13:20:00.000', 'unresolved'),
('C009', 'TS001', 'CF009', 'Wi-Fi is not connecting.', '2024-11-09 15:00:00.000', 'resolved'),
('C010', 'TS002', 'CF010', 'Mouse is not responsive.', '2024-11-10 16:40:00.000', 'unresolved');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
CREATE TABLE `facilities` (
  `facility_id` varchar(5) NOT NULL,
  `facility_name` varchar(100) NOT NULL,
  `facility_description` text NOT NULL,
  `facility_qty` int(11) NOT NULL,
  `room_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`facility_id`, `facility_name`, `facility_description`, `facility_qty`, `room_id`) VALUES
('F001', 'Projector', 'HD Projector', 2, 'R001'),
('F002', 'Whiteboard', 'Large Whiteboard', 1, 'R002'),
('F003', 'PC', 'High-end PC', 10, 'R003'),
('F004', 'Table', 'Wooden Table', 5, 'R004'),
('F005', 'Chair', 'Comfortable Chair', 30, 'R005'),
('F006', 'Speaker', 'Sound System', 2, 'R006'),
('F007', 'AC', 'Air Conditioner', 2, 'R007'),
('F008', 'Monitor', 'LED Monitor', 15, 'R008'),
('F009', 'Keyboard', 'Mechanical Keyboard', 10, 'R009'),
('F010', 'Mouse', 'Wireless Mouse', 10, 'R010'),
('F011', 'Mic', 'Condenser Microphone', 5, 'R011'),
('F012', 'Camera', 'DSLR Camera', 3, 'R012'),
('F013', 'Router', 'Wi-Fi Router', 1, 'R013'),
('F014', 'Printer', 'Laser Printer', 2, 'R014'),
('F015', 'Scanner', 'Flatbed Scanner', 1, 'R015'),
('F016', 'Couch', 'Leather Couch', 3, 'R016'),
('F017', 'TV', 'Smart TV', 2, 'R017'),
('F018', 'Microwave', 'Microwave Oven', 1, 'R018'),
('F019', 'Coffee Maker', 'Automatic Coffee Maker', 1, 'R019'),
('F020', 'Water Dispenser', 'Cold and Hot Water', 1, 'R020');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `reservation_id` varchar(5) NOT NULL,
  `username` varchar(255) NOT NULL,
  `room_id` varchar(5) NOT NULL,
  `start_time` datetime(3) NOT NULL,
  `end_time` datetime(3) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` char(1) NOT NULL,
  `role_name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
('0', 'sarpras'),
('1', 'teacher'),
('2', 'osis'),
('3', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `room_id` varchar(5) NOT NULL,
  `room_name` varchar(10) NOT NULL,
  `room_capacity` int(11) NOT NULL,
  `room_status` varchar(191) NOT NULL DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_name`, `room_capacity`, `room_status`) VALUES
('0', 'Halo', 12, 'none'),
('R001', 'Lab A', 30, 'available'),
('R002', 'Lab B', 40, 'available'),
('R003', 'Lab C', 35, 'unavailable'),
('R004', 'Conf A', 20, 'available'),
('R005', 'Conf B', 25, 'available'),
('R006', 'Hall A', 100, 'unavailable'),
('R007', 'Hall B', 150, 'available'),
('R008', 'Class A', 50, 'available'),
('R009', 'Class B', 45, 'unavailable'),
('R010', 'Class C', 60, 'available'),
('R011', 'Studio A', 15, 'available'),
('R012', 'Studio B', 20, 'available'),
('R013', 'Library A', 25, 'available'),
('R014', 'Library B', 30, 'available'),
('R015', 'Gym A', 200, 'unavailable'),
('R016', 'Gym B', 250, 'available'),
('R017', 'Pool A', 75, 'available'),
('R018', 'Pool B', 80, 'available'),
('R019', 'Cafe A', 40, 'available'),
('R020', 'Cafe B', 35, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `room_facilities`
--

DROP TABLE IF EXISTS `room_facilities`;
CREATE TABLE `room_facilities` (
  `room_facilities_id` varchar(5) NOT NULL,
  `room_id` varchar(5) NOT NULL,
  `facility_id` varchar(5) NOT NULL,
  `qty` int(11) NOT NULL,
  `condition` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_facilities`
--

INSERT INTO `room_facilities` (`room_facilities_id`, `room_id`, `facility_id`, `qty`, `condition`) VALUES
('CF001', 'R001', 'F001', 10, 'Good'),
('CF002', 'R002', 'F002', 5, 'Good'),
('CF003', 'R003', 'F003', 15, 'Good'),
('CF004', 'R004', 'F004', 20, 'Good'),
('CF005', 'R005', 'F005', 12, 'Good'),
('CF006', 'R006', 'F001', 8, 'In Repair'),
('CF007', 'R007', 'F002', 10, 'Good'),
('CF008', 'R008', 'F003', 6, 'Bad'),
('CF009', 'R009', 'F004', 7, 'Good'),
('CF010', 'R010', 'F005', 5, 'Good'),
('CF011', 'R011', 'F001', 9, 'Good'),
('CF012', 'R012', 'F002', 10, 'Good'),
('CF013', 'R013', 'F003', 8, 'Bad'),
('CF014', 'R014', 'F004', 6, 'Good'),
('CF015', 'R015', 'F005', 7, 'In Repair'),
('CF016', 'R016', 'F001', 5, 'Good'),
('CF017', 'R017', 'F002', 4, 'Bad'),
('CF018', 'R018', 'F003', 12, 'Good'),
('CF019', 'R019', 'F004', 15, 'Good'),
('CF020', 'R020', 'F005', 10, 'Good');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `day` varchar(10) NOT NULL,
  `booking_start` time NOT NULL,
  `booking_end` time NOT NULL,
  `reservation_start` time NOT NULL,
  `conditional_time` time NOT NULL,
  `reservation_end` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`day`, `booking_start`, `booking_end`, `reservation_start`, `conditional_time`, `reservation_end`) VALUES
('monday', '14:00:00', '17:00:00', '14:00:00', '16:00:00', '17:00:00'),
('tuesday', '14:00:00', '17:00:00', '14:00:00', '16:00:00', '17:00:00'),
('wednesday', '14:00:00', '17:00:00', '14:00:00', '16:00:00', '17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `student_id` int(9) NOT NULL,
  `username` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_year` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role_id` char(1) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `name`, `role_id`, `status`) VALUES
('12345', '123', 'Jessica', '3', '1'),
('GR001', 'pass6', 'Frank Guru', '1', '1'),
('GR002', 'pass7', 'Grace Guru', '1', '1'),
('GR003', 'pass8', 'Hank Guru', '1', '1'),
('GR004', 'pass9', 'Ivy Guru', '1', '1'),
('GR005', 'pass10', 'Jack Guru', '1', '1'),
('MR001', 'pass11', 'Ken Murid', '3', '1'),
('MR002', 'pass12', 'Leo Murid', '3', '1'),
('MR003', 'pass13', 'Mona Murid', '3', '1'),
('MR004', 'pass14', 'Nina Murid', '3', '1'),
('MR005', 'pass15', 'Oscar Murid', '3', '1'),
('MR006', 'pass16', 'Paul Murid', '3', '1'),
('MR007', 'pass17', 'Quinn Murid', '3', '1'),
('MR008', 'pass18', 'Rita Murid', '3', '1'),
('MR009', 'pass19', 'Sam Murid', '3', '1'),
('MR010', 'pass20', 'Tina Murid', '3', '1'),
('TS001', 'pass1', 'Alice Sarpras', '0', '1'),
('TS002', 'pass2', 'Bob Sarpras', '0', '1'),
('TS003', 'pass3', 'Charlie Sarpras', '0', '1'),
('TS004', 'pass4', 'David Sarpras', '0', '1'),
('TS005', 'pass5', 'Eve Sarpras', '0', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complains`
--
ALTER TABLE `complains`
  ADD PRIMARY KEY (`complain_id`),
  ADD KEY `complains_username_fkey` (`username`),
  ADD KEY `complains_classroom_facilities_id_fkey` (`classroom_facilities_id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`facility_id`),
  ADD KEY `facilities_room_id_fkey` (`room_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `reservations_username_fkey` (`username`),
  ADD KEY `reservations_room_id_fkey` (`room_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `room_facilities`
--
ALTER TABLE `room_facilities`
  ADD PRIMARY KEY (`room_facilities_id`),
  ADD KEY `classroom_facilities_room_id_fkey` (`room_id`),
  ADD KEY `classroom_facilities_facility_id_fkey` (`facility_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `fk_student_room` (`room_id`),
  ADD KEY `fk_student_user` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `users_role_id_fkey` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(9) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complains`
--
ALTER TABLE `complains`
  ADD CONSTRAINT `complains_classroom_facilities_id_fkey` FOREIGN KEY (`classroom_facilities_id`) REFERENCES `room_facilities` (`room_facilities_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `complains_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE;

--
-- Constraints for table `facilities`
--
ALTER TABLE `facilities`
  ADD CONSTRAINT `facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE;

--
-- Constraints for table `room_facilities`
--
ALTER TABLE `room_facilities`
  ADD CONSTRAINT `classroom_facilities_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`facility_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `classroom_facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_student_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `fk_student_user` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

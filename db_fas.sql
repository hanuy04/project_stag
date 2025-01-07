-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2025 at 04:42 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `complains`
--

CREATE TABLE `complains` (
  `complain_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `classroom_facilities_id` varchar(255) NOT NULL,
  `complaint` text NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `status` enum('resolved','still resolving','unresolved') NOT NULL DEFAULT 'unresolved',
  `lampiran` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `complains`
--

INSERT INTO `complains` (`complain_id`, `username`, `classroom_facilities_id`, `complaint`, `description`, `created_at`, `status`, `lampiran`) VALUES
('C001', 'MR001', 'CF001', 'proyektor ngelag dan sering mati-mati', 'Projector not working properly.', '2024-11-01 10:00:00.000', 'unresolved', 'aefeg'),
('C002', 'MR002', 'CF002', 'papan tulis kotor dan jorok', 'Whiteboard has scratches.', '2024-11-02 11:30:00.000', 'still resolving', 'srbwrbebvsd'),
('C003', 'MR003', 'CF003', 'pc nya ngelag saat booting dan shut down', 'PC is running slow.', '2024-11-03 14:00:00.000', 'resolved', 'eewgwrbwr'),
('C004', 'MR004', 'CF004', 'kaki meja patah dan putus', 'Table leg is broken.', '2024-11-04 09:15:00.000', 'unresolved', 'srbgwrberv'),
('C005', 'MR005', 'CF005', 'kursinya robek dan tajam robekannya', 'Chair cushion is torn.', '2024-11-05 12:45:00.000', 'resolved', 'segbsbef'),
('C006', 'GR001', 'CF006', 'sound system nya brebek-brebek', 'Sound system has static noise.', '2024-11-06 10:00:00.000', 'resolved', 'segwrbwsrb'),
('C007', 'GR002', 'CF007', 'ac nya ndak dingin sama sekali dan bocor', 'Air conditioner is not cooling.', '2024-11-07 08:30:00.000', 'still resolving', 'sdbwrbwrb'),
('C008', 'GR003', 'CF008', 'layar mati nyala terus', 'Monitor screen is flickering.', '2024-11-08 13:20:00.000', 'unresolved', 'sbrber'),
('C009', 'TS001', 'CF009', 'wifi sering putus dan mati', 'Wi-Fi is not connecting.', '2024-11-09 15:00:00.000', 'resolved', 'srberbe'),
('C010', 'TS002', 'CF010', 'mouse ngelag geraknya telat', 'Mouse is not responsive.', '2024-11-10 16:40:00.000', 'unresolved', 'erbetnet'),
('C011', 'MR003', 'CF021', 'keyboard rusak', 'tlg dibenahi', '2024-12-19 14:39:08.751', 'unresolved', '/uploads/complaints/minion.jpg'),
('C012', 'MR003', 'CF019', 'tidak bisa pilih air panas', 'tolong diperiksa air panasnya', '2024-12-19 14:59:57.270', 'unresolved', '/uploads/complaints/wp2738730.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `facility_id` varchar(255) NOT NULL,
  `facility_name` varchar(100) NOT NULL,
  `facility_description` text NOT NULL,
  `facility_qty` int(11) NOT NULL,
  `room_id` varchar(255) NOT NULL
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

CREATE TABLE `reservations` (
  `reservation_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `start_time` datetime(3) NOT NULL,
  `end_time` datetime(3) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `status_sarpras` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `teacher_assistant` varchar(255) DEFAULT NULL,
  `status_guru` enum('pending','rejected','approved','') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `prev` varchar(255) DEFAULT NULL,
  `next` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `username`, `room_id`, `start_time`, `end_time`, `purpose`, `status_sarpras`, `teacher_assistant`, `status_guru`, `description`, `prev`, `next`) VALUES
('JD000001', 'sarpras', 'R022', '2025-01-07 07:00:00.000', '2025-01-07 09:00:00.000', 'KELAS MATEMATIKA', 'approved', NULL, NULL, NULL, NULL, NULL),
('JD000002', 'sarpras', 'R023', '2025-01-08 01:00:00.000', '2025-01-08 02:59:00.000', 'ALLDAY1', 'approved', NULL, NULL, NULL, NULL, NULL),
('RE001', 'MR001', 'R021', '2024-01-05 14:10:00.798', '2024-12-05 15:10:00.301', 'Project Presentation', 'pending', NULL, NULL, 'Ken murid ditolak', NULL, NULL),
('RE002', 'MR002', 'R022', '2024-01-05 14:00:00.000', '2024-12-05 15:00:00.000', 'Team Meeting', 'pending', NULL, NULL, NULL, NULL, NULL),
('RE003', 'MR003', 'R023', '2024-01-05 10:00:00.000', '2024-12-06 11:00:00.000', 'Workshop', 'pending', NULL, NULL, NULL, NULL, NULL),
('RE004', '12345', '0', '2024-12-21 12:58:46.963', '2024-12-21 14:58:46.963', 'pinjam', 'pending', NULL, NULL, NULL, NULL, NULL),
('RE005', 'MR001', 'R001', '2024-01-05 09:00:00.000', '2024-01-05 10:30:00.000', 'kerja kelompok', 'approved', 'GR001', 'pending', 'tidak boleh ya ges', NULL, NULL),
('RE006', 'MR001', 'R001', '2024-01-05 09:00:00.000', '2024-01-05 10:00:00.000', 'Meeting', 'rejected', 'GR001', 'pending', 'Ruangan digunakan untuk kegiatan lain', NULL, NULL),
('RE007', 'MR002', 'R002', '2024-12-01 10:00:00.000', '2024-12-01 11:00:00.000', 'Workshop', 'approved', 'GR002', 'approved', NULL, NULL, NULL),
('RE008', 'MR003', 'R003', '2024-12-01 11:00:00.000', '2024-12-01 12:00:00.000', 'Training', 'approved', NULL, NULL, 'ini 10 karakter', NULL, NULL),
('RE009', 'MR004', 'R004', '2024-12-01 12:00:00.000', '2024-12-01 13:00:00.000', 'Seminar', 'approved', 'GR003', 'approved', NULL, NULL, NULL),
('RE010', 'MR005', 'R005', '2024-12-01 13:00:00.000', '2024-12-01 14:00:00.000', 'Discussion', 'approved', NULL, NULL, 'Ruangan sudah dipesan.', NULL, NULL),
('RE011', 'MR006', 'R006', '2024-12-01 14:00:00.000', '2024-12-01 15:00:00.000', 'Presentation', 'approved', 'GR004', 'approved', NULL, NULL, NULL),
('RE012', 'MR007', 'R007', '2024-12-01 15:00:00.000', '2024-12-01 17:30:00.000', 'Workshop', 'pending', NULL, NULL, 'Ruangan digunakan untuk kegiatan lain', NULL, NULL),
('RE013', 'MR008', 'R008', '2024-12-01 16:00:00.000', '2024-12-01 17:00:00.000', 'Meeting', 'pending', 'GR005', 'approved', NULL, NULL, NULL),
('RE014', 'MR009', 'R007', '2024-12-01 17:00:00.000', '2024-12-01 18:00:00.000', 'Training', 'pending', NULL, NULL, 'Ruangan sedang digunakan.', NULL, NULL),
('RE015', 'MR010', 'R010', '2024-12-01 18:00:00.000', '2024-12-01 19:00:00.000', 'Seminar', 'pending', 'GR001', 'approved', NULL, NULL, NULL),
('RE016', 'MR001', 'R011', '2024-12-02 09:00:00.000', '2024-12-02 10:00:00.000', 'Discussion', 'pending', 'GR002', 'approved', NULL, NULL, NULL),
('RE017', 'MR002', 'R012', '2024-12-02 10:00:00.000', '2024-12-02 11:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan sedang dalam perbaikan.', NULL, NULL),
('RE018', 'MR003', 'R013', '2024-12-02 11:00:00.000', '2024-12-02 12:00:00.000', 'Workshop', 'pending', 'GR003', 'approved', NULL, NULL, NULL),
('RE019', 'MR004', 'R014', '2024-12-02 12:00:00.000', '2024-12-02 13:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan sudah dipesan.', NULL, NULL),
('RE020', 'MR005', 'R015', '2024-12-02 13:00:00.000', '2024-12-02 14:00:00.000', 'Training', 'pending', 'GR004', 'approved', NULL, NULL, NULL),
('RE021', 'MR006', 'R016', '2024-12-02 14:00:00.000', '2024-12-02 15:00:00.000', 'Seminar', 'pending', NULL, NULL, 'Ruangan tidak tersedia.', NULL, NULL),
('RE022', 'MR007', 'R017', '2024-12-02 15:00:00.000', '2024-12-02 16:00:00.000', 'Discussion', 'pending', 'GR005', 'approved', NULL, NULL, NULL),
('RE023', 'MR008', 'R018', '2024-12-02 16:00:00.000', '2024-12-02 17:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan sedang digunakan.', NULL, NULL),
('RE024', 'MR009', 'R019', '2024-12-02 17:00:00.000', '2024-12-02 18:00:00.000', 'Workshop', 'pending', 'GR001', 'approved', NULL, NULL, NULL),
('RE025', 'MR010', 'R020', '2024-12-02 18:00:00.000', '2024-12-02 19:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan sedang dalam perbaikan.', NULL, NULL),
('RE026', 'MR001', 'R021', '2024-12-03 09:00:00.000', '2024-12-03 10:00:00.000', 'Training', 'pending', 'GR002', 'approved', NULL, NULL, NULL),
('RE027', 'MR002', 'R022', '2024-12-03 10:00:00.000', '2024-12-03 11:00:00.000', 'Seminar', 'pending', NULL, NULL, 'Ruangan sudah dipesan.', NULL, NULL),
('RE028', 'MR003', 'R023', '2024-12-03 11:00:00.000', '2024-12-03 12:00:00.000', 'Discussion', 'pending', 'GR003', 'approved', NULL, NULL, NULL),
('RE029', 'MR004', 'R022', '2024-12-03 12:00:00.000', '2024-12-03 13:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan tidak tersedia.', NULL, NULL),
('RE030', 'MR005', 'R025', '2024-12-03 13:00:00.000', '2024-12-03 14:00:00.000', 'Workshop', 'pending', 'GR004', 'approved', NULL, NULL, NULL),
('RE031', 'MR006', 'R026', '2024-12-03 14:00:00.000', '2024-12-03 15:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan sedang digunakan.', NULL, NULL),
('RE032', 'MR007', 'R027', '2024-12-03 15:00:00.000', '2024-12-03 16:00:00.000', 'Training', 'pending', 'GR005', 'approved', NULL, NULL, NULL),
('RE033', 'MR008', 'R028', '2024-12-03 16:00:00.000', '2024-12-03 17:00:00.000', 'Seminar', 'pending', NULL, NULL, 'Ruangan sedang dalam perbaikan.', NULL, NULL),
('RE034', 'MR009', 'R029', '2024-12-03 17:00:00.000', '2024-12-03 18:00:00.000', 'Discussion', 'pending', 'GR001', 'approved', NULL, NULL, NULL),
('RE035', 'MR010', 'R030', '2024-12-03 18:00:00.000', '2024-12-03 19:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan sudah dipesan.', NULL, NULL),
('RE036', 'MR001', 'R031', '2024-12-04 09:00:00.000', '2024-12-04 10:00:00.000', 'Workshop', 'pending', 'GR002', 'approved', NULL, NULL, NULL),
('RE037', 'MR002', 'R032', '2024-12-04 10:00:00.000', '2024-12-04 11:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan tidak tersedia.', NULL, NULL),
('RE038', 'MR003', 'R033', '2024-12-04 11:00:00.000', '2024-12-04 12:00:00.000', 'Training', 'pending', 'GR003', 'approved', NULL, NULL, NULL),
('RE039', 'MR004', 'R034', '2024-12-04 12:00:00.000', '2024-12-04 13:00:00.000', 'Seminar', 'pending', NULL, NULL, 'Ruangan sedang digunakan.', NULL, NULL),
('RE040', 'MR005', 'R035', '2024-12-04 13:00:00.000', '2024-12-04 14:00:00.000', 'Discussion', 'pending', 'GR004', 'approved', NULL, NULL, NULL),
('RE041', 'MR006', 'R036', '2024-12-04 14:00:00.000', '2024-12-04 15:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan sedang dalam perbaikan.', NULL, NULL),
('RE042', 'MR007', 'R037', '2024-12-04 15:00:00.000', '2024-12-04 16:00:00.000', 'Workshop', 'pending', 'GR005', 'approved', NULL, NULL, NULL),
('RE043', 'MR008', 'R038', '2024-12-04 16:00:00.000', '2024-12-04 17:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan sudah dipesan.', NULL, NULL),
('RE044', 'MR009', 'R001', '2024-12-05 09:00:00.000', '2024-12-05 10:00:00.000', 'Training', 'pending', 'GR001', 'approved', NULL, NULL, NULL),
('RE045', 'MR010', 'R002', '2024-12-05 10:00:00.000', '2024-12-05 11:00:00.000', 'Seminar', 'pending', NULL, NULL, 'Ruangan tidak tersedia.', NULL, NULL),
('RE046', 'MR001', 'R003', '2024-12-05 11:00:00.000', '2024-12-05 12:00:00.000', 'Discussion', 'pending', 'GR002', 'approved', NULL, NULL, NULL),
('RE047', 'MR002', 'R004', '2024-12-05 12:00:00.000', '2024-12-05 13:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan sedang digunakan.', NULL, NULL),
('RE048', 'MR003', 'R005', '2024-12-05 13:00:00.000', '2024-12-05 14:00:00.000', 'Workshop', 'pending', 'GR003', 'approved', NULL, NULL, NULL),
('RE049', 'MR004', 'R006', '2024-12-05 14:00:00.000', '2024-12-05 15:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan sedang dalam perbaikan.', NULL, NULL),
('RE050', 'MR005', 'R007', '2024-12-05 15:00:00.000', '2024-12-05 16:00:00.000', 'Training', 'pending', 'GR004', 'approved', NULL, NULL, NULL),
('RE051', 'MR006', 'R008', '2024-12-05 16:00:00.000', '2024-12-05 17:00:00.000', 'Seminar', 'pending', NULL, NULL, 'Ruangan sudah dipesan.', NULL, NULL),
('RE052', 'MR007', 'R009', '2024-12-05 17:00:00.000', '2024-12-05 18:00:00.000', 'Discussion', 'pending', 'GR005', 'approved', NULL, NULL, NULL),
('RE053', 'MR008', 'R010', '2024-12-05 18:00:00.000', '2024-12-05 19:00:00.000', 'Presentation', 'pending', NULL, NULL, 'Ruangan tidak tersedia.', NULL, NULL),
('RE054', 'MR009', 'R011', '2024-12-06 09:00:00.000', '2024-12-06 10:00:00.000', 'Workshop', 'pending', 'GR001', 'approved', NULL, NULL, NULL),
('RE055', 'MR010', 'R012', '2024-12-06 10:00:00.000', '2024-12-06 11:00:00.000', 'Meeting', 'pending', NULL, NULL, 'Ruangan sedang digunakan.', NULL, NULL),
('RE056', '12345', 'R013', '2024-12-28 02:45:00.000', '2024-12-28 03:15:00.000', 'kerja kelompok', 'pending', NULL, NULL, NULL, NULL, NULL),
('RE057', 'MR001', 'R011', '2024-12-28 05:30:00.000', '2024-12-28 02:45:00.000', 'halo', 'pending', NULL, NULL, NULL, NULL, NULL),
('RE058', 'MURID1', 'R021', '2024-12-28 01:00:00.000', '2024-12-28 03:15:00.000', 'kerja kelompok', 'pending', NULL, NULL, 'kepagian ya ges yaaa', NULL, NULL),
('RE059', 'MURID2', 'R021', '2024-12-28 03:15:00.000', '2024-12-28 03:45:00.000', 'kerja kelompok', 'pending', NULL, NULL, 'ini ditolak juga', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

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

CREATE TABLE `rooms` (
  `room_id` varchar(255) NOT NULL,
  `room_name` varchar(11) NOT NULL,
  `room_capacity` int(11) NOT NULL,
  `room_category` varchar(255) NOT NULL,
  `room_status` varchar(191) NOT NULL DEFAULT 'available',
  `is_class` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_name`, `room_capacity`, `room_category`, `room_status`, `is_class`) VALUES
('0', 'Halo', 12, 'lainnya', 'none', 0),
('R001', 'Lab A', 30, 'lainnya', 'available', 0),
('R002', 'Lab B', 40, 'lainnya', 'available', 0),
('R003', 'Lab C', 35, 'lainnya', 'unavailable', 0),
('R004', 'Conf A', 20, 'lainnya', 'available', 0),
('R005', 'Conf B', 25, 'lainnya', 'available', 0),
('R006', 'Hall A', 100, 'lainnya', 'unavailable', 0),
('R007', 'Hall B', 150, 'lainnya', 'available', 0),
('R008', 'Class A', 50, 'lainnya', 'available', 0),
('R009', 'Class B', 45, 'lainnya', 'unavailable', 0),
('R010', 'Class C', 60, 'lainnya', 'available', 0),
('R011', 'Studio A', 15, 'lainnya', 'available', 0),
('R012', 'Studio B', 20, 'lainnya', 'available', 0),
('R013', 'Library A', 25, 'lainnya', 'available', 0),
('R014', 'Library B', 30, 'lainnya', 'available', 0),
('R015', 'Gym A', 200, 'lainnya', 'unavailable', 0),
('R016', 'Gym B', 250, 'lainnya', 'available', 0),
('R017', 'Pool A', 75, 'lainnya', 'available', 0),
('R018', 'Pool B', 80, 'lainnya', 'available', 0),
('R019', 'Cafe A', 40, 'lainnya', 'available', 0),
('R020', 'Cafe B', 35, 'lainnya', 'available', 0),
('R021', 'Ruang X-1', 30, 'kelas 10', 'available', 0),
('R022', 'Ruang X-2', 30, 'kelas 10', 'available', 0),
('R023', 'Ruang X-3', 30, 'kelas 10', 'available', 0),
('R024', 'Ruang X-4', 30, 'kelas 10', 'available', 0),
('R025', 'Ruang X-5', 30, 'lainnya', 'available', 0),
('R026', 'Ruang X-6', 30, 'lainnya', 'available', 0),
('R027', 'Ruang XI-1', 30, 'lainnya', 'available', 0),
('R028', 'Ruang XI-2', 30, 'lainnya', 'available', 0),
('R029', 'Ruang XI-3', 30, 'lainnya', 'available', 0),
('R030', 'Ruang XI-4', 30, 'lainnya', 'available', 0),
('R031', 'Ruang XI-5', 30, 'lainnya', 'available', 0),
('R032', 'Ruang XI-6', 30, 'lainnya', 'available', 0),
('R033', 'Ruang XII-1', 30, 'lainnya', 'available', 0),
('R034', 'Ruang XII-2', 30, 'lainnya', 'available', 0),
('R035', 'Ruang XII-3', 30, 'lainnya', 'available', 0),
('R036', 'Ruang XII-4', 30, 'lainnya', 'available', 0),
('R037', 'Ruang XII-5', 30, 'lainnya', 'available', 0),
('R038', 'Ruang XII-6', 30, 'lainnya', 'available', 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_categories`
--

CREATE TABLE `room_categories` (
  `room_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_categories`
--

INSERT INTO `room_categories` (`room_category`) VALUES
('kelas 10'),
('lainnya');

-- --------------------------------------------------------

--
-- Table structure for table `room_facilities`
--

CREATE TABLE `room_facilities` (
  `room_facilities_id` varchar(255) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `facility_id` varchar(255) NOT NULL,
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
('CF006', 'R006', 'F006', 8, 'In Repair'),
('CF007', 'R007', 'F007', 10, 'Good'),
('CF008', 'R008', 'F008', 6, 'Bad'),
('CF009', 'R009', 'F009', 7, 'Good'),
('CF010', 'R010', 'F010', 5, 'Good'),
('CF011', 'R011', 'F011', 9, 'Good'),
('CF012', 'R012', 'F012', 10, 'Good'),
('CF013', 'R013', 'F013', 8, 'Bad'),
('CF014', 'R014', 'F014', 6, 'Good'),
('CF015', 'R015', 'F015', 7, 'In Repair'),
('CF016', 'R016', 'F016', 5, 'Good'),
('CF017', 'R017', 'F017', 4, 'Bad'),
('CF018', 'R018', 'F018', 12, 'Good'),
('CF019', 'R019', 'F019', 15, 'Good'),
('CF020', 'R020', 'F020', 10, 'Good'),
('CF021', 'R009', 'F009', 20, 'Good');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` tinyint(4) NOT NULL,
  `day` varchar(10) NOT NULL,
  `booking` tinyint(1) NOT NULL DEFAULT 1,
  `booking_start` time NOT NULL,
  `booking_end` time NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `reservation_start` time NOT NULL,
  `reservation_end` time NOT NULL,
  `conditional_time` time NOT NULL,
  `accompanying_teacher` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `day`, `booking`, `booking_start`, `booking_end`, `active`, `reservation_start`, `reservation_end`, `conditional_time`, `accompanying_teacher`) VALUES
(1, 'Senin', 1, '14:00:00', '17:00:00', 1, '10:00:00', '13:00:00', '12:00:00', 0),
(2, 'Selasa', 1, '14:00:00', '17:00:00', 1, '12:00:00', '19:00:00', '14:00:00', 0),
(3, 'Rabu', 1, '14:00:00', '17:00:00', 0, '12:00:00', '13:00:00', '12:00:00', 1),
(4, 'Kamis', 1, '14:00:00', '17:00:00', 1, '14:00:00', '18:00:00', '19:00:00', 1),
(5, 'Jumat', 1, '14:00:00', '16:00:00', 1, '16:00:00', '17:00:00', '20:00:00', 1),
(6, 'Sabtu', 0, '14:00:00', '17:00:00', 1, '14:00:00', '17:00:00', '16:00:00', 1),
(7, 'Minggu', 0, '14:00:00', '16:00:00', 1, '14:00:00', '16:00:00', '17:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role_id` char(1) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `kelas` varchar(255) DEFAULT NULL,
  `no_absen` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `name`, `role_id`, `status`, `kelas`, `no_absen`) VALUES
('12345', '123', 'Jessica', '3', '1', NULL, NULL),
('12348', '12345678', 'Hai', '1', '2', NULL, NULL),
('cikgu', '12345678', 'GURU', '1', '1', NULL, NULL),
('GR001', 'pass6', 'Frank Guru', '1', '1', NULL, NULL),
('GR002', 'pass7', 'Grace Guru', '1', '1', NULL, NULL),
('GR003', 'pass8', 'Hank Guru', '1', '1', NULL, NULL),
('GR004', 'pass9', 'Ivy Guru', '1', '1', NULL, NULL),
('GR005', 'pass10', 'Jack Guru', '1', '1', NULL, NULL),
('MR001', 'pass11', 'Ken Murid', '3', '1', 'R021', 10),
('MR002', 'pass12', 'Leo Murid', '3', '1', NULL, NULL),
('MR003', 'pass13', 'Mona Murid', '3', '1', NULL, NULL),
('MR004', 'pass14', 'Nina Murid', '3', '1', NULL, NULL),
('MR005', 'pass15', 'Oscar Murid', '3', '1', NULL, NULL),
('MR006', 'pass16', 'Paul Murid', '3', '1', NULL, NULL),
('MR007', 'pass17', 'Quinn Murid', '3', '1', NULL, NULL),
('MR008', 'pass18', 'Rita Murid', '3', '1', NULL, NULL),
('MR009', 'pass19', 'Sam Murid', '3', '1', NULL, NULL),
('MR010', 'pass20', 'Tina Murid', '3', '1', NULL, NULL),
('MURID1', '12345678', 'John Doe', '3', '1', 'R021', 12),
('MURID2', '12345678', 'Jane Doe', '3', '1', 'R022', 10),
('sarpras', 'jaya', 'SARPRAS', '0', '1', NULL, NULL),
('TS001', 'pass1', 'Alice Sarpras', '0', '1', NULL, NULL),
('TS002', 'pass2', 'Bob Sarpras', '0', '1', NULL, NULL),
('TS003', 'pass3', 'Charlie Sarpras', '0', '1', NULL, NULL),
('TS004', 'pass4', 'David Sarpras', '0', '1', NULL, NULL),
('TS005', 'pass5', 'Eve Sarpras', '0', '1', NULL, NULL);

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
  ADD KEY `reservations_room_id_fkey` (`room_id`),
  ADD KEY `reservations_teacher_fkey` (`teacher_assistant`),
  ADD KEY `next_fkey` (`next`),
  ADD KEY `prev_fkey` (`prev`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `fk_room_categories` (`room_category`);

--
-- Indexes for table `room_categories`
--
ALTER TABLE `room_categories`
  ADD PRIMARY KEY (`room_category`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `users_role_id_fkey` (`role_id`),
  ADD KEY `users_rooms` (`kelas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `next_fkey` FOREIGN KEY (`next`) REFERENCES `reservations` (`reservation_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `prev_fkey` FOREIGN KEY (`prev`) REFERENCES `reservations` (`reservation_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_teacher_fkey` FOREIGN KEY (`teacher_assistant`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_room_categories` FOREIGN KEY (`room_category`) REFERENCES `room_categories` (`room_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room_facilities`
--
ALTER TABLE `room_facilities`
  ADD CONSTRAINT `classroom_facilities_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`facility_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `classroom_facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_rooms` FOREIGN KEY (`kelas`) REFERENCES `rooms` (`room_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

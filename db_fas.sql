/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.27-MariaDB : Database - db_fas
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_fas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `db_fas`;

/*Table structure for table `complains` */

DROP TABLE IF EXISTS `complains`;

CREATE TABLE `complains` (
  `complain_id` varchar(5) NOT NULL,
  `username` varchar(5) NOT NULL,
  `classroom_facilities_id` varchar(5) NOT NULL,
  `complaint` text NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `status` enum('resolved','still resolving','unresolved') NOT NULL DEFAULT 'unresolved',
  `lampiran` varchar(255) NOT NULL,
  PRIMARY KEY (`complain_id`),
  KEY `complains_username_fkey` (`username`),
  KEY `complains_classroom_facilities_id_fkey` (`classroom_facilities_id`),
  CONSTRAINT `complains_classroom_facilities_id_fkey` FOREIGN KEY (`classroom_facilities_id`) REFERENCES `room_facilities` (`room_facilities_id`) ON UPDATE CASCADE,
  CONSTRAINT `complains_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `complains` */

LOCK TABLES `complains` WRITE;

insert  into `complains`(`complain_id`,`username`,`classroom_facilities_id`,`complaint`,`description`,`created_at`,`status`,`lampiran`) values 
('C001','MR001','CF001','proyektor ngelag dan sering mati-mati','Projector not working properly.','2024-11-01 10:00:00.000','unresolved','aefeg'),
('C002','MR002','CF002','papan tulis kotor dan jorok','Whiteboard has scratches.','2024-11-02 11:30:00.000','still resolving','srbwrbebvsd'),
('C003','MR003','CF003','pc nya ngelag saat booting dan shut down','PC is running slow.','2024-11-03 14:00:00.000','resolved','eewgwrbwr'),
('C004','MR004','CF004','kaki meja patah dan putus','Table leg is broken.','2024-11-04 09:15:00.000','unresolved','srbgwrberv'),
('C005','MR005','CF005','kursinya robek dan tajam robekannya','Chair cushion is torn.','2024-11-05 12:45:00.000','resolved','segbsbef'),
('C006','GR001','CF006','sound system nya brebek-brebek','Sound system has static noise.','2024-11-06 10:00:00.000','resolved','segwrbwsrb'),
('C007','GR002','CF007','ac nya ndak dingin sama sekali dan bocor','Air conditioner is not cooling.','2024-11-07 08:30:00.000','still resolving','sdbwrbwrb'),
('C008','GR003','CF008','layar mati nyala terus','Monitor screen is flickering.','2024-11-08 13:20:00.000','unresolved','sbrber'),
('C009','TS001','CF009','wifi sering putus dan mati','Wi-Fi is not connecting.','2024-11-09 15:00:00.000','resolved','srberbe'),
('C010','TS002','CF010','mouse ngelag geraknya telat','Mouse is not responsive.','2024-11-10 16:40:00.000','unresolved','erbetnet'),
('C011','MR003','CF021','keyboard rusak','tlg dibenahi','2024-12-19 14:39:08.751','unresolved','/uploads/complaints/minion.jpg'),
('C012','MR003','CF019','tidak bisa pilih air panas','tolong diperiksa air panasnya','2024-12-19 14:59:57.270','unresolved','/uploads/complaints/wp2738730.jpg');

UNLOCK TABLES;

/*Table structure for table `facilities` */

DROP TABLE IF EXISTS `facilities`;

CREATE TABLE `facilities` (
  `facility_id` varchar(5) NOT NULL,
  `facility_name` varchar(100) NOT NULL,
  `facility_description` text NOT NULL,
  `facility_qty` int(11) NOT NULL,
  `room_id` varchar(5) NOT NULL,
  PRIMARY KEY (`facility_id`),
  KEY `facilities_room_id_fkey` (`room_id`),
  CONSTRAINT `facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `facilities` */

LOCK TABLES `facilities` WRITE;

insert  into `facilities`(`facility_id`,`facility_name`,`facility_description`,`facility_qty`,`room_id`) values 
('F001','Projector','HD Projector',2,'R001'),
('F002','Whiteboard','Large Whiteboard',1,'R002'),
('F003','PC','High-end PC',10,'R003'),
('F004','Table','Wooden Table',5,'R004'),
('F005','Chair','Comfortable Chair',30,'R005'),
('F006','Speaker','Sound System',2,'R006'),
('F007','AC','Air Conditioner',2,'R007'),
('F008','Monitor','LED Monitor',15,'R008'),
('F009','Keyboard','Mechanical Keyboard',10,'R009'),
('F010','Mouse','Wireless Mouse',10,'R010'),
('F011','Mic','Condenser Microphone',5,'R011'),
('F012','Camera','DSLR Camera',3,'R012'),
('F013','Router','Wi-Fi Router',1,'R013'),
('F014','Printer','Laser Printer',2,'R014'),
('F015','Scanner','Flatbed Scanner',1,'R015'),
('F016','Couch','Leather Couch',3,'R016'),
('F017','TV','Smart TV',2,'R017'),
('F018','Microwave','Microwave Oven',1,'R018'),
('F019','Coffee Maker','Automatic Coffee Maker',1,'R019'),
('F020','Water Dispenser','Cold and Hot Water',1,'R020');

UNLOCK TABLES;

/*Table structure for table `reservations` */

DROP TABLE IF EXISTS `reservations`;

CREATE TABLE `reservations` (
  `reservation_id` varchar(5) NOT NULL,
  `username` varchar(255) NOT NULL,
  `room_id` varchar(5) NOT NULL,
  `start_time` datetime(3) NOT NULL,
  `end_time` datetime(3) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `is_need_accompanying_teacher` tinyint(1) NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `reservations_username_fkey` (`username`),
  KEY `reservations_room_id_fkey` (`room_id`),
  CONSTRAINT `reservations_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE,
  CONSTRAINT `reservations_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `reservations` */

LOCK TABLES `reservations` WRITE;

insert  into `reservations`(`reservation_id`,`username`,`room_id`,`start_time`,`end_time`,`purpose`,`status`,`is_need_accompanying_teacher`) values 
('R0001','MR001','R021','2024-12-05 14:00:00.000','2024-12-05 15:00:00.000','Project Presentation','approved',0),
('R0002','MR002','R022','2024-12-05 14:00:00.000','2024-12-05 15:00:00.000','Team Meeting','approved',0),
('R0003','MR003','R023','2024-12-06 10:00:00.000','2024-12-06 11:00:00.000','Workshop','approved',0);

UNLOCK TABLES;

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `role_id` char(1) NOT NULL,
  `role_name` varchar(191) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `roles` */

LOCK TABLES `roles` WRITE;

insert  into `roles`(`role_id`,`role_name`) values 
('0','sarpras'),
('1','teacher'),
('2','osis'),
('3','student');

UNLOCK TABLES;

/*Table structure for table `room_facilities` */

DROP TABLE IF EXISTS `room_facilities`;

CREATE TABLE `room_facilities` (
  `room_facilities_id` varchar(5) NOT NULL,
  `room_id` varchar(5) NOT NULL,
  `facility_id` varchar(5) NOT NULL,
  `qty` int(11) NOT NULL,
  `condition` varchar(191) NOT NULL,
  PRIMARY KEY (`room_facilities_id`),
  KEY `classroom_facilities_room_id_fkey` (`room_id`),
  KEY `classroom_facilities_facility_id_fkey` (`facility_id`),
  CONSTRAINT `classroom_facilities_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`facility_id`) ON UPDATE CASCADE,
  CONSTRAINT `classroom_facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `room_facilities` */

LOCK TABLES `room_facilities` WRITE;

insert  into `room_facilities`(`room_facilities_id`,`room_id`,`facility_id`,`qty`,`condition`) values 
('CF001','R001','F001',10,'Good'),
('CF002','R002','F002',5,'Good'),
('CF003','R003','F003',15,'Good'),
('CF004','R004','F004',20,'Good'),
('CF005','R005','F005',12,'Good'),
('CF006','R006','F006',8,'In Repair'),
('CF007','R007','F007',10,'Good'),
('CF008','R008','F008',6,'Bad'),
('CF009','R009','F009',7,'Good'),
('CF010','R010','F010',5,'Good'),
('CF011','R011','F011',9,'Good'),
('CF012','R012','F012',10,'Good'),
('CF013','R013','F013',8,'Bad'),
('CF014','R014','F014',6,'Good'),
('CF015','R015','F015',7,'In Repair'),
('CF016','R016','F016',5,'Good'),
('CF017','R017','F017',4,'Bad'),
('CF018','R018','F018',12,'Good'),
('CF019','R019','F019',15,'Good'),
('CF020','R020','F020',10,'Good'),
('CF021','R009','F009',20,'Good');

UNLOCK TABLES;

/*Table structure for table `rooms` */

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `room_id` varchar(5) NOT NULL,
  `room_name` varchar(11) NOT NULL,
  `room_capacity` int(11) NOT NULL,
  `room_status` varchar(191) NOT NULL DEFAULT 'available',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rooms` */

LOCK TABLES `rooms` WRITE;

insert  into `rooms`(`room_id`,`room_name`,`room_capacity`,`room_status`) values 
('0','Halo',12,'none'),
('R001','Lab A',30,'available'),
('R002','Lab B',40,'available'),
('R003','Lab C',35,'unavailable'),
('R004','Conf A',20,'available'),
('R005','Conf B',25,'available'),
('R006','Hall A',100,'unavailable'),
('R007','Hall B',150,'available'),
('R008','Class A',50,'available'),
('R009','Class B',45,'unavailable'),
('R010','Class C',60,'available'),
('R011','Studio A',15,'available'),
('R012','Studio B',20,'available'),
('R013','Library A',25,'available'),
('R014','Library B',30,'available'),
('R015','Gym A',200,'unavailable'),
('R016','Gym B',250,'available'),
('R017','Pool A',75,'available'),
('R018','Pool B',80,'available'),
('R019','Cafe A',40,'available'),
('R020','Cafe B',35,'available'),
('R021','Ruang X-1',30,'available'),
('R022','Ruang X-2',30,'available'),
('R023','Ruang X-3',30,'available'),
('R024','Ruang X-4',30,'available'),
('R025','Ruang X-5',30,'available'),
('R026','Ruang X-6',30,'available'),
('R027','Ruang XI-1',30,'available'),
('R028','Ruang XI-2',30,'available'),
('R029','Ruang XI-3',30,'available'),
('R030','Ruang XI-4',30,'available'),
('R031','Ruang XI-5',30,'available'),
('R032','Ruang XI-6',30,'available'),
('R033','Ruang XII-1',30,'available'),
('R034','Ruang XII-2',30,'available'),
('R035','Ruang XII-3',30,'available'),
('R036','Ruang XII-4',30,'available'),
('R037','Ruang XII-5',30,'available'),
('R038','Ruang XII-6',30,'available');

UNLOCK TABLES;

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `day` varchar(10) NOT NULL,
  `booking_start` time NOT NULL,
  `booking_end` time NOT NULL,
  `reservation_start` time NOT NULL,
  `conditional_time` time NOT NULL,
  `reservation_end` time NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `settings` */

LOCK TABLES `settings` WRITE;

insert  into `settings`(`id`,`day`,`booking_start`,`booking_end`,`reservation_start`,`conditional_time`,`reservation_end`,`active`) values 
(1,'Senin','14:00:00','17:00:00','10:00:00','12:00:00','13:00:00',1),
(2,'Selasa','14:00:00','17:00:00','10:00:00','14:00:00','19:00:00',1),
(3,'Rabu','14:00:00','17:00:00','12:00:00','12:00:00','13:00:00',0),
(4,'Kamis','14:00:00','17:00:00','11:00:00','16:02:00','02:00:00',0),
(5,'Jumat','00:00:00','00:00:00','20:00:00','20:00:00','01:00:00',1);

UNLOCK TABLES;

/*Table structure for table `students` */

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `student_id` int(9) NOT NULL AUTO_INCREMENT,
  `username` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_year` year(4) NOT NULL,
  PRIMARY KEY (`student_id`),
  KEY `fk_student_room` (`room_id`),
  KEY `fk_student_user` (`username`),
  CONSTRAINT `fk_student_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `fk_student_user` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `students` */

LOCK TABLES `students` WRITE;

UNLOCK TABLES;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role_id` char(1) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`username`),
  KEY `users_role_id_fkey` (`role_id`),
  CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

LOCK TABLES `users` WRITE;

insert  into `users`(`username`,`password`,`name`,`role_id`,`status`) values 
('12345','123','Jessica','3','1'),
('GR001','pass6','Frank Guru','1','1'),
('GR002','pass7','Grace Guru','1','1'),
('GR003','pass8','Hank Guru','1','1'),
('GR004','pass9','Ivy Guru','1','1'),
('GR005','pass10','Jack Guru','1','1'),
('MR001','pass11','Ken Murid','3','1'),
('MR002','pass12','Leo Murid','3','1'),
('MR003','pass13','Mona Murid','3','1'),
('MR004','pass14','Nina Murid','3','1'),
('MR005','pass15','Oscar Murid','3','1'),
('MR006','pass16','Paul Murid','3','1'),
('MR007','pass17','Quinn Murid','3','1'),
('MR008','pass18','Rita Murid','3','1'),
('MR009','pass19','Sam Murid','3','1'),
('MR010','pass20','Tina Murid','3','1'),
('sarpras','jaya','SARPRAS','0','1'),
('TS001','pass1','Alice Sarpras','0','1'),
('TS002','pass2','Bob Sarpras','0','1'),
('TS003','pass3','Charlie Sarpras','0','1'),
('TS004','pass4','David Sarpras','0','1'),
('TS005','pass5','Eve Sarpras','0','1');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

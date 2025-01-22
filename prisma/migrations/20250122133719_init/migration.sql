-- CreateTable
CREATE TABLE `complains` (
    `complain_id` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `classroom_facilities_id` VARCHAR(255) NOT NULL,
    `complaint` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('resolved', 'still resolving', 'unresolved') NOT NULL DEFAULT 'unresolved',
    `lampiran` VARCHAR(255) NOT NULL,

    INDEX `complains_classroom_facilities_id_fkey`(`classroom_facilities_id`),
    INDEX `complains_username_fkey`(`username`),
    PRIMARY KEY (`complain_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facilities` (
    `facility_id` VARCHAR(255) NOT NULL,
    `facility_name` VARCHAR(100) NOT NULL,
    `facility_description` TEXT NOT NULL,
    `facility_qty` INTEGER NOT NULL,
    `room_id` VARCHAR(255) NOT NULL,

    INDEX `facilities_room_id_fkey`(`room_id`),
    PRIMARY KEY (`facility_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `reservation_id` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `room_id` VARCHAR(255) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `purpose` VARCHAR(255) NOT NULL,
    `status_sarpras` ENUM('pending', 'approved', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',
    `teacher_assistant` VARCHAR(255) NULL,
    `status_guru` ENUM('pending', 'rejected', 'approved', '') NULL,
    `description` TEXT NULL,
    `prev` VARCHAR(255) NULL,
    `next` VARCHAR(255) NULL,

    INDEX `reservations_room_id_fkey`(`room_id`),
    INDEX `reservations_username_fkey`(`username`),
    INDEX `next_fkey`(`next`),
    INDEX `prev_fkey`(`prev`),
    INDEX `reservations_teacher_fkey`(`teacher_assistant`),
    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role_id` CHAR(1) NOT NULL,
    `role_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_facilities` (
    `room_facilities_id` VARCHAR(255) NOT NULL,
    `room_id` VARCHAR(255) NOT NULL,
    `facility_id` VARCHAR(255) NOT NULL,
    `qty` INTEGER NOT NULL,
    `condition` VARCHAR(191) NOT NULL,

    INDEX `classroom_facilities_facility_id_fkey`(`facility_id`),
    INDEX `classroom_facilities_room_id_fkey`(`room_id`),
    PRIMARY KEY (`room_facilities_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `room_id` VARCHAR(255) NOT NULL,
    `room_name` VARCHAR(11) NOT NULL,
    `room_capacity` INTEGER NOT NULL,
    `room_category` VARCHAR(255) NOT NULL,
    `room_status` VARCHAR(191) NOT NULL DEFAULT 'available',
    `is_class` BOOLEAN NOT NULL,

    INDEX `fk_room_categories`(`room_category`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(10) NOT NULL,
    `booking` BOOLEAN NOT NULL DEFAULT true,
    `booking_start` TIME(0) NOT NULL,
    `booking_end` TIME(0) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `reservation_start` TIME(0) NOT NULL,
    `reservation_end` TIME(0) NOT NULL,
    `conditional_time` TIME(0) NOT NULL,
    `accompanying_teacher` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role_id` CHAR(1) NOT NULL,
    `status` CHAR(1) NOT NULL DEFAULT '1',
    `kelas` VARCHAR(255) NULL,
    `no_absen` INTEGER NULL,

    INDEX `users_role_id_fkey`(`role_id`),
    INDEX `users_rooms`(`kelas`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_categories` (
    `room_category` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`room_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `complains` ADD CONSTRAINT `complains_classroom_facilities_id_fkey` FOREIGN KEY (`classroom_facilities_id`) REFERENCES `room_facilities`(`room_facilities_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complains` ADD CONSTRAINT `complains_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facilities` ADD CONSTRAINT `facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `next_fkey` FOREIGN KEY (`next`) REFERENCES `reservations`(`reservation_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `prev_fkey` FOREIGN KEY (`prev`) REFERENCES `reservations`(`reservation_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_teacher_fkey` FOREIGN KEY (`teacher_assistant`) REFERENCES `users`(`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_facilities` ADD CONSTRAINT `classroom_facilities_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`facility_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_facilities` ADD CONSTRAINT `classroom_facilities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `fk_room_categories` FOREIGN KEY (`room_category`) REFERENCES `room_categories`(`room_category`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_rooms` FOREIGN KEY (`kelas`) REFERENCES `rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

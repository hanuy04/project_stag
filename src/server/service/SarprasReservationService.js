import { getDay } from "@/utils/DateTime";
import prisma from "../db/prisma";

export default {
  getReservation: async (whereCondition = {}, orderBy = {}) => {
    try {
      const reservation = await prisma.reservations.findFirst({
        where: whereCondition,
        orderBy: orderBy,
        include: {
          users: true,
          rooms: true,
        },
      });
      if (reservation) {
        return {
          success: true,
          reservation: reservation,
        };
      } else {
        return {
          success: false,
          message: "Peminjaman tidak ditemukan",
        };
      }
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },

  getReservations: async (
    whereCondition = {},
    orderBy = {},
    take = undefined,
    skip = undefined
  ) => {
    console.log(skip);
    
    try {
      const reservations = await prisma.reservations.findMany({
        where: whereCondition,
        include: {
          users: {
            include: {
              rooms: true,
            },
          },
          rooms: true,
          reservation_teacher: true,
        },
        orderBy,
        take: take,
        skip: skip,
      });
      return {
        success: true,
        reservations: reservations,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },

  getWeekdayOverlappingReservations: async (reservation, status_sarpras) => {
    try {
      const overlappingReservations = await prisma.reservations.findMany({
        where: {
          reservation_id: {
            not: reservation.reservation_id,
          },
          room_id: reservation.room_id,
          status_sarpras: status_sarpras,
          start_time: {
            gt: new Date(new Date(reservation.start_time).setHours(0, 0, 0, 0)),
            lt: new Date(
              new Date(reservation.start_time).setHours(23, 59, 59, 999)
            ),
          },
        },
      });
      console.log({ overlappingReservations });
      return {
        success: true,
        reservations: overlappingReservations,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },

  getWeekendOverlappingReservations: async (reservation, status_sarpras) => {
    try {
      const overlappingReservations = await prisma.reservations.findMany({
        where: {
          reservation_id: {
            not: reservation.reservation_id, // Exclude the current reservation
          },
          room_id: reservation.room_id, // Check for the same room
          status_sarpras: status_sarpras, // Check for the same status
          OR: [
            // Case 1: Reservasi lain dimulai SEBELUM reservasi baru dan berakhir SETELAH reservasi baru dimulai
            {
              start_time: {
                lt: new Date(reservation.start_time),
              },
              end_time: {
                gt: new Date(reservation.start_time),
              },
            },
            // Case 2: Reservasi lain dimulai SEBELUM reservasi baru berakhir dan berakhir SETELAH reservasi baru berakhir
            {
              start_time: {
                lt: new Date(reservation.end_time),
              },
              end_time: {
                gt: new Date(reservation.end_time),
              },
            },
            // Case 3: Reservasi lain dimulai SETELAH reservasi baru dimulai dan berakhir SEBELUM reservasi baru berakhir
            {
              start_time: {
                gt: new Date(reservation.start_time),
              },
              end_time: {
                lt: new Date(reservation.end_time),
              },
            },
            // Case 4: Reservasi lain dimulai SEBELUM reservasi baru dimulai dan berakhir SETELAH reservasi baru berakhir
            {
              start_time: {
                lt: new Date(reservation.start_time),
              },
              end_time: {
                gt: new Date(reservation.end_time),
              },
            },
          ],
        },
        include: {
          rooms: true, // Include room details
        },
      });

      console.log({ overlappingReservations });

      return {
        success: true,
        reservations: overlappingReservations,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },

  createReservation: async (data) => {
    const newReservation = {
      reservation_id: data.reservation_id,
      username: data.username,
      room_id: data.room_id,
      start_time: data.start_time,
      end_time: data.end_time,
      purpose: data.purpose,
      status_sarpras: "approved",
      next: data.next,
      prev: data.prev,
    };

    try {
      const reservation = await prisma.reservations.create({
        data: newReservation,
        include: {
          rooms: true,
          users: true,
          // next: true,
          // prev: true,
        },
      });
      // console.log(reservation);
      return {
        success: true,
        reservation,
        message: "berhasil tambah data",
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },

  updateReservation: async (reservation_id, data) => {
    try {
      await prisma.reservations.update({
        where: {
          reservation_id: reservation_id,
        },
        data: data,
      });
      return {
        success: true,
        message: `Updating ${reservation_id} successfully`,
      };
    } catch (e) {
      return {
        success: false,
        message: `Error in updating ${reservation_id} : ${e.message}`,
      };
    }
  },

  getReservationsGroupByRoom: async (whereCondition = {}) => {
    try {
      const reservations = await prisma.rooms.findMany({
        where: {
          reservations: {
            some: whereCondition,
          },
        },
        include: {
          reservations: {
            where: whereCondition,
            include: {
              users: {
                include: {
                  rooms: true,
                },
              },
              reservation_teacher: true,
            },
          },
        },
      });

      return {
        success: true,
        reservations,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  deleteReservation: async (reservation_id) => {
    try {
      // Menghapus reservasi berdasarkan ID
      const deletedReservation = await prisma.reservations.delete({
        where: {
          reservation_id: reservation_id,
        },
        include: {
          prev_reservation: true,
          next_reservation: true,
        },
      });

      // Mengembalikan respons sukses
      return {
        success: true,
        reservation: deletedReservation,
      };
    } catch (error) {
      // Handle error jika reservasi tidak ditemukan atau terjadi kesalahan lain
      if (error.code === "P2025") {
        return {
          success: false,
          status: 404,
          message: "Reservation not found",
        };
      }
      return { success: false, status: 500, message: error.message };
    }
  },
};

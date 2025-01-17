import { validateSarprasUpdateReservation } from "@/utils/validation/updateReservationSchema";
import SarprasReservationService from "../service/SarprasReservationService";
import {
  formatDateToISO,
  formatFullDate,
  formatTimeHHMM,
  generateReservationDates,
  getDay,
} from "@/utils/DateTime";

export default {
  getReservation: async (req, res) => {
    const { id } = req.query;

    const reservationExist = await SarprasReservationService.getReservation({
      reservation_id: id,
    });

    if (!reservationExist.success) {
      return res.status(404).json({ message: reservationExist.message });
    }

    return res.status(200).json({
      reservation: {
        ...reservationExist.reservation,
        tanggal: formatFullDate(reservationExist.reservation.start_time),
        start_time: formatTimeHHMM(reservationExist.reservation.start_time),
        end_time: formatTimeHHMM(reservationExist.reservation.end_time),
      },
    });
  },

  getReservations: async (req, res) => {
    const {
      groupby,
      rooms,
      status_sarpras,
      date,
      type,
      status_guru,
      sortColumn,
      sortOrder,
      limit,
      offset,
      keyword = "",
      start_date,
      end_date,
    } = req.query;

    const whereCondition = {};

    whereCondition.OR = [
      { rooms: { room_name: { contains: keyword } } },
      { purpose: { contains: keyword } },
    ];

    if (type && type === "peminjaman") {
      whereCondition.OR.push(
        { users: { name: { contains: keyword } } },
        { users: { username: { contains: keyword } } },
        { reservation_teacher: { name: { contains: keyword } } },
        { description: { contains: keyword } }
      );
    }

    if (rooms) whereCondition.room_id = { in: rooms.split(",") };
    if (status_sarpras) whereCondition.status_sarpras = status_sarpras;
    if (status_guru) whereCondition.status_guru = status_guru;
    if (type) {
      const roleCondition = type === "peminjaman" ? { not: "0" } : "0";
      whereCondition.users = {
        role_id: roleCondition,
      };
    }

    if (date) {
      const isoToday = formatDateToISO(date);
      if (isoToday) {
        const splited = date.split("-");

        const nextDate = `${splited[0]}-${splited[1]}-${(
          parseInt(splited[2]) + 1
        )
          .toString()
          .padStart(2, "0")}`;

        whereCondition.start_time = {
          gte: formatDateToISO(date),
          lt: formatDateToISO(nextDate),
        };
      } else {
        return res.status(500).json({
          message: "Invalid date format",
        });
      }
    }

    if (start_date && end_date) {
      whereCondition.start_time = {
        gte: formatDateToISO(start_date),
        lte: formatDateToISO(end_date),
      };
    }

    const orderBy = {};
    if (sortColumn) {
      if (sortColumn === "name") orderBy.users = { name: sortOrder };
      else if (sortColumn === "date") orderBy.start_time = sortOrder;
      else if (sortColumn === "reservation_id")
        orderBy.reservation_id = sortOrder;
      else if (sortColumn === "room_name")
        orderBy.rooms = { room_name: sortOrder };
      else if (sortColumn === "reservation_teacher")
        orderBy.reservation_teacher = { name: sortOrder };
      else if (sortColumn === "purpose") orderBy.purpose = sortOrder;
      else if (sortColumn === "description") orderBy.description = sortOrder;
    }

    const take = parseInt(limit) || undefined;
    const skip =
      limit && offset ? parseInt(limit) * (parseInt(offset) - 1) : undefined;

    if (groupby === "room") {
      const response =
        await SarprasReservationService.getReservationsGroupByRoom(
          whereCondition,
          orderBy
        );

      if (!response.success)
        return res.status(500).json({ message: response.message });

      const formatedPeminjaman = response.reservations.map((room) => ({
        ...room,
        reservations: room.reservations.map((reservation) => ({
          ...reservation,
          tanggal: formatFullDate(reservation.start_time),
          start_time: formatTimeHHMM(reservation.start_time),
          end_time: formatTimeHHMM(reservation.end_time),
        })),
      }));

      return res.status(200).json({ data: formatedPeminjaman });
    }

    const response = await SarprasReservationService.getReservations(
      whereCondition,
      orderBy,
      take,
      skip
    );

    if (!response.success)
      return res.status(500).json({ message: response.message });

    const getStatus = (reservation) => {
      if (reservation.teacher_assistant) {
        if (reservation.status_guru === "pending") return "MENUNGGU PENDAMPING";
        if (reservation.status_guru === "rejected") return "DITOLAK PENDAMPING";
      }
      if (reservation.status_sarpras === "pending") return "MENUNGGU SARPRAS";
      if (reservation.status_sarpras === "approved") return "DISETUJUI";
      if (reservation.status_sarpras === "rejected") return "DITOLAK SARPRAS";

      return "STATUS TIDAK DIKETAHUI";
    };

    const sort = () => {
      const formatedPeminjaman = response.reservations.map((item) => {
        return {
          ...item,
          status: getStatus(item),
          formatted_start_time: formatTimeHHMM(item.start_time),
          formatted_end_time: formatTimeHHMM(item.end_time),
        };
      });

      let sorted;
      if (sortColumn === "start_time") {
        sorted = formatedPeminjaman.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.formatted_start_time.localeCompare(b.formatted_start_time); // Ascending
          } else {
            return b.formatted_start_time.localeCompare(a.formatted_start_time); // Descending
          }
        });
      } else if (sortColumn === "end_time") {
        sorted = formatedPeminjaman.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.formatted_end_time.localeCompare(b.formatted_end_time); // Ascending
          } else {
            return b.formatted_end_time.localeCompare(a.formatted_end_time); // Descending
          }
        });
      } else if (sortColumn == "status") {
        sorted = formatedPeminjaman.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.status.localeCompare(b.status); // Ascending
          } else {
            return b.status.localeCompare(a.status); // Descending
          }
        });
      } else {
        sorted = formatedPeminjaman;
      }

      const originalSortedReservations = sorted.map((reservation) => {
        const {
          formatted_start_time,
          formatted_end_time,
          status,
          ...originalData
        } = reservation;
        return originalData; // Kembalikan data asli tanpa format
      });

      return originalSortedReservations;
    };

    const actualReservation = await SarprasReservationService.getReservations(
      whereCondition
    );

    return res.status(200).json({
      success: true,
      actual: actualReservation.reservations.length,
      pagination: response.reservations.length,
      reservations: sort(),
    });
  },

  createReservation: async (req, res) => {
    const { username, room_id } = req.body;
    const reservationDates = generateReservationDates(req.body);

    const add = async (item) => {
      const result = await SarprasReservationService.createReservation({
        ...req.body,
        ...item,
      });
      return result;
    };

    const response = await SarprasReservationService.getReservation(
      { username },
      { reservation_id: "desc" }
    );

    const newID = response.success
      ? parseInt(response.reservation.reservation_id.split("JD")[1]) + 1
      : 1;

    // Generate IDs for all reservations
    reservationDates.forEach((item, index) => {
      const stringID = `JD${(newID + index).toString().padStart(6, "0")}`;
      item.reservation_id = stringID;
      item.room_id = room_id;

      if (index < reservationDates.length - 1)
        reservationDates[index + 1].prev = stringID;
    });

    // Phase 1: Check for overlapping reservations
    for (const item of reservationDates) {
      const overlapping =
        await SarprasReservationService.getWeekendOverlappingReservations(
          item,
          "approved"
        );

      if (!overlapping.success) {
        return res.status(500).json({
          message: overlapping.message,
        });
      }

      if (overlapping.reservations.length > 0) {
        return res.status(400).json({
          message:
            "Sudah ada kegiatan " +
            overlapping.reservations.map(
              (item) =>
                `\n${item.purpose} pada ${formatFullDate(
                  new Date(item.start_time).toUTCString()
                )} ${formatTimeHHMM(
                  new Date(item.start_time).toUTCString()
                )} di ${item.rooms.room_name}`
            ),
        });
      }
    }

    // Phase 2: Create reservations if no overlaps are found
    for (const item of reservationDates) {
      const doAdd = await add(item);

      if (item.prev) {
        const updatePrev = await SarprasReservationService.updateReservation(
          item.prev,
          {
            next: item.reservation_id,
          }
        );

        if (!updatePrev.success) {
          return res.status(500).json({ message: updatePrev.message });
        }
      }

      if (!doAdd.success) {
        return res.status(500).json({
          message: doAdd.message,
        });
      }
    }

    return res.status(200).json({ message: "success" });
  },

  updateReservation: async (req, res) => {
    // cek reservasi exist
    const { id } = req.query;
    const { status_sarpras, date, start_time, end_time, purpose, room_id } =
      req.body;

    const reservationExist = await SarprasReservationService.getReservation({
      reservation_id: id,
    });

    if (!reservationExist.success) {
      return res.status(404).json({ message: reservationExist.message });
    }

    const data = status_sarpras
      ? req.body
      : {
          room_id,
          start_time: new Date(`${date}T${start_time}Z`).toISOString(),
          end_time: new Date(`${date}T${end_time}Z`).toISOString(),
          purpose,
        };

    try {
      await validateSarprasUpdateReservation(data);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    // cari reservasi yang overlapping
    if (status_sarpras && status_sarpras === "approved") {
      const day = getDay(reservationExist.reservation.start_time);

      const overlappingReservations =
        day > 0 && day < 6
          ? await SarprasReservationService.getWeekdayOverlappingReservations(
              reservationExist.reservation,
              "pending"
            )
          : await SarprasReservationService.getWeekendOverlappingReservations(
              reservationExist.reservation,
              "pending"
            );

      if (!overlappingReservations.success) {
        return res.status(500).json({
          message: overlappingReservations.message,
        });
      }

      // tolak reservasi yang overlapping
      await overlappingReservations.reservations.map(async (item) => {
        const update = await SarprasReservationService.updateReservation(
          item.reservation_id,
          {
            status_sarpras: "rejected",
            description: "Ruangan digunakan untuk kegiatan lain",
          }
        );

        if (!update.success) {
          return res.status(500).json({ message: update.message });
        }
      });
    }

    // update reservasi
    const update = await SarprasReservationService.updateReservation(id, data);

    if (!update.success) {
      return res.status(500).json({ message: update.message });
    }

    if (status_sarpras) {
      const action =
        data.status_sarpras === "approved" ? "menyetujui" : "menolak";

      return res.status(200).json({
        message: `Berhasil ${action} peminjaman`,
      });
    }

    return res.status(200).json({
      message: `Berhasil mengubah peminjaman`,
    });
  },

  deleteReservation: async (req, res) => {
    const { deleteType, id } = req.query;

    const deleted = await SarprasReservationService.deleteReservation(id);

    const deletedArray = [];

    if (!deleted.success) {
      return res.status(deleted.status).json({
        message: deleted.message,
      });
    }

    if (deleteType === "only") {
      if (deleted.reservation.prev) {
        const updatePrev = await SarprasReservationService.updateReservation(
          deleted.reservation.prev,
          { next: deleted.reservation.next }
        );

        if (!updatePrev.success) {
          return res.status(updatePrev.status).json({
            message: updatePrev.message,
          });
        }
      }

      if (deleted.reservation.next) {
        const updateNext = await SarprasReservationService.updateReservation(
          deleted.reservation.next,
          { prev: deleted.reservation.prev }
        );

        if (!updateNext.success) {
          return res.status(updateNext.status).json({
            message: updateNext.message,
          });
        }
      }
    }

    deletedArray.push(deleted.reservation);

    // Jika deleteType adalah "next" atau "all", iterasi ke depan (next)
    if (deleteType === "after" || deleteType === "all") {
      let currentReservation = deleted.reservation;
      while (currentReservation.next) {
        const deleted = await SarprasReservationService.deleteReservation(
          currentReservation.next
        );

        if (!deleted.success) {
          return res.status(500).json({
            message: deleted.message,
          });
        }

        deletedArray.push(deleted.reservation);

        // Update currentReservation to the next reservation
        currentReservation = deleted.reservation;
      }
    }

    // Jika deleteType adalah "all", iterasi ke belakang (prev)
    if (deleteType === "all") {
      let currentReservation = deleted.reservation;
      while (currentReservation.prev) {
        const deleted = await SarprasReservationService.deleteReservation(
          currentReservation.prev
        );

        if (!deleted.success) {
          return res.status(500).json({
            message: deleted.message,
          });
        }
        deletedArray.push(deleted.reservation);
        // Update currentReservation to the previous reservation
        currentReservation = deleted.reservation;
      }
    }

    return res.status(200).json({
      message: `Berhasil menghapus ${deletedArray.length} jadwal`,
      reservations: deletedArray,
    });
  },
};

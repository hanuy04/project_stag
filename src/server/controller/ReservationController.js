import { formatFullDate, formatTimeHHMM } from "@/utils/DateTime";
import ReservationService from "../service/ReservationService";
import reservations from "@/pages/api/rooms/reservations";

export default {
  getUserReservations: async (req, res) => {
    const username = req.user.username;

    const peminjaman = await ReservationService.getUserReservations();
    return res.json(peminjaman);
  },

  getReservationGroupByRoom: async (req, res) => {
    try {
      const ruangan = await ReservationService.getReservationGroupByRoom();

      const formatedPeminjaman = ruangan.map((room) => ({
        ...room,
        reservations: room.reservations.map((reservation) => ({
          ...reservation,
          tanggal: formatFullDate(reservation.start_time),
          start_time: formatTimeHHMM(reservation.start_time),
          end_time: formatTimeHHMM(reservation.end_time),
        })),
      }));

      return res.status(200).json({
        success: true,
        data: formatedPeminjaman,
      });
    } catch (error) {
      console.error("Error in getReservationGroupByRoom:", error);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat mengambil data reservasi",
        error: error.message,
      });
    }
  },
};

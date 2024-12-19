import ReservationService from "../service/ReservationService";

export default {
  getUserReservations: async (req, res) => {

    const username = req.user.username;

    const peminjaman = await ReservationService.getUserReservations();
    return res.json(peminjaman)

  },
};

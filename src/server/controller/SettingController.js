import SettingService from "../service/SettingService";

export default {
  getReservationSchedule: async (req, res) => {
    const id = parseInt(req.query.id);

    if (!id) {
      const reservationSchedule = await SettingService.getAllSetting();
      return res.status(200).json(reservationSchedule);
    } else {
      const reservationSchedule = await SettingService.getSettingByID(id);
      console.log(id);
      return res.status(200).json(reservationSchedule);
    }
  },

  updateReservationSchedule: async (req, res) => {
    // return res.status(200).json("halo");
    const reservationSchedule = await SettingService.updateReservationSchedule(
      req.body.jadwalPeminjaman
    );
    return res.status(200).json(reservationSchedule.updatedSchedules);
  },
};

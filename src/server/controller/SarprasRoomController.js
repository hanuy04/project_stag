import SarprasReservationService from "../service/SarprasReservationService";
import SarprasRoomService from "../service/SarprasRoomService";

export default {
  getRooms: async (req, res) => {
    const { groupby } = req.query;
    if (groupby && groupby == "category") {
      const response = await SarprasRoomService.getRoomsGroupByCategory();

      if (!response.success)
        return res.status(500).json({
          message: response.message,
        });

      return res.json({ categories: response.categories });
    }

    const response = await SarprasRoomService.getRooms();
    if (!response.success)
      return res.status(500).json({
        message: response.message,
      });

    return res.json({ rooms: response.rooms });
  },

};

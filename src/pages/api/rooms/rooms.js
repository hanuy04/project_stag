// import ReservationController from "@/server/controller/ReservationController";
// import RoomController from "@/server/controller/RoomController";
import middleware from "@/utils/verifyUser";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // await RoomController.getRooms(req,res)
  } else if (req.method === "PUT") {
    // await SettingController.updateReservationSchedule(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler);

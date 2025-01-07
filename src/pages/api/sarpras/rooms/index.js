import SarprasRoomController from "@/server/controller/SarprasRoomController";
import middleware from "@/utils/verifyUser";

const handler = async (req, res) => {
  if (req.method === "GET") {

    await SarprasRoomController.getRooms(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler, ["sarpras"]);

import middleware from "@/utils/verifyUser";

const {
  default: SettingController,
} = require("@/server/controller/SettingController");

const handler = async (req, res) => {
  if (req.method === "GET") {
    await SettingController.getReservationSchedule(req, res);
  } else if (req.method === "PUT") {
    await SettingController.updateReservationSchedule(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler);

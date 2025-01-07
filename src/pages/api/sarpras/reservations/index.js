import SarprasReservationController from "@/server/controller/SarprasReservationController";
import middleware from "@/utils/verifyUser";

const handler = async (req, res) => {
  if (req.method === "GET") {
    await SarprasReservationController.getReservations(req, res);
  } else if (req.method === "POST") {
    await SarprasReservationController.createReservation(req, res);
  } 
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler, ["sarpras"]);

import SarprasReservationController from "@/server/controller/SarprasReservationController";
import middleware from "@/utils/verifyUser";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    await SarprasReservationController.updateReservation(req, res);
  } else if (req.method === "GET") {
    await SarprasReservationController.getReservation(req, res);
  } else if (req.method === "DELETE") {
    await SarprasReservationController.deleteReservation(req, res);
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler, ["sarpras"]);

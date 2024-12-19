import ReservationController from "@/server/controller/ReservationController";
import middleware from "@/utils/verifyUser";

const handler = async (req, res) => {
  if (req.method === "GET") {

    await ReservationController.getUserReservations(req,res);

    // return res.json(req.user);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler, ["student", "osis", "teacher"]);

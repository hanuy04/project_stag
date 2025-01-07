import SarprasReservationController from "@/server/controller/SarprasReservationController";
import SarprasReservationService from "@/server/service/SarprasReservationService";
import middleware from "@/utils/verifyUser";
import reservations from "../../rooms/reservations";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id;
    const peminjaman = await SarprasReservationService.getReservation({
      reservation_id: id,
    });

    const reservation = {
      reservation_id: "kocak",
      room_id: "R001",
      start_time: "2024-01-05T10:30:00.000Z",
      end_time: "2024-01-05T11:30:00.000Z",
    };

    // return res.json(peminjaman);

    const nabrak =
      await SarprasReservationService.getWeekendOverlappingReservations(
        reservation
      );

    return res.json(nabrak);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler, ["sarpras"]);

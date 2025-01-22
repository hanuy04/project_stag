const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  reservation_id: String,
  username: String,
  room_id: String,
  start_time: Date,
  end_time: Date,
  purpose: String,
  status_sarpras: String,
  teacher_assistant: String,
  status_guru: String,
  description: String,
  prev: String,
  next: String,
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;

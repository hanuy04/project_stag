import { useEffect, useState } from "react";

const RoomReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/reservationsCecil");
      const data = await response.json();
      setReservations(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Peminjaman Ruangan</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Ruangan</th>
            <th>Keperluan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((item, index) => (
            <tr key={item.reservation_id}>
              <td>{index + 1}</td>
              <td>{new Date(item.start_time).toLocaleDateString()}</td>
              <td>
                {new Date(item.start_time).toLocaleTimeString()} -{" "}
                {new Date(item.end_time).toLocaleTimeString()}
              </td>
              <td>{item.room_id}</td>
              <td>{item.purpose}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomReservation;

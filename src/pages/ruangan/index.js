import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";

const index = () => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRoomData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch room data:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const timeSlots = [
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ];

  const renderAvailability = (room, timeSlot) => {
    const [start, end] = timeSlot.split(" - ").map((t) => {
      const [hour, minute] = t.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute, 0, 0);
      return date;
    });

    const isBooked = room.reservations.some(
      (reservation) =>
        reservation.startTime <= start && reservation.endTime >= end
    );

    return isBooked ? (
      <td className="border border-blue-700 bg-red-500 p-2">Tidak Tersedia</td>
    ) : (
      <td className="border border-blue-700 p-2">Tersedia</td>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="bg-white w-full h-screen">
        <div className="p-4 w-full">
          {/* header */}
          <div className="flex">
            <h1 className="font-semibold text-4xl text-black">
              Informasi Ketersediaan Kelas
            </h1>
          </div>
          {/* kategori */}
          <div className="flex w-1/2 mt-10">
            <label>Kategori</label>
            <select className="form-control border border-black rounded p-1 mx-3 w-full">
              <option>Kelas X</option>
              <option>Kelas XI</option>
              <option>Kelas XII</option>
            </select>
          </div>
          {/* table */}
          <div className="w-full mt-5">
            <table border={"1"} className="w-full border border-blue-700">
              <thead className="border border-blue-700">
                <tr className="bg-blue-700 text-white">
                  <th className="border border-blue-700">Waktu</th>
                  {roomData.map((room) => (
                    <th key={room.id} className="border border-blue-700">
                      {room.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot}>
                    <td className="border border-blue-700 p-2">{timeSlot}</td>
                    {roomData.map((room) => renderAvailability(room, timeSlot))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

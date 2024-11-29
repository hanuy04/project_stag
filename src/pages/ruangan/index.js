import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data rooms:", data);

        if (!data || data.error) {
          console.error(
            "Error fetching rooms:",
            data?.message || "Unknown error"
          );
          return;
        }

        setRoomData(data.rooms);
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

  // Function to check availability for a specific room at a specific time slot
  const renderAvailability = (room, timeSlot) => {
    // Split the time slot into start and end times (in 24-hour format)
    const [startSlot, endSlot] = timeSlot.split(" - ").map((t) => {
      const [hour, minute] = t.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute, 0, 0); // Set to current date with specified time
      return date;
    });

    // Loop through reservations to check for overlapping times
    const reservation = room.reservations.find((res) => {
      const resStart = new Date(res.startTime); // Parse startTime (YYYY-MM-DD HH:MM:SS)
      const resEnd = new Date(res.endTime); // Parse endTime

      // Normalize reservation times to match the current date and the provided time slot
      resStart.setFullYear(
        startSlot.getFullYear(),
        startSlot.getMonth(),
        startSlot.getDate()
      );
      resEnd.setFullYear(
        startSlot.getFullYear(),
        startSlot.getMonth(),
        startSlot.getDate()
      );

      // Check for overlap between reservation and timeSlot
      return resStart < endSlot && resEnd > startSlot;
    });

    if (reservation) {
      return (
        <td className="border border-blue-700 bg-orange-500 text-left p-1">
          <b>{reservation.user.username}</b>
          <br />
          {room.name}
          <br />
          {reservation.purpose}
          <br />
          {new Date(reservation.startTime).toLocaleString()} -{" "}
          {new Date(reservation.endTime).toLocaleString()}
        </td>
      );
    } else {
      return <td className="border border-blue-700 bg-white p-1"></td>;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="bg-white w-full h-screen">
        <div className="p-4 w-full">
          <div className="flex">
            <h1 className="font-semibold text-4xl text-black">
              Informasi Ketersediaan Kelas
            </h1>
          </div>

          <div className="flex w-1/2 mt-10">
            <label>Kategori</label>
            <select className="form-control border border-black rounded p-1 mx-3 w-full">
              <option>Kelas X</option>
              <option>Kelas XI</option>
              <option>Kelas XII</option>
            </select>
          </div>

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

export default Index;

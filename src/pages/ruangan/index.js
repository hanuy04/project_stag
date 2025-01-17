import LoadingPage from "@/components/general/LoadingPage";
import MainLayout from "@/components/layouts/MainLayout";
import Topbar from "@/components/navigation/topbar";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("X-");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `/api/reservations?kategori=${selectedCategory}&tanggal=${selectedDate}` // query ada kategori kelas dan tanggal reservasi
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data || data.error) {
          console.error(
            "Error fetching rooms:",
            data?.message || "Unknown error"
          );
          return;
        }

        setRoomData(data.rooms);
      } catch (error) {
        console.error("Failed to fetch room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [selectedCategory, selectedDate]);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Filter rooms based on selected category
  const filteredRooms = roomData.filter(
    (room) =>
      room.room_name && room.room_name.includes(`Ruang ${selectedCategory}`)
  );
  // console.log("filteredRooms: ", filteredRooms);

  const renderAvailability = (room, timeSlot) => {
    const [startSlot, endSlot] = timeSlot
      .split(" - ")
      .map((t) => t.substring(0, 5));

    const reservation = room.reservations.find((res) => {
      const resStart = res.start_time.slice(11, 16);
      const resEnd = res.end_time.slice(11, 16);

      return (
        (resStart >= startSlot && resStart < endSlot) ||
        (resEnd > startSlot && resEnd <= endSlot) ||
        (resStart <= startSlot && resEnd >= endSlot)
      );
    });

    if (reservation) {
      const resStart = reservation.start_time.slice(11, 16);
      const resEnd = reservation.end_time.slice(11, 16);

      const slotStartMinutes =
        parseInt(startSlot.split(":")[0]) * 60 +
        parseInt(startSlot.split(":")[1]);
      const slotEndMinutes =
        parseInt(endSlot.split(":")[0]) * 60 + parseInt(endSlot.split(":")[1]);

      const resStartMinutes =
        parseInt(resStart.split(":")[0]) * 60 +
        parseInt(resStart.split(":")[1]);
      const resEndMinutes =
        parseInt(resEnd.split(":")[0]) * 60 + parseInt(resEnd.split(":")[1]);

      const overlapStart = Math.max(slotStartMinutes, resStartMinutes);
      const overlapEnd = Math.min(slotEndMinutes, resEndMinutes);

      const overlapPercentage =
        ((overlapEnd - overlapStart) / (slotEndMinutes - slotStartMinutes)) *
        100;

      const gradientDirection =
        resStartMinutes < slotStartMinutes ? "to right" : "to left";

      return (
        <td
          className="border border-gray-300 text-left p-2"
          style={{
            backgroundColor: "orange", // Fill the entire column with orange color
          }}
        >
          <strong>{reservation.users.name}</strong>
          <br />
          {reservation.purpose}
          <br />
          <strong>
            {reservation.start_time.substring(11, 16)} -{" "}
            {reservation.end_time.substring(11, 16)}
          </strong>
        </td>
      );
    } else {
      return <td className="border border-gray-300 bg-white p-2"></td>;
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout>
      <Topbar title="Ketersediaan Ruangan" />
      <div className="bg-white w-full h-screen">
        <div className="p-4 w-full">
          <div className="flex w-1/2 mt-10">
            <label className="font-bold">Kategori</label>
            <select
              className="form-control border border-black rounded p-1 mx-3 w-full"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="X-">Kelas X</option>
              <option value="XI-">Kelas XI</option>
              <option value="XII-">Kelas XII</option>
            </select>

            <label className="font-bold">Tanggal</label>
            <input
              type="date"
              className="form-control border border-black rounded p-1 mx-3 w-full"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="w-full mt-5">
            <table border={"1"} className="w-full border border-blue-700">
              <thead className="border border-blue-700">
                <tr className="bg-blue-700 text-white">
                  <th className="border border-blue-700">Waktu</th>
                  {filteredRooms.map((room) => (
                    <th key={room.room_id} className="border border-blue-700">
                      {room.room_name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot}>
                    <td className="border border-blue-700 p-2">{timeSlot}</td>
                    {filteredRooms.length > 0 ? (
                      filteredRooms.map((room) =>
                        renderAvailability(room, timeSlot)
                      )
                    ) : (
                      <td
                        className="border border-blue-700 p-1"
                        colSpan={filteredRooms.length}
                      >
                        -
                      </td>
                    )}
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

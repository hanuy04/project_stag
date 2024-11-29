import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("X-");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `/api/reservations?kategori=${selectedCategory}`
        );
        console.log("category: ", selectedCategory);

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
  }, [selectedCategory]);

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

  // Filter rooms based on selected category
  const filteredRooms = roomData.filter((room) =>
    room.name.startsWith(`Ruang ${selectedCategory}`)
  );

  const renderAvailability = (room, timeSlot) => {
    const [startSlot, endSlot] = timeSlot
      .split(" - ")
      .map((t) => t.substring(0, 5)); // Ambil waktu pertama dari timeSlots

    const reservation = room.reservations.find((res) => {
      const resStart = res.startTime.substring(11, 16); // Ambil jam pertama dari startTime
      const resEnd = res.endTime.substring(11, 16); // Ambil jam pertama dari endTime

      // Cek jika waktu slot overlap dengan waktu reservasi
      return (
        (resStart >= startSlot && resStart < endSlot) || // Reservasi mulai dalam slot
        (resEnd > startSlot && resEnd <= endSlot) || // Reservasi berakhir dalam slot
        (resStart <= startSlot && resEnd >= endSlot) // Reservasi mencakup seluruh slot
      );
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
          {reservation.startTime.substring(11, 16)} -{" "}
          {reservation.endTime.substring(11, 16)}
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
            <select
              className="form-control border border-black rounded p-1 mx-3 w-full"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="X-">Kelas X</option>
              <option value="XI-">Kelas XI</option>
              <option value="XII-">Kelas XII</option>
            </select>
          </div>

          <div className="w-full mt-5">
            <table border={"1"} className="w-full border border-blue-700">
              <thead className="border border-blue-700">
                <tr className="bg-blue-700 text-white">
                  <th className="border border-blue-700">Waktu</th>
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <th key={room.id} className="border border-blue-700">
                        {room.name}
                      </th>
                    ))
                  ) : (
                    <th
                      className="border border-blue-700"
                      colSpan={timeSlots.length + 1}
                    >
                      Tidak ada ruangan untuk {selectedCategory}
                    </th>
                  )}
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

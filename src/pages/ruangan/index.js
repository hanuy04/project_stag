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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data: ", data.rooms);

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
      const resStart = res.start_time.slice(11, 16); // Format HH:mm dari start_time
      const resEnd = res.end_time.slice(11, 16); // Format HH:mm dari end_time
      console.log(resStart, " - ", resEnd);

      // Ambil reservasi yang mulai setelah startSlot dan sebelum endSlot
      return resStart >= startSlot && resEnd <= endSlot;
    });

    // console.log("reservation: ", reservation);
    // console.log("Room Data:", roomData);
    // console.log("Selected Category:", selectedCategory);
    // console.log("Filtered Rooms:", filteredRooms);

    if (reservation) {
      return (
        <td className="border border-blue-700 bg-orange-500 text-left p-1">
          <b>
            {reservation.users.name} {"("} {room.room_name}
            {")"}
          </b>
          <br />
          {reservation.purpose}
          <br />
          <b>
            {reservation.start_time.substring(11, 16)} -{" "}
            {reservation.end_time.substring(11, 16)}
          </b>
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

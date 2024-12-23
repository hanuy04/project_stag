import Topbar from "@/components/navigation/topbar";
import SarprasReservationTemplate from "./SarprasReservationTemplate";
import { Grid2 } from "@mui/material";
import ClockDisplay from "@/components/general/ClockDisplay";
import ReservationCard from "./ReservationCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SarprasReservationPage = () => {
  const [peminjaman, setPeminjaman] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/rooms/reservations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPeminjaman(data.data);
      } else {
        alert(`${response.status} ${data.error || data.message}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SarprasReservationTemplate>
        <Grid2 container columns={12}>
          <Grid2 item size={8}>
            {peminjaman.map((item) => {
              return <ReservationCard data={item} />;
            })}
          </Grid2>
          <Grid2 item size={4} paddingLeft={3}>
            <ClockDisplay />
          </Grid2>
        </Grid2>
      </SarprasReservationTemplate>
    </>
  );
};

export default SarprasReservationPage;

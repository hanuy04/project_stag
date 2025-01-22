import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";
import { formatFullDate, formatTimeHHMM } from "@/utils/DateTime";

const PengaduanCard = ({
    pengaduan
}) => {
    return (
        <Card className="my-4 p-2 border border-black">
            <CardContent>
                <Box className="flex justify-between items-start">
                    <Box>
                        <Typography variant="h6" className="font-medium">
                            {pengaduan.room_facilities.facilities.facility_name} [  {pengaduan.room_facilities.rooms.room_name} ]
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {`${formatFullDate(pengaduan.created_at)} | ${formatTimeHHMM(pengaduan.created_at)}`}
                        </Typography>
                    </Box>
                    <Box
                        className={`w-5 h-5 rounded-full ${pengaduan.status === "still_resolving"
                            ? "bg-yellow-400"
                            : pengaduan.status === "unresolved"
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                    />
                </Box>

                <Typography variant="body2" className="py-3">
                    {pengaduan.description}
                </Typography>

                <Box className="mt-2 p-2 bg-gray-50 rounded">
                    <Typography variant="body2" color="text.secondary">
                        {pengaduan.status === "still_resolving"
                            ? "DALAM PROSES PERBAIKAN"
                            : pengaduan.status === "unresolved"
                                ? "TIDAK BISA DIPERBAIKI"
                                : "SUDAH SELESAI"}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        {reservation.status_sarpras === "still_resolving"
                            ? "Menunggu persetujuan dari guru pendamping"
                            : reservation.status_sarpras === "unresolved"
                                ? "Kelas bertabrakan dengan jadwal lain"
                                : "Fasilitas sedang diperbaiki"}
                    </Typography> */}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PengaduanCard;

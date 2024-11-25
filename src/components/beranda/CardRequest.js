import React from 'react'

import {
    Card,
    CardContent,
    Box,
    Typography
} from '@mui/material';

const CardRequest = ({ title, date, time, description, status, type, files, supervisor }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Box className="flex justify-between items-start">
                    <Box>
                        <Typography variant="h6" className="font-medium">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {`${date} | ${time}`}
                        </Typography>
                    </Box>
                    <Box
                        className={`w-2 h-2 rounded-full ${status === 'pending' ? 'bg-yellow-400' :
                            status === 'rejected' ? 'bg-red-500' :
                                'bg-blue-500'
                            }`}
                    />
                </Box>

                <Typography variant="body2" className="mt-2">
                    {description}
                </Typography>

                {supervisor && (
                    <Box className="flex items-center mt-2">
                        <Typography variant="body2" color="text.secondary">
                            Pendamping: {supervisor}
                        </Typography>
                    </Box>
                )}

                {files && (
                    <Typography variant="body2" color="text.secondary" className="mt-1">
                        {files} file terlampir
                    </Typography>
                )}

                <Box className="mt-2 p-2 bg-gray-50 rounded">
                    <Typography variant="body2" color="text.secondary">
                        {type === 'pending' ? 'MENUNGGU PERSETUJUAN' :
                            type === 'rejected' ? 'DITOLAK' :
                                'DIPROSES'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {type === 'pending' ? 'Menunggu persetujuan dari guru pendamping' :
                            type === 'rejected' ? 'Kelas bertabrakan dengan jadwal lain' :
                                'Fasilitas sedang diperbaiki'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CardRequest

import { Card, CardContent, Button } from '@mui/material'
import { Person } from '@mui/icons-material'

export default function ConfirmationCard({ data }) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{data.room}</h3>
        <p className="text-gray-600 mb-4">{data.date} | {data.time}</p>
        <p className="text-gray-700 mb-6">{data.description}</p>
        <div className="flex items-center gap-4 mb-4">
          <Person />
          <span>{data.requester}</span>
        </div>
        <div className="flex gap-4">
          <Button variant="contained" color="error" fullWidth>
            Tolak
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: '#4338CA' }}
          >
            Konfirmasi
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


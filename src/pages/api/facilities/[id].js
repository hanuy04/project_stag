// pages/api/facilities/[id].js

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  const facilityId = parseInt(id);

  if (isNaN(facilityId)) {
    return res.status(400).json({ success: false, error: 'Invalid facility ID.' });
  }

  switch (method) {
    case 'GET':
      try {
        const facility = await prisma.facility.findUnique({
          where: { id: facilityId },
        });

        if (!facility) {
          return res.status(404).json({ success: false, error: 'Facility not found.' });
        }

        res.status(200).json({ success: true, data: facility });
      } catch (error) {
        console.error('Error fetching facility:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      break;
    case 'PUT':
      try {
        const { name, category } = req.body;
        if (!name || !category) {
          return res.status(400).json({ success: false, error: 'Name and category are required.' });
        }

        const updatedFacility = await prisma.facility.update({
          where: { id: facilityId },
          data: { name, category },
        });

        res.status(200).json({ success: true, data: updatedFacility });
      } catch (error) {
        console.error('Error updating facility:', error);
        if (error.code === 'P2025') {
          // Record not found
          return res.status(404).json({ success: false, error: 'Facility not found.' });
        }
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      break;
    case 'DELETE':
      try {
        const deletedFacility = await prisma.facility.delete({
          where: { id: facilityId },
        });

        res.status(200).json({ success: true, data: deletedFacility });
      } catch (error) {
        console.error('Error deleting facility:', error);
        if (error.code === 'P2025') {
          // Record not found
          return res.status(404).json({ success: false, error: 'Facility not found.' });
        }
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

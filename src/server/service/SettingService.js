import { formatTime, formatTimeToISO } from "@/utils/DateTime";
import prisma from "../db/prisma";

export default {
  getAllSetting: async () => {
    const settings = await prisma.settings.findMany();

    const formattedSettings = settings.map((setting) => {
      return {
        ...setting,
        reservation_start: formatTime(setting.reservation_start),
        reservation_end: formatTime(setting.reservation_end),
        conditional_time: formatTime(setting.conditional_time),
        booking_start: formatTime(setting.booking_start),
        booking_end: formatTime(setting.booking_end),
      };
    });
    return formattedSettings;
  },

  getSettingByID: async (id) => {
    const setting = await prisma.settings.findFirst({
      where: { id: id },
    });
    return setting;
  },

  updateReservationSchedule: async (updatedSchedules) => {
    // Add explicit null and undefined checking
    if (!updatedSchedules) {
      console.error("Received null or undefined schedules");
      return []; // or throw an error
    }

    if (!Array.isArray(updatedSchedules)) {
      console.error("Received non-array schedules:", updatedSchedules);
      return []; // or throw an error
    }

    if (updatedSchedules.length === 0) {
      console.log("No schedules to update");
      return [];
    }

    try {
      const updatedReservationSchedule = await Promise.all(
        updatedSchedules.map(async (schedule) => {
          return await prisma.settings.update({
            where: { id: parseInt(schedule.id) },
            data: {
              reservation_start: formatTimeToISO(schedule.reservation_start),
              reservation_end: formatTimeToISO(schedule.reservation_end),
              conditional_time: formatTimeToISO(schedule.conditional_time),
              active: schedule.active,
            },
          });
        })
      );

      return updatedReservationSchedule;
    } catch (error) {
      console.error("Error updating reservation schedule:", error?.message);
      throw error;
    }
  },
};

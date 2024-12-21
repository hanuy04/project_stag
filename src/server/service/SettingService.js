import {
  formatTimeHHMM,
  formatTimeHHMMSS,
  formatTimeToISO,
} from "@/utils/DateTime";
import prisma from "../db/prisma";

export default {
  getAllSetting: async () => {
    const settings = await prisma.settings.findMany();

    const formattedSettings = settings.map((setting) => {
      return {
        ...setting,
        reservation_start: formatTimeHHMM(setting.reservation_start),
        reservation_end: formatTimeHHMM(setting.reservation_end),
        conditional_time: formatTimeHHMM(setting.conditional_time),
        booking_start: formatTimeHHMM(setting.booking_start),
        booking_end: formatTimeHHMM(setting.booking_end),
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
              active: schedule.active,
              reservation_start: formatTimeToISO(schedule.reservation_start),
              reservation_end: formatTimeToISO(schedule.reservation_end),
              accompanying_teacher: schedule.accompanying_teacher,
              conditional_time: formatTimeToISO(schedule.conditional_time),
              booking: schedule.booking,
              booking_end: formatTimeToISO(schedule.booking_end),
              booking_start: formatTimeToISO(schedule.booking_start),
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

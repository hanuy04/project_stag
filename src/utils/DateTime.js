// utils/timeUtils.js

export const getFormattedTime = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // format 24 jam
  };
  return date.toLocaleTimeString("en-GB", options);
};

export const getFormattedDate = (date) => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getFormattedDay = (date) => {
  return date.toLocaleDateString("en-GB", { weekday: "long" });
};

// export const formatTime = (isoString) => {
//   const date = new Date(isoString);
//   const hours = String(date.getUTCHours()).padStart(2, "0"); // Ambil jam (UTC) dan pastikan 2 digit
//   const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Ambil menit (UTC) dan pastikan 2 digit
//   return `${hours}:${minutes}`; // Gabungkan format HH:MM
// };

export const formatTime = (time) => {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const formatTimeToISO = (time) => {
  if (!time) {
    return null;
  }

  const timeRegex = /^(\d{2}):(\d{2})(?::(\d{2}))?$/;
  const match = time.match(timeRegex);

  if (!match) {
    console.error("Invalid time format:", time);
    return null;
  }

  // Create a base date (using today's date)
  const today = new Date();
  const [, hours, minutes, seconds = "00"] = match;

  // Set the time components while keeping today's date
  today.setHours(parseInt(hours) + 7);
  today.setMinutes(parseInt(minutes));
  today.setSeconds(parseInt(seconds));

  // Return in ISO format
  return today.toISOString();
};

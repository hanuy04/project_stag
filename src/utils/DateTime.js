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

export const formatFullDate = (utcDateString) => {
  const date = new Date(utcDateString);

  // Array hari dalam Bahasa Indonesia
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  // Array bulan dalam Bahasa Indonesia
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

export const getDay = (time) => {
  const date = new Date(time);
  return date.getUTCDay();
};

export const getMinute = (time) => {
  const date = new Date(time);
  return date.getUTCMinutes();
};

export const getDate = (time) => {
  const date = new Date(Date.UTC(time));
  return date;
};

export const formatTimeHHMM = (time) => {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatTimeHHMMSS = (time) => {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds).padStart(2, "0");
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

export const formatDateToISO = (dateString) => {
  if (!dateString) {
    return null;
  }

  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateString.match(dateRegex);

  if (!match) {
    console.error("Invalid date format:", dateString);
    return null;
  }

  const [_, year, month, day] = match;

  // Create a Date object from the parsed components
  const date = new Date(
    Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))
  );

  if (isNaN(date.getTime())) {
    console.error("Invalid date value:", dateString);
    return null;
  }

  // Return in ISO format
  return date.toISOString();
};

export const formatDateYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getDayAndWeek = (dateString) => {
  const fulldate = new Date(dateString);

  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const day = dayNames[fulldate.getDay()];

  const ordinalMap = {
    1: "pertama",
    2: "kedua",
    3: "ketiga",
    4: "keempat",
    5: "kelima",
    6: "keenam",
  };

  // Cari minggu ke berapa dalam bulan
  const startOfMonth = new Date(fulldate.getFullYear(), fulldate.getMonth(), 1);
  const week = Math.ceil((fulldate.getDate() + startOfMonth.getDay()) / 7);
  const ordinalWeek = ordinalMap[week] || `${week} (tidak biasa)`;
  const date = fulldate.getDate();

  return { day, week, ordinalWeek, date };
};

export const generateReservationDates = (reservationData) => {
  const { date, start_time, end_time, repeat } = reservationData;
  const startDate = new Date(`${date}T${start_time}Z`); // Tambahkan 'Z' untuk UTC
  const endDate = new Date(`${date}T${end_time}Z`); // Tambahkan 'Z' untuk UTC
  const result = [];

  if (!repeat) {
    result.push({
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
    });
    return result;
  }

  const { type, endType, endValue } = repeat;
  let currentDate = new Date(startDate);
  let occurrences = 0;

  while (true) {
    if (endType === "on" && currentDate > new Date(`${endValue}T23:59:59Z`))
      break;
    if (endType === "after" && occurrences >= endValue) break;

    result.push({
      start_time: currentDate.toISOString(),
      end_time: new Date(
        currentDate.getTime() + (endDate.getTime() - startDate.getTime())
      ).toISOString(),
    });

    occurrences++;

    switch (type) {
      case "daily":
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        break;
      case "weekly":
        currentDate.setUTCDate(currentDate.getUTCDate() + 7);
        break;
      case "monthlyweek":
        // Pindah ke bulan berikutnya
        currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
        // Cari hari yang sama dan minggu yang sama
        const targetDay = startDate.getUTCDay(); // Hari dalam minggu (0 = Minggu, 1 = Senin, dst)
        const targetWeek = Math.ceil(startDate.getUTCDate() / 7); // Minggu keberapa dalam bulan
        // Set tanggal ke hari pertama di bulan berikutnya
        currentDate.setUTCDate(1);
        // Cari hari yang sesuai dengan targetDay
        while (currentDate.getUTCDay() !== targetDay) {
          currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }
        // Tambahkan minggu sesuai targetWeek
        currentDate.setUTCDate(currentDate.getUTCDate() + (targetWeek - 1) * 7);
        break;
      case "monthly":
        currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
        break;
      case "weekday":
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        if (currentDate.getUTCDay() === 6)
          currentDate.setUTCDate(currentDate.getUTCDate() + 2);
        if (currentDate.getUTCDay() === 0)
          currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        break;
      default:
        break;
    }
  }

  return result;
};

export const formatFullDateToYYYYMMDD = (dateString) => {
  // Daftar nama bulan dalam bahasa Indonesia
  const bulan = {
    Januari: "01",
    Februari: "02",
    Maret: "03",
    April: "04",
    Mei: "05",
    Juni: "06",
    Juli: "07",
    Agustus: "08",
    September: "09",
    Oktober: "10",
    November: "11",
    Desember: "12",
  };

  // Pisahkan string tanggal menjadi bagian-bagian
  const parts = dateString.split(" ");
  const hari = parts[1]; // Ambil tanggal (5)
  const namaBulan = parts[2]; // Ambil nama bulan (Januari)
  const tahun = parts[3]; // Ambil tahun (2025)

  // Konversi nama bulan ke angka bulan
  const bulanAngka = bulan[namaBulan];

  // Format tanggal ke yyyy-mm-dd
  const formattedDate = `${tahun}-${bulanAngka}-${hari.padStart(2, "0")}`;

  return formattedDate;
};

export const formatYYYYMMDDToFullDate = (dateString) => {
  // Daftar nama hari dalam bahasa Indonesia
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  // Daftar nama bulan dalam bahasa Indonesia
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Pisahkan string tanggal menjadi bagian-bagian
  const [tahun, bulanAngka, tanggal] = dateString.split("-");

  // Buat objek Date
  const date = new Date(`${tahun}-${bulanAngka}-${tanggal}`);

  // Ambil nama hari
  const namaHari = hari[date.getDay()];

  // Ambil nama bulan
  const namaBulan = bulan[parseInt(bulanAngka, 10) - 1]; // Bulan dimulai dari 0

  // Format tanggal ke "Minggu, 5 Januari 2025"
  const formattedDate = `${namaHari}, ${parseInt(
    tanggal,
    10
  )} ${namaBulan} ${tahun}`;

  return formattedDate;
};

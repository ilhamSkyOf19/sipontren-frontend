export const convertDate = (value: string | Date) => {
  if (!value) return "-"; // ⬅️ PENTING

  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(",", " ·");
};

// format date text
export const formatDateID = (date?: Date): string => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

// date time full
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
// slice text
export const sliceText = (text: string, slice: number): string => {
  if (text.length > slice) {
    return text.slice(0, slice).concat("...");
  } else {
    return text;
  }
};

// get month
export const getMonthNow: string = new Date().toLocaleString("id-ID", {
  month: "long",
});

// add Days
export const addDays = (date: Date, day: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);
};

// min Days
export const minDays = (date: Date, day: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
};

export const getTodayLocal = (date: Date = new Date()): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

export const formatDateNumber = (date: Date = new Date()): string => {
  const d = new Date(date); // clone, aman
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

// cek time valid
export const isValidDate = (value: string | null) => {
  if (!value) return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
};

export function formatPhoneWA(num: string) {
  // bersihkan selain angka
  let clean = num.replace(/\D/g, "");

  // kalau diawali 0 → ubah jadi 62
  if (clean.startsWith("0")) {
    clean = "62" + clean.slice(1);
  }

  // pastikan diawali 62
  if (!clean.startsWith("62")) {
    clean = "62" + clean;
  }

  // pola: +62 858-9689-0881
  return clean.replace(/^(62)(\d{3})(\d{4})(\d+)$/, "+$1 $2-$3-$4");
}

// format number
export const formatNumberID = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "";
  return value.toLocaleString("id-ID");
};

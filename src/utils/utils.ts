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

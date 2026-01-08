export default function parseDateTime(iso: string) {
  const date = new Date(iso);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

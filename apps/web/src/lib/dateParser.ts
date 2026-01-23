export  function parseDateTime(iso: string):string {
  if (!iso) return "-"; 
  
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

export function parseMessageDate(iso?: string): string {
  if (!iso) return "-";

  const date = new Date(iso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}



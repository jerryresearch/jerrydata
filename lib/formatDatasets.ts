export function formatModified(lastLoad: string) {
  const currentTimestamp = new Date(); // Current time
  const lastLoadTimestamp = new Date(lastLoad);

  // Calculate the time difference in milliseconds
  // @ts-ignore
  const timeDifference = currentTimestamp - lastLoadTimestamp;

  // Calculate hours and days
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(hoursAgo / 24);

  if (hoursAgo < 24) {
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  }
}

export function formatLastLoad(date: any) {
  const dateTime = new Date(date);

  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  const optionsDate = { day: "2-digit", month: "long", year: "numeric" };

  // @ts-ignore
  const time = dateTime.toLocaleTimeString("en-US", optionsTime);
  // @ts-ignore
  const formattedDate = dateTime.toLocaleDateString("en-US", optionsDate);

  return `${time.toLowerCase()}, ${formattedDate}`;
}

export function formatSize(value: string) {
  const size = parseInt(value);
  const sizeInKB = size / 1024;
  const sizeInMB = sizeInKB / 1024;
  if (sizeInMB >= 1) {
    return sizeInMB.toFixed(1) + " mb";
  } else if (sizeInKB >= 1) {
    return sizeInKB.toFixed(1) + " kb";
  } else {
    return size + " b";
  }
}

export function formatRows(rows: number) {
  if (rows >= 1000) {
    const thousands = rows / 1000;
    return thousands.toFixed(1) + " k";
  } else {
    return rows.toString();
  }
}

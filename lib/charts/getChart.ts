export default async function getChart(
  userId: string,
  reportId: string,
  chartId: string
) {
  if (!userId || !reportId || !chartId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chart/${userId}/${reportId}/${chartId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.log("error");
    // throw new Error("Error getting chart data");
  }
  return res.json();
}

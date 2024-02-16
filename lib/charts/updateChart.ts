export default async function updateChart(
  userId: string,
  reportId: string,
  chartId: string,
  body: any
) {
  if (!userId || !reportId || !chartId) return null;
  const res = await fetch(`/api/chart/${userId}/${reportId}/${chartId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.log("error");
    throw new Error("Error updating chart data");
  }
  return res.json();
}

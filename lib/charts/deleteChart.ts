export default async function deleteChart(
  userId: string,
  reportId: string,
  chartId: string
) {
  if (!userId || !reportId || !chartId) return null;
  const res = await fetch(`/api/chart/${userId}/${reportId}/${chartId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.log("error");
    throw new Error("Error deleting chart data");
  }
  return res.json();
}

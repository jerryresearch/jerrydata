export default async function duplicateChart(
  userId: string,
  reportId: string,
  chartId: string,
  data: any
) {
  if (!userId || !reportId || !chartId) return null;
  const res = await fetch(
    `/api/duplicate/chart/${userId}/${reportId}/${chartId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

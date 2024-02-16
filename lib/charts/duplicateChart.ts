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
  console.log(res);
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

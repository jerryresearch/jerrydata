export default async function createChart(
  userId: string,
  reportId: string,
  data: any
) {
  if (!userId || !reportId) return null;
  const res = await fetch(`/api/chart/${userId}/${reportId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(res);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

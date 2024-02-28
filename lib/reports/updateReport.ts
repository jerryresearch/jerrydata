export default async function updateReport(
  userId: string,
  reportId: string,
  data: any
) {
  if (!userId || !reportId) return null;
  const res = await fetch(`/api/report/${userId}/${reportId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  console.log("done");
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

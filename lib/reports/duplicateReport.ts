export default async function duplicateReport(
  userId: string,
  reportId: string,
  data: any
) {
  if (!userId || !reportId) return null;
  const res = await fetch(`/api/duplicate/report/${userId}/${reportId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

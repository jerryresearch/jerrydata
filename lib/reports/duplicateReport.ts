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
    console.log("error");
    throw new Error();
  }
  return res.json();
}

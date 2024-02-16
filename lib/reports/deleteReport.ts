export default async function deleteReport(userId: string, reportId: string) {
  if (!userId || !reportId) return null;
  const res = await fetch(`/api/report/${userId}/${reportId}`, {
    method: "DELETE",
  });
  console.log("done");
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

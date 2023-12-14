export default async function getReport(userId: string, reportId: string) {
  if (!userId || !reportId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${userId}/${reportId}`
  );
  console.log("done");
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

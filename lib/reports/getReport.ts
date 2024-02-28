export default async function getReport(userId: string, reportId: string) {
  if (!userId || !reportId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${userId}/${reportId}`
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

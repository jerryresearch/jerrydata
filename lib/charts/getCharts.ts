export default async function getCharts(userId: string, reportId: string) {
  if (!userId || !reportId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chart/${userId}/${reportId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

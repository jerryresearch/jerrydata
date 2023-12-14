export default async function createChart(
  userId: string,
  reportId: string,
  data: any
) {
  if (!userId || !reportId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chart/${userId}/${reportId}`,
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

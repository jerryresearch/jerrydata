export default async function getReports(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${userId}`
  );
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

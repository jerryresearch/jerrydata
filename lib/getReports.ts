export default async function getReports(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${userId}`
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

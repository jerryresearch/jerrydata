export default async function autogenerateReport(
  userId: string,
  datasetId: string
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/autogenerate/${userId}/${datasetId}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

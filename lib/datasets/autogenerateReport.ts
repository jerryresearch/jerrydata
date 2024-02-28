export default async function autogenerateReport(
  userId: string,
  datasetId: string
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/autogenerate/${userId}/${datasetId}`, {
    method: "POST",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

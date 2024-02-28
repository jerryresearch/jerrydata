export default async function getDataset(userId: string, datasetId: string) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dataset/${userId}/${datasetId}`
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

export default async function refreshDataset(
  userId: string,
  datasetId: string
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/refresh/${userId}/${datasetId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

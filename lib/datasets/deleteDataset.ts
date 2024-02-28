export default async function deleteDataset(userId: string, datasetId: string) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/dataset/${userId}/${datasetId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

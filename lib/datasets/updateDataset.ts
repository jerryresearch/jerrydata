export default async function updateDataset(
  userId: string,
  datasetId: string,
  body: any
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/dataset/${userId}/${datasetId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

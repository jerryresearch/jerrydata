export default async function refreshDataset(
  userId: string,
  datasetId: string
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/refresh/${userId}/${datasetId}`);
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

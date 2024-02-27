export default async function deleteDataset(userId: string, datasetId: string) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/dataset/${userId}/${datasetId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

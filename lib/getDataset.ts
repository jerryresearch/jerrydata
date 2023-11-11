export default async function getDataset(userId: string, datasetId: string) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `http://localhost:3000/api/dataset/${userId}/${datasetId}`
  );
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

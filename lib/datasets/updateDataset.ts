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
  console.log("done");
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

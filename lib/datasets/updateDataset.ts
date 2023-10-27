export default async function updateDataset(
  userId: string,
  datasetId: string,
  body: any
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `http://localhost:3000/api/dataset/${userId}/${datasetId}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
  // if (!res.ok) {
  //   console.log("error");
  // }
  return res;
}

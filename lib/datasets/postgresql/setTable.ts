export default async function setTable(
  userId: string,
  datasetId: string,
  type: string,
  body: any
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `/api/${type.toLowerCase()}/dataset/${userId}/${datasetId}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

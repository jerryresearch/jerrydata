export default async function setTable(
  userId: string,
  datasetId: string,
  type: string,
  body: any
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/${type.toLowerCase()}/dataset/${userId}/${datasetId}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    console.log("error");
    throw Error("error");
  }
  return res.json();
}

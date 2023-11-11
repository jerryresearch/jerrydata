export default async function getRecords(
  userId: string,
  datasetId: string,
  page: number
) {
  const res = await fetch(
    `http://localhost:3000/api/file/${userId}?id=${datasetId}&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

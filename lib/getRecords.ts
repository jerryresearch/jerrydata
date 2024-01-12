export default async function getRecords(
  userId: string,
  datasetId: string,
  page: number
) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/file/${userId}?id=${datasetId}&page=${page}`,
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

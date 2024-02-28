export default async function getRecords(
  userId: string,
  datasetId: string,
  page: number
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${userId}?id=${datasetId}&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

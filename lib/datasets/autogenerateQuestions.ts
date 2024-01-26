export default async function autogenerateQuestions(
  userId: string,
  datasetId: string
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/autogenerate/${userId}/${datasetId}`
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

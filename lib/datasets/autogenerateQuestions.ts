export default async function autogenerateQuestions(
  userId: string,
  datasetId: string
) {
  if (!userId || !datasetId) return null;
  const res = await fetch(`/api/autogenerate/${userId}/${datasetId}`);
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

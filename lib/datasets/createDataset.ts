export default async function createDataset(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(`/api/dataset/${userId}`, {
    method: "POST",
    body: data,
  });
  console.log("done");
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export default async function createDataset(userId: string, body: any) {
  if (!userId) return null;
  const res = await fetch(`/api/${body.datatype}/dataset/${userId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

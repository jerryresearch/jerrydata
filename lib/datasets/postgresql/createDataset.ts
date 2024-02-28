export default async function createDataset(userId: string, body: any) {
  if (!userId) return null;
  const res = await fetch(`/api/${body.datatype}/dataset/${userId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

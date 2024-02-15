export default async function createDataset(userId: string, body: any) {
  if (!userId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${body.datatype}/dataset/${userId}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

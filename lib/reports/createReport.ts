export default async function createReport(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(`/api/report/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log("done");
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

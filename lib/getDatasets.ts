export default async function getDatasets(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/dataset/${userId}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

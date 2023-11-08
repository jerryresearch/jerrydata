export default async function getDatasets(userId: string) {
  const res = await fetch(`http://localhost:3000/api/dataset/${userId}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

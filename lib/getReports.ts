export default async function getReports(userId: string) {
  const res = await fetch(`http://localhost:3000/api/report/${userId}`);
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export default async function getRecords(page: number) {
  const res = await fetch(`http://localhost:3000/api/file/name?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

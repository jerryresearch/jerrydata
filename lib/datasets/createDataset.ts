export default async function createDataset(
  userId: string,
  formData: FormData
) {
  if (!userId) return null;
  const res = await fetch(`http://localhost:3000/api/upload/${userId}`, {
    method: "POST",
    body: formData,
  });
  console.log("done");
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

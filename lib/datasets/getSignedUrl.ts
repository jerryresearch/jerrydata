export default async function getSignedUrl(userId: string) {
  if (!userId) return null;
  const res = await fetch(`/api/upload/${userId}`);
  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

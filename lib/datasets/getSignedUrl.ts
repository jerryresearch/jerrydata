export default async function getSignedUrl(userId: string) {
  if (!userId) return null;
  const res = await fetch(`/api/upload/${userId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

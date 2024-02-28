export default async function getStories(userId: string) {
  if (!userId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stories/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

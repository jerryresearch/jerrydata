export default async function updateProfile(userId: string, data: any) {
  if (!userId) return null;
  console.log(JSON.stringify(data));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}

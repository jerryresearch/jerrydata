import EditProfile from "@/components/profile/EditProfile";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const { id: userId, name, email } = session?.user;

  return <EditProfile name={name} email={email} userId={userId} />;
};

export default Page;

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export  async function User() {
  "use server";
  const { getUser } = getKindeServerSession();
  const user = getUser().then((user) => {
    return user?.id;
  });

  return user;
}

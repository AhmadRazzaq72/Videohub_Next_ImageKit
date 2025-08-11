import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "./api/auth/[...nextauth]/route"; // path relative to /app


export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }

  return(
    <>
   <div>Welcome !</div>
  <a href="/api/login" className="text-indigo-600 hover:underline">
            Login
          </a>
    </>
   )
    ;
}

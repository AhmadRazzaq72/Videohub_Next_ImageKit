import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import VideoFeedContainer from "../components/VideoFeedContainer";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // if not logged in → login page
  }

  return <VideoFeedContainer />;
}

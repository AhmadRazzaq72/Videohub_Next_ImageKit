"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import VideoFeed from "../components/VideoFeed";

export default function VideoFeedContainer() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchVideos = async () => {
      const res = await fetch("/api/video");
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, [session]);

  if (!session) return <p>Please log in to see videos</p>;
  if (!videos.length) return <p>Loading videos...</p>;

  return <VideoFeed videos={videos} />;
}

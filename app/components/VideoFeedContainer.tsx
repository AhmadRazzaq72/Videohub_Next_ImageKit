"use client";

import { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import VideoFeed from "./VideoFeed";

export default function VideoFeedContainer() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/video");
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  if (!videos.length) return <p>Loading videos...</p>;

  return <VideoFeed videos={videos} />;
}

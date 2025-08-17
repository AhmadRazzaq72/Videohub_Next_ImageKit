'use client';
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { IKVideo } from "imagekitio-next";

interface VideoComponentProps {
  video: IVideo;
}

export default function VideoComponent({ video }: VideoComponentProps) {
  // Detect if the URL is full (starts with http) or a relative path
  const isFullUrl = video.videoUrl.startsWith("http");

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            {isFullUrl ? (
              // Use native <video> for full URLs
              <video
                src={video.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              // Use IKVideo for relative paths with ImageKit
              <IKVideo
                path={video.videoUrl}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                transformation={[{ height: "1920", width: "1080" }]}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

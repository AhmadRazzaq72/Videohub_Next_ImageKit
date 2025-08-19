"use client";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { IKVideo } from "imagekitio-next";
import { useEffect, useRef, useState } from "react";

interface VideoComponentProps {
  video: IVideo;
}

export default function VideoComponent({ video }: VideoComponentProps) {
  const isFullUrl = video.videoUrl.startsWith("http");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detect if card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // play only when 50% visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Auto play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            {isFullUrl ? (
              <video
                ref={videoRef}
                src={video.videoUrl}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <IKVideo
                ref={videoRef as any} // workaround because IKVideo doesn't forward refs
                path={video.videoUrl}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                transformation={[{ height: "1920", width: "1080" }]}
                muted
                loop
                playsInline
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

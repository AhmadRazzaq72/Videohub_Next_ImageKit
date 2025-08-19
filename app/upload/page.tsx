"use client";

import toast from "react-hot-toast";
import VideoUploadForm from "../components/VideoUploadForm";

export default function UploadPage() {
  // This function will receive the form data
  const handleVideoSubmit = async (data: {
    title: string;
    description: string;
    videoUrl: string;
  }) => {
    console.log("Form data received:", data);

    // Example: Send to backend
    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error saving video");
    } else {
      toast.success('Video Save Successfully');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <VideoUploadForm onSubmit={handleVideoSubmit} />
    </div>
  );
}

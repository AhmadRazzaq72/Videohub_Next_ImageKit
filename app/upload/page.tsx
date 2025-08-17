"use client";

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
      alert("Error saving video");
    } else {
      alert("Video saved successfully!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <VideoUploadForm onSubmit={handleVideoSubmit} />
    </div>
  );
}

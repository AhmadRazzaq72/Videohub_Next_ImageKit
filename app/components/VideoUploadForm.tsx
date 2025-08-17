"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";

interface VideoFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    videoUrl: string;
  }) => void;
}

const VideoUploadForm = ({ onSubmit }: VideoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      alert("Please upload a video before submitting");
      return;
    }

    onSubmit({ title, description, videoUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md">
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter video title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter video description"
          rows={3}
          required
        />
      </div>

      {/* Video Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={(res: any) => {
            setVideoUrl(res.url); // ImageKit response contains `url`
          }}
          onProgress={(p) => setProgress(p)}
        />
        {progress > 0 && progress < 100 && (
          <p className="text-sm text-gray-600 mt-1">Uploading: {progress}%</p>
        )}
        {videoUrl && (
          <p className="text-green-600 text-sm mt-1">✅ Video uploaded successfully!</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default VideoUploadForm;

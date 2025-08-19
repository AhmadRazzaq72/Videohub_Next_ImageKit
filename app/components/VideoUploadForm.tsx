"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      toast.error("Please upload a video before submitting");
      return;
    }
    setSubmitting(true);
    onSubmit({ title, description, videoUrl });
    setSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Upload a Video
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter video title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter video description"
            rows={4}
            required
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Video
          </label>
          <FileUpload
            fileType="video"
            onSuccess={(res: any) => {
              setVideoUrl(res.url);
            }}
            onProgress={(p) => setProgress(p)}
          />
          {progress > 0 && progress < 100 && (
            <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {videoUrl && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              ✅ Video uploaded successfully!
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {submitting && <Loader2 className="animate-spin w-5 h-5" />}
          {submitting ? "Submitting..." : "Submit Video"}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;

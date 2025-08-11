import React from "react";

// Placeholder data for the videos
const videos = [
  {
    id: "dQw4w9WgXcQ", // Example YouTube Video ID
    title: "Understanding MRI: A Patient's Guide",
  },
  {
    id: "3tmd-ClpJxA", // Example YouTube Video ID
    title: "What to Expect During a CT Scan",
  },
  {
    id: "u9Mv93G_gVE", // Example YouTube Video ID
    title: "The Role of PET-CT in Cancer Staging",
  },
];

const Videos = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black/95 text-white py-20 px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-4xl w-full">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-braven">Videos</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Short, helpful explanations and patient education.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group rounded-lg overflow-hidden border border-white/10 bg-neutral-900/80 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-neutral-800">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white/90">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;

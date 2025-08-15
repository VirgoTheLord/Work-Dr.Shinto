import VideosSection from "@/components/videos/VideoSection";

const App = () => {
  return (
    <main className="bg-gray-50 text-stone-800">
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-8xl font-bold mb-4 font-braven">
          Videos
        </h2>
        <p className="text-lg md:text-lg text-stone-700 max-w-3xl mx-auto font-raleway">
          We&apos;ve prepared these short guides to help you understand our
          imaging procedures better.
        </p>
      </div>
      <VideosSection />
    </main>
  );
};

export default App;

import bgVideo from "@/assets/ch.mp4"; // adjust the path if needed

export default function HeroBanner() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
        src={bgVideo}
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Jharkhand Heritage Gallery
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
          Explore the rich cultural tapestry of Jharkhand through our immersive 3D gallery.
          <span className="block mt-2 font-medium text-green-300">
            An experience like never before.
          </span>
        </p>
      </div>
    </section>
  );
}

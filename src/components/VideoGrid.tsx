import { useState } from 'react';
import { PlayCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import video1 from "@/assets/video-1.mp4";
import video2 from "@/assets/video-2.mp4";
import video3 from "@/assets/video-3.mp4";
import video4 from "@/assets/video-4.mp4";
import video5 from "@/assets/video-5.mp4";
import video6 from "@/assets/video-6.mp4";
import video7 from "@/assets/video-7.mp4";
import video8 from "@/assets/video-8.mp4";
import video9 from "@/assets/video-9.mp4";
import video10 from "@/assets/video-10.mp4";

const videoData = [
  { videoSrc: video1 },
  { videoSrc: video2 },
  { videoSrc: video3 },
  { videoSrc: video4 },
  { videoSrc: video5 },
  { videoSrc: video6 },
  { videoSrc: video7 },
  { videoSrc: video8 },
  { videoSrc: video9 },
  { videoSrc: video10 },
];

const VideoGrid = () => {
  // This is the corrected line
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visual Stories from Jharkhand
            </h2>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            loop={true}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="pb-12"
          >
            {videoData.map((video, index) => (
              <SwiperSlide key={index}>
                <DialogTrigger asChild onClick={() => setSelectedVideo(video.videoSrc)}>
                  <div className="group relative block aspect-[9/16] overflow-hidden rounded-xl shadow-lg cursor-pointer">
                    <video
                      src={video.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <PlayCircle className="w-8 h-8 opacity-80" />
                    </div>
                  </div>
                </DialogTrigger>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <DialogContent className="max-w-[95vw] md:max-w-lg lg:max-w-2xl max-h-[90vh] p-0 border-0 bg-transparent flex items-center justify-center">
        {selectedVideo && (
          <>
            <video 
              src={selectedVideo} 
              controls 
              autoPlay
              className="w-auto h-auto max-w-full max-h-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
            <DialogClose asChild>
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition z-50">
                <X className="w-5 h-5" />
              </button>
            </DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoGrid;
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

// Import images from assets
import waterfallsImg from "@/assets/wtf.jpg";
import tribalImg from "@/assets/th.jpg";
import wildlifeImg from "@/assets/ws.jpg";
import adventureImg from "@/assets/at.jpg";
const HighlightsSection = () => {
  const highlights = [
    {
      title: "Majestic Waterfalls",
      description: "Dassam, Hundru, Jonha—discover cascading wonders hidden in pristine forests.",
      path: "/destinations?category=waterfalls",
      image: waterfallsImg
    },
    {
      title: "Tribal Heritage",
      description: "Experience living culture through authentic festivals, crafts, and traditions.",
      path: "/culture",
      image: tribalImg
    },
    {
      title: "Wildlife Sanctuaries",
      description: "Spot elephants, tigers, and rare birds in their natural habitat.",
      path: "/destinations?category=wildlife",
      image: wildlifeImg
    },
    {
      title: "Adventure Trails",
      description: "Trekking, rock climbing, and forest expeditions for thrill seekers.",
      path: "/destinations?category=adventure",
      image: adventureImg
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Link to={highlight.path} key={index}>
              <Card 
                className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
                style={{
                  backgroundImage: `url(${highlight.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="bg-black/40 h-full w-full rounded-lg flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group-hover:bg-black/20">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
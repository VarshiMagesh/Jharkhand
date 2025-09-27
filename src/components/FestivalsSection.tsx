import { Card, CardContent } from "@/components/ui/card";

// Import images from assets
import chhauImg from "@/assets/dance-chhau.jpg";
import sohraiImg from "@/assets/festival-sohrai.jpg";
import paikaImg from "@/assets/dance-paika.jpg";

const FestivalsSection = () => {
  const festivals = [
    {
      name: "Chhau Dance",
      description: "Chhau is a semi-classical Indian dance with martial and folk traditions.",
      image: chhauImg
    },
    {
      name: "Sohrai Songs",
      description: "These folk songs are an integral part of the Sohrai harvest festival.",
      image: sohraiImg
    },
    {
      name: "Paika Dance",
      description: "Paika Dance is a martial folk dance that re-enacts ancient battles.",
      image: paikaImg
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Festivals & Culture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {festivals.map((festival, index) => (
            <Card
              key={index}
              className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
              style={{
                backgroundImage: `url(${festival.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay for readability */}
              <div className="bg-black/40 h-full w-full rounded-lg flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group-hover:bg-black/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {festival.name}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {festival.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalsSection;

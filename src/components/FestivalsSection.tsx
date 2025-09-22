import { Card, CardContent } from "@/components/ui/card";

const FestivalsSection = () => {
  const festivals = [
    {
      name: "Chhau Dance",
      description: "Chhau is a semi-classical Indian dance with martial and folk traditions.",
    },
    {
      name: "Sohrai Songs",
      description: "These folk songs are an integral part of the Sohrai harvest festival.",
    },
    {
      name: "Paika Dance",
      description: "Paika Dance is a martial folk dance that re-enacts ancient battles",
    }
  ];

  return (
    // 1. REMOVED "bg-muted/30" for a fully transparent background
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* 2. CHANGED heading text to white */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Festivals & Culture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {festivals.map((festival, index) => (
            // 3. APPLIED the semi-transparent glass style to the card
            <Card key={index} className="text-center bg-black/20 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                {/* 4. CHANGED all text inside the card to white */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {festival.name}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {festival.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalsSection;
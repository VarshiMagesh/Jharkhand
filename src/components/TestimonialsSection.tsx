import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Aditi",
      location: "Kolkata",
      quote: "Netarhat sunset was unforgettable. The official tips helped me plan around the weather perfectly."
    },
    {
      name: "Rohan",
      location: "Pune", 
      quote: "Dassam and Hundru were spectacular. Glad I checked permits and helplines in advance here."
    },
    {
      name: "Emma",
      location: "London",
      quote: "Loved the crafts and Sarhul celebrations. The site guided us to authentic cultural experiences."
    }
  ];

  return (
    // 1. REMOVED "bg-background" for transparency
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* 2. CHANGED heading text to white */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Traveler Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            // 3. APPLIED the semi-transparent glass style to the card
            <Card key={index} className="relative bg-black/20 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-accent mb-4" />
                {/* 4. CHANGED all text inside the card to white */}
                <p className="text-white/80 mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-white/80">
                  {testimonial.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Music, Palette, Utensils, Calendar, Users, Heart, Camera, Trophy, X } from "lucide-react";
import Footer from "@/components/Footer";

// Main section image
import tribalCulture from "@/assets/tribal-culture.jpg";

// Modal-specific images
import tribalArtImg from "@/assets/tribal-art.jpg";
import localCuisineImg from "@/assets/local-cuisine.jpg";
import sarhulImg from "@/assets/festivals.jpg";
import karmaImg from "@/assets/festival-karma.jpg";
import sohraiImg from "@/assets/festival-sohrai.jpg";
import tusuImg from "@/assets/festival-tusu.jpg";

// Music & Dance sub-category images
import danceChhau from "@/assets/dance-chhau.jpg";
import danceKarma from "@/assets/dance-karma.jpg";
import danceJhumar from "@/assets/dance-jhumar.jpg";
import dancePaika from "@/assets/dance-paika.jpg";
import musicBaha from "@/assets/music-baha.jpg";
import musicSohrai from "@/assets/music-sohrai.jpg";
import musicWedding from "@/assets/music-wedding.jpg";


const culturalAspects = [
  {
    key: 'music',
    icon: Music,
    title: "Traditional Music & Dance",
    description: "Experience vibrant folk performances including Jhumar, Paika, and Chhau dance forms that tell stories of ancient traditions.",
    details: ["Jhumar - Community celebration dance", "Paika - Martial dance form", "Chhau - Masked dance drama", "Karma - Harvest festival dance"]
  },
  {
    key: 'art',
    icon: Palette,
    title: "Tribal Art & Crafts",
    description: "Discover beautiful handicrafts, bamboo work, and traditional tribal paintings that showcase indigenous artistry.",
    details: ["Madhubani-style paintings", "Bamboo craft items", "Traditional jewelry", "Tribal sculptures"]
  },
  {
    key: 'cuisine',
    icon: Utensils,
    title: "Local Cuisine",
    description: "Savor authentic flavors with traditional dishes like Dhuska, Pittha, and tribal delicacies prepared with local ingredients.",
    details: ["Dhuska - Deep-fried rice pancake", "Pittha - Steamed rice cake", "Handia - Traditional rice beer", "Tribal forest vegetables"]
  },
  {
    key: 'festivals',
    icon: Calendar,
    title: "Festivals & Events",
    description: "Join colorful celebrations like Sarhul, Karma, and other tribal festivals that honor nature and ancestors.",
    details: ["Sarhul - Spring festival", "Karma - Monsoon celebration", "Sohrai - Harvest festival", "Tusu Parab - Winter festival"]
  },
];

const modalData = {
  music: {
    title: "Traditional Music & Dance",
    description: "The heartbeat of Jharkhand lies in its rhythmic dances and soulful music, each a narrative of the land's history, beliefs, and celebrations.",
    items: [
      { name: 'Chhau Dance', image: danceChhau, desc: 'A masked martial dance-drama.', fullDesc: "Chhau is a semi-classical Indian dance with martial and folk traditions. Known for its powerful acrobatics and elaborate masks, it tells stories from epics like the Ramayana and Mahabharata. The Seraikela style of Chhau is particularly famous in Jharkhand." },
      { name: 'Karma Dance', image: danceKarma, desc: 'Celebratory dance for the Karma festival.', fullDesc: "Performed during the Karma festival, this folk dance involves men and women forming circles and dancing to the rhythm of the Mandar drum. It's a tribute to the Karam tree, which is worshipped for prosperity and good fortune." },
      { name: 'Jhumar Dance', image: danceJhumar, desc: 'A joyful harvest folk dance.', fullDesc: "Jhumar is a popular and rhythmic harvest dance performed mainly by women in circles. Its graceful steps and swaying movements express the joy and happiness of the community during the harvest season." },
      { name: 'Paika Dance', image: dancePaika, desc: 'A powerful warrior dance form.', fullDesc: "Paika is a martial folk dance that re-enacts ancient battles. Performers, holding swords and shields, showcase their courage and skill through energetic movements and formations, accompanied by loud drumming." },
      { name: 'Baha Songs', image: musicBaha, desc: 'Hymns sung during the flower festival.', fullDesc: "Baha songs are sacred hymns sung by the Santhal tribe during the Baha festival, which celebrates the blossoming of new flowers in spring. The music is deeply connected to nature and spiritual beliefs." },
      { name: 'Sohrai Songs', image: musicSohrai, desc: 'Music celebrating the cattle festival.', fullDesc: "These folk songs are an integral part of the Sohrai harvest festival. They are sung to celebrate cattle and are often accompanied by the painting of traditional murals, known as Sohrai art, on the walls of houses." },
      { name: 'Wedding Songs', image: musicWedding, desc: 'Traditional folk music for weddings.', fullDesc: "Jharkhand has a rich tradition of wedding folk songs that are sung during various rituals of the marriage ceremony. These songs express a wide range of emotions, from the joy of union to the sorrow of a bride leaving her home." },
    ],
  },
  art: {
    title: "Tribal Art & Crafts",
    description: "Jharkhand's indigenous communities are masters of intricate art forms, passed down through generations, reflecting their deep connection with nature.",
    items: [ { name: 'Sohrai & Khovar Painting', image: tribalArtImg, desc: 'Ritualistic mural art painted on mud walls.', fullDesc: "Sohrai and Khovar are traditional mural art forms practiced by tribal women. Sohrai art is created to celebrate the harvest, while Khovar art is associated with weddings. These paintings are known for their intricate line work and natural motifs." } ],
  },
  cuisine: {
    title: "Local Cuisine",
    description: "The food of Jharkhand is simple, nutritious, and deeply connected to the land.",
    items: [ { name: 'Dhuska & Ghugni', image: localCuisineImg, desc: 'A popular deep-fried rice-lentil bread.', fullDesc: "Dhuska is a quintessential Jharkhandi snack or breakfast item. It is a deep-fried pancake made from a batter of rice and lentils, and is most famously served with Ghugni, a spicy curry made from black chickpeas." } ],
  },
  festivals: {
    title: "Festivals & Events",
    description: "Festivals in Jharkhand are a vibrant explosion of color, music, and community spirit.",
    items: [ 
        { name: 'Sarhul Festival', image: sarhulImg, desc: 'The grandest tribal festival, celebrating the new year.', fullDesc: "Sarhul is the most important festival for the tribal communities of Jharkhand. It celebrates the beginning of the new year and the blooming of the Sal tree, which is considered sacred. The festivities involve elaborate rituals, community feasts, and vibrant traditional dances." },
        { name: 'Karma Festival', image: karmaImg, desc: 'A monsoon festival honoring the Karam tree.', fullDesc: "Karma is a major festival where the Karam tree is worshipped for good fortune and prosperity. It is celebrated with fasting, traditional music, and the famous Karma dance, where people dance in circles with interlinked hands." },
        { name: 'Sohrai Festival', image: sohraiImg, desc: 'A harvest and cattle festival after the monsoons.', fullDesc: "Sohrai is a harvest festival celebrated after the monsoons, primarily to honor cattle. Houses are decorated with intricate Sohrai murals, and cattle are bathed, adorned, and worshipped for their role in agriculture." },
        { name: 'Tusu Parab', image: tusuImg, desc: 'A winter harvest festival celebrated with folk songs.', fullDesc: "Tusu Parab, or Makar Sankranti, is a winter harvest festival. It is celebrated with great enthusiasm, especially by unmarried girls, with community feasts and the singing of traditional Tusu folk songs by the riverside." }
    ],
  },
};

const culturalExperiences = [
  { icon: Users, title: "Village Homestays", description: "Stay with local families" },
  { icon: Heart, title: "Cultural Immersion", description: "Participate in daily activities" },
  { icon: Camera, title: "Photography Tours", description: "Capture vibrant festivals" },
  { icon: Trophy, title: "Craft Workshops", description: "Learn traditional arts" },
];

const Culture = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeDetail, setActiveDetail] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Cultural <span className="text-accent">Heritage</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Immerse yourself in the vibrant traditions of Jharkhand's tribal communities. Discover a living culture that has been preserved for generations.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-nature max-w-4xl mx-auto">
            <img src={tribalCulture} alt="Jharkhand Tribal Culture" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Living Traditions of Jharkhand</h2>
                <p className="text-lg opacity-90 max-w-2xl">Where ancient customs meet modern curiosity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore <span className="text-accent">Cultural Aspects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Dive deep into the rich cultural tapestry that makes Jharkhand unique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalAspects.map((aspect) => (
              <Card key={aspect.key} className="group overflow-hidden shadow-card hover:shadow-nature transition-smooth">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="hero-gradient p-3 rounded-xl group-hover:scale-110 transition-smooth">
                      <aspect.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">{aspect.title}</h3>
                      <p className="text-muted-foreground">{aspect.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {aspect.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-6 hero-gradient text-white shadow-nature" 
                    onClick={() => setActiveModal(aspect.key)}
                  >
                    Explore More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Modal for Categories */}
      <Dialog open={!!activeModal} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-background border-border text-foreground sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {activeModal && modalData[activeModal] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-accent font-bold">{modalData[activeModal].title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{modalData[activeModal].description}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                {modalData[activeModal].items.map((item) => (
                  <div key={item.name} className="group relative overflow-hidden rounded-lg cursor-pointer" onClick={() => setActiveDetail(item)}>
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 flex items-end p-3">
                      <div>
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <p className="text-xs text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
           <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Nested Modal for Details */}
      <Dialog open={!!activeDetail} onOpenChange={() => setActiveDetail(null)}>
        <DialogContent className="bg-background border-border text-foreground sm:max-w-3xl">
          {activeDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold mb-4">{activeDetail.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <img src={activeDetail.image} alt={activeDetail.name} className="w-full h-auto object-cover rounded-lg" />
                <DialogDescription className="text-muted-foreground leading-relaxed">{activeDetail.fullDesc}</DialogDescription>
              </div>
            </>
          )}
           <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
        </DialogContent>
      </Dialog>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cultural <span className="text-accent">Experiences</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Immerse yourself in authentic cultural activities and create lasting memories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalExperiences.map((experience, index) => (
              <Card key={index} className="group text-center hover:shadow-nature transition-smooth hover:scale-105">
                <CardContent className="p-6">
                  <div className="hero-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                    <experience.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground">{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
              <Footer />

    </div>
  );
};

export default Culture;
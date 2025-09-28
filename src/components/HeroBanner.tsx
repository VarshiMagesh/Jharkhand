export default function HeroBanner() {
    return (
        <section className="relative py-24 bg-green-600 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 transform translate-x-32 translate-y-32"></div>
                <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-cultural-gold/20"></div>
                <div className="absolute bottom-32 left-1/3 w-24 h-24 rounded-full bg-cultural-warm/20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-cultural-gold/10 px-4 py-2 rounded-full mb-6 border border-cultural-gold/20">
                        <span className="text-cultural-gold">🌿</span>
                        <span className="text-cultural-gold font-medium text-sm">Interactive Cultural Experience</span>
                        <span className="text-cultural-gold">🏛</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Jharkhand Heritage Gallery
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                        Explore the rich cultural tapestry of Jharkhand through our immersive 3D gallery. 
                        <span className="block mt-2 text-cultural-gold font-medium">
                            Drag to navigate • Click to discover
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cultural-gold rounded-full animate-pulse"></div>
                            <span className="text-sm">14 Cultural Artifacts</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cultural-warm rounded-full animate-pulse"></div>
                            <span className="text-sm">Interactive 3D Experience</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cultural-earth rounded-full animate-pulse"></div>
                            <span className="text-sm">Traditional Arts & Music</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
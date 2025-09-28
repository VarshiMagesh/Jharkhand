import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import CultureModal from './CultureModal.tsx';

// Import all generated images
import tribalCulture from "@/assets/tribal-culture.jpg";
import danceChhau from "@/assets/dance-chhau.jpg";
import danceKarma from "@/assets/dance-karma.jpg";
import danceJhumar from "@/assets/dance-jhumar.jpg";
import dancePaika from "@/assets/dance-paika.jpg";
import musicBaha from "@/assets/music-baha.jpg";
import musicSohrai from "@/assets/music-sohrai.jpg";
import musicWedding from "@/assets/music-wedding.jpg";
import tribalArtImg from "@/assets/tribal-art.jpg";
import localCuisineImg from "@/assets/local-cuisine.jpg";
import sarhulImg from "@/assets/festivals.jpg";
import karmaImg from "@/assets/festival-karma.jpg";
import sohraiImg from "@/assets/festival-sohrai.jpg";
import tusuImg from "@/assets/festival-tusu.jpg";

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

type CultureItem = {
  image: string;
  name: string;
  fullDesc: string;
};

const CULTURAL_ITEMS: CultureItem[] = [
  {
    image: tribalCulture,
    name: "Traditional Music & Dance",
    fullDesc: "The heartbeat of Jharkhand lies in its rhythmic dances and soulful music, each a narrative of the land's history, beliefs, and celebrations.",
  },
  {
    image: danceChhau,
    name: "Chhau Dance",
    fullDesc: "Chhau is a semi-classical Indian dance with martial and folk traditions. Known for its powerful acrobatics and elaborate masks, it tells stories from epics like the Ramayana and Mahabharata. The Seraikela style of Chhau is particularly famous in Jharkhand.",
  },
  {
    image: danceKarma,
    name: "Karma Dance",
    fullDesc: "Performed during the Karma festival, this folk dance involves men and women forming circles and dancing to the rhythm of the Mandar drum. It's a tribute to the Karam tree, which is worshipped for prosperity and good fortune.",
  },
  {
    image: danceJhumar,
    name: "Jhumar Dance",
    fullDesc: "Jhumar is a popular and rhythmic harvest dance performed mainly by women in circles. Its graceful steps and swaying movements express the joy and happiness of the community during the harvest season.",
  },
  {
    image: dancePaika,
    name: "Paika Dance",
    fullDesc: "Paika is a martial folk dance that re-enacts ancient battles. Performers, holding swords and shields, showcase their courage and skill through energetic movements and formations, accompanied by loud drumming.",
  },
  {
    image: musicBaha,
    name: "Baha Songs",
    fullDesc: "Baha songs are sacred hymns sung by the Santhal tribe during the Baha festival, which celebrates the blossoming of new flowers in spring. The music is deeply connected to nature and spiritual beliefs.",
  },
  {
    image: musicSohrai,
    name: "Sohrai Songs",
    fullDesc: "These folk songs are an integral part of the Sohrai harvest festival. They are sung to celebrate cattle and are often accompanied by the painting of traditional murals, known as Sohrai art, on the walls of houses.",
  },
  {
    image: musicWedding,
    name: "Wedding Songs",
    fullDesc: "Jharkhand has a rich tradition of wedding folk songs that are sung during various rituals of the marriage ceremony. These songs express a wide range of emotions, from the joy of union to the sorrow of a bride leaving her home.",
  },
  {
    image: tribalArtImg,
    name: "Sohrai & Khovar Painting",
    fullDesc: "Sohrai and Khovar are traditional mural art forms practiced by tribal women. Sohrai art is created to celebrate the harvest, while Khovar art is associated with weddings. These paintings are known for their intricate line work and natural motifs.",
  },
  {
    image: localCuisineImg,
    name: "Dhuska & Ghugni",
    fullDesc: "Dhuska is a quintessential Jharkhandi snack or breakfast item. It is a deep-fried pancake made from a batter of rice and lentils, and is most famously served with Ghugni, a spicy curry made from black chickpeas.",
  },
  {
    image: sarhulImg,
    name: "Sarhul Festival",
    fullDesc: "Sarhul is the most important festival for the tribal communities of Jharkhand. It celebrates the beginning of the new year and the blooming of the Sal tree, which is considered sacred. The festivities involve elaborate rituals, community feasts, and vibrant traditional dances.",
  },
  {
    image: karmaImg,
    name: "Karma Festival",
    fullDesc: "Karma is a major festival where the Karam tree is worshipped for good fortune and prosperity. It is celebrated with fasting, traditional music, and the famous Karma dance, where people dance in circles with interlinked hands.",
  },
  {
    image: sohraiImg,
    name: "Sohrai Festival",
    fullDesc: "Sohrai is a harvest festival celebrated after the monsoons, primarily to honor cattle. Houses are decorated with intricate Sohrai murals, and cattle are bathed, adorned, and worshipped for their role in agriculture.",
  },
  {
    image: tusuImg,
    name: "Tusu Parab",
    fullDesc: "Tusu Parab, or Makar Sankranti, is a winter harvest festival. It is celebrated with great enthusiasm, especially by unmarried girls, with community feasts and the singing of traditional Tusu folk songs by the riverside.",
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  segments: 35
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool: CultureItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const usedImages = Array.from({ length: totalSlots }, (_, i) => pool[i % pool.length]);

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].image,
    alt: usedImages[i].name
  }));
}

export default function DomeGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const [selectedItem, setSelectedItem] = useState<CultureItem | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const lastDragEndAt = useRef(0);

  const segments = DEFAULTS.segments;
  const maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg;
  const dragSensitivity = DEFAULTS.dragSensitivity;

  const items = useMemo(() => buildItems(CULTURAL_ITEMS, segments), [segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const frictionMul = 0.94 + 0.055 * 0.6;
      const stopThreshold = 0.015 - 0.01 * 0.6;
      const maxFrames = Math.round(90 + 270 * 0.6);
      
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        stopInertia();
        const evt = event as PointerEvent;
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0] }) => {
        if (!draggingRef.current || !startPosRef.current) return;

        const evt = event as PointerEvent;
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          const [vMagX, vMagY] = velArr;
          
          if (!movedRef.current) {
            // This was a click/tap, handle it
            const target = evt.target as HTMLElement;
            const imageEl = target.closest('.sphere-item');
            if (imageEl) {
              const src = imageEl.getAttribute('data-src');
              const selectedCulture = CULTURAL_ITEMS.find(item => item.image === src);
              if (selectedCulture) {
                setSelectedItem(selectedCulture);
              }
            }
          } else if (Math.abs(vMagX) > 0.005 || Math.abs(vMagY) > 0.005) {
            startInertia(vMagX, vMagY);
          }
          
          startPosRef.current = null;
          lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const fit = 0.5;
      let radius = minDim * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, 600, Infinity);

      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / ${segments}) / 2);
      --rot-x: calc((360deg / ${segments}) / 2);
      --item-width: calc(var(--circ) / ${segments});
      --item-height: calc(var(--circ) / ${segments});
    }
    
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * 2);
      height: calc(var(--item-height) * 2);
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms ease-out;
      transform: rotateY(calc(var(--rot-y) * var(--offset-x))) 
                 rotateX(calc(var(--rot-x) * var(--offset-y))) 
                 translateZ(var(--radius));
    }
    
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      transition: all 300ms ease-out;
      pointer-events: auto;
      transform: translateZ(0);
      background: linear-gradient(135deg, hsl(var(--cultural-warm) / 0.1), hsl(var(--cultural-gold) / 0.1));
      border: 1px solid hsl(var(--border));
      box-shadow: 0 10px 30px hsl(var(--cultural-deep) / 0.3);
    }
    
    .item__image:hover {
      transform: translateZ(20px) scale(1.05);
      box-shadow: 0 20px 40px hsl(var(--cultural-warm) / 0.4);
      border-color: hsl(var(--cultural-warm) / 0.5);
    }
    
    .item__image img {
      filter: brightness(0.9) contrast(1.1);
      transition: filter 300ms ease-out;
    }
    
    .item__image:hover img {
      filter: brightness(1) contrast(1.2);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      
      <div
        ref={rootRef}
        className="sphere-root  w-full h-full bg-gradient-to-b from-background via-background to-cultural-deep/20"
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none"
          style={{
            touchAction: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item"
                  data-src={it.src}
                  data-alt={it.alt}
                  style={
                    {
                      ['--offset-x' as any]: it.x + (2 - 1) / 2,
                      ['--offset-y' as any]: it.y - (2 - 1) / 2,
                    } as React.CSSProperties
                  }
                >
                  <div className="item__image">
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atmospheric overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20 pointer-events-none" />
        </main>

        <CultureModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem?.name || ""}
          image={selectedItem?.image || ""}
          description={selectedItem?.fullDesc || ""}
        />
        
      </div>
    </>
  );
}
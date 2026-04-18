import { useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  curatorNote: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Understated Elegance",
    category: "Kitchen Design",
    description: "A modern kitchen that balances warmth with precision, featuring custom millwork and thoughtful material selection.",
    image: "https://images.unsplash.com/photo-1593136573819-c3b57b8caf29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "The restraint here speaks volumes—every detail considered, nothing superfluous."
  },
  {
    id: 2,
    title: "Layered Light",
    category: "Kitchen Design",
    description: "Where natural light meets carefully curated fixtures, creating an environment of calm sophistication.",
    image: "https://images.unsplash.com/photo-1669046222569-a7672da06e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "Notice how shadow becomes as important as light in defining the space."
  },
  {
    id: 3,
    title: "Material Dialogue",
    category: "Kitchen Design",
    description: "A contemporary space where wood, stone, and metal converse through texture and tone.",
    image: "https://images.unsplash.com/photo-1769970502055-6d1de307406d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "The interplay of materials here creates a visual rhythm that's both dynamic and harmonious."
  },
  {
    id: 4,
    title: "Architectural Joinery",
    category: "Cabinets",
    description: "Custom cabinetry that transcends function, becoming sculptural elements within the space.",
    image: "https://images.unsplash.com/photo-1627362726047-1bda6d2ca237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "Craftsmanship at this level is rare—each joint, each edge, meticulously resolved."
  },
  {
    id: 5,
    title: "Crafted Storage",
    category: "Cabinets",
    description: "Bespoke woodwork that honors traditional techniques while embracing contemporary aesthetics.",
    image: "https://images.unsplash.com/photo-1723902500179-5d061e268b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "There's a quiet dignity in how these pieces frame daily rituals."
  },
  {
    id: 6,
    title: "Textile Architecture",
    category: "Curtains",
    description: "Window treatments that soften space while maintaining architectural clarity.",
    image: "https://images.unsplash.com/photo-1684261556324-a09b2cdf68b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "Fabric becomes atmosphere—controlling light, defining mood, creating enclosure."
  },
  {
    id: 7,
    title: "Warm Minimalism",
    category: "Kitchen Design",
    description: "A study in reduction, where every element serves both aesthetic and functional purpose.",
    image: "https://images.unsplash.com/photo-1669653862523-904e92ee90b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "Minimalism done right never feels cold—it breathes."
  },
  {
    id: 8,
    title: "Timeless Grain",
    category: "Cabinets",
    description: "Celebrating wood's natural beauty through honest construction and thoughtful finish.",
    image: "https://images.unsplash.com/photo-1574501668452-39ee2dd312ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "The grain pattern tells a story—we simply framed it properly."
  },
  {
    id: 9,
    title: "Ambient Layers",
    category: "Curtains",
    description: "Translucent fabrics that modulate daylight, creating ever-changing interior atmospheres.",
    image: "https://images.unsplash.com/photo-1754613411985-1a1606c6023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    curatorNote: "The best window treatments are forgotten until you notice the quality of light."
  },
];

export function ProjectGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="max-w-[1600px] mx-auto px-8 lg:px-16 py-32">
      <div className="mb-20">
        <h2
          className="text-[3rem] md:text-[4rem] mb-4 tracking-[-0.03em]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Selected Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A curated archive of spaces where intention meets execution—from bespoke kitchens to refined details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative overflow-hidden border border-border mb-6 aspect-[4/5]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: hoveredId === project.id ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className="text-[1.5rem] tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {project.title}
                </h3>
                <span className="text-xs tracking-widest uppercase opacity-50 whitespace-nowrap">
                  {project.category}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="pt-4 border-t border-border/50">
                <p
                  className="text-sm italic opacity-70 leading-relaxed"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  "{project.curatorNote}"
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

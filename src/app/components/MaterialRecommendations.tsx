interface Material {
  name: string;
  category: string;
  estimatedCost: number;
  description: string;
  supplier: string;
}

interface MaterialRecommendationsProps {
  budget: number;
  projectType: string;
  onClose: () => void;
}

const getMaterials = (budget: number, projectType: string): Material[] => {
  const budgetTier = budget < 30000 ? 'economy' : budget < 80000 ? 'mid' : 'premium';

  const materialDatabase: Record<string, Record<string, Material[]>> = {
    kitchen: {
      economy: [
        { name: 'Laminate Countertops', category: 'Surfaces', estimatedCost: 2500, description: 'Durable and affordable laminate with stone-look finish', supplier: 'Formica Select' },
        { name: 'Thermofoil Cabinets', category: 'Cabinetry', estimatedCost: 8000, description: 'Vinyl-wrapped MDF in contemporary white', supplier: 'Home Depot Pro' },
        { name: 'Ceramic Tile Backsplash', category: 'Finishes', estimatedCost: 1200, description: 'Classic subway tile in matte finish', supplier: 'Tile Shop' },
        { name: 'Standard Fixtures', category: 'Hardware', estimatedCost: 800, description: 'Brushed nickel pulls and handles', supplier: 'Liberty Hardware' },
      ],
      mid: [
        { name: 'Quartz Countertops', category: 'Surfaces', estimatedCost: 6500, description: 'Engineered quartz in Calacatta design', supplier: 'Caesarstone' },
        { name: 'Maple Wood Cabinets', category: 'Cabinetry', estimatedCost: 18000, description: 'Solid maple with shaker-style doors', supplier: 'KraftMaid Custom' },
        { name: 'Glass Mosaic Backsplash', category: 'Finishes', estimatedCost: 2800, description: 'Hand-set glass tile in neutral palette', supplier: 'Ann Sacks' },
        { name: 'Designer Fixtures', category: 'Hardware', estimatedCost: 1800, description: 'Aged brass pulls and knobs', supplier: 'Rejuvenation' },
      ],
      premium: [
        { name: 'Carrara Marble Countertops', category: 'Surfaces', estimatedCost: 15000, description: 'Italian Carrara marble, honed finish', supplier: 'Stone Source NYC' },
        { name: 'Custom Walnut Cabinetry', category: 'Cabinetry', estimatedCost: 45000, description: 'Book-matched walnut with soft-close mechanisms', supplier: 'Henrybuilt' },
        { name: 'Zellige Tile Backsplash', category: 'Finishes', estimatedCost: 8500, description: 'Handcrafted Moroccan zellige in sage', supplier: 'Clé Tile' },
        { name: 'Artisan Hardware', category: 'Hardware', estimatedCost: 4200, description: 'Hand-forged bronze pulls', supplier: 'E.R. Butler & Co.' },
      ],
    },
    cabinets: {
      economy: [
        { name: 'Pine Construction', category: 'Wood', estimatedCost: 1800, description: 'Clear pine with natural grain', supplier: 'Local Lumber Co.' },
        { name: 'Basic Hardware', category: 'Hardware', estimatedCost: 300, description: 'Standard hinges and slides', supplier: 'Blum Economy' },
        { name: 'Water-Based Finish', category: 'Finishes', estimatedCost: 400, description: 'Clear satin polyurethane', supplier: 'Minwax' },
      ],
      mid: [
        { name: 'White Oak', category: 'Wood', estimatedCost: 5500, description: 'Quarter-sawn white oak, select grade', supplier: 'Woodworkers Source' },
        { name: 'Quality Hardware', category: 'Hardware', estimatedCost: 1200, description: 'Soft-close hinges and full-extension slides', supplier: 'Blum Blumotion' },
        { name: 'Hand-Rubbed Oil', category: 'Finishes', estimatedCost: 1500, description: 'Danish oil with wax topcoat', supplier: 'Waterlox' },
      ],
      premium: [
        { name: 'Figured Walnut', category: 'Wood', estimatedCost: 12000, description: 'Book-matched figured walnut veneer', supplier: 'Certainly Wood' },
        { name: 'Premium Hardware', category: 'Hardware', estimatedCost: 3500, description: 'Concealed European hinges, push-to-open', supplier: 'Hafele Premium' },
        { name: 'Catalyzed Lacquer', category: 'Finishes', estimatedCost: 4000, description: 'Professional spray finish, hand-polished', supplier: 'ML Campbell' },
      ],
    },
    curtains: {
      economy: [
        { name: 'Cotton Blend Fabric', category: 'Fabric', estimatedCost: 1200, description: 'Washable cotton-poly blend in natural', supplier: 'JoAnn Fabrics' },
        { name: 'Standard Rod & Rings', category: 'Hardware', estimatedCost: 300, description: 'Brushed nickel rod with clips', supplier: 'Umbra' },
        { name: 'Basic Lining', category: 'Lining', estimatedCost: 400, description: 'Light-blocking polyester lining', supplier: 'Fabric.com' },
      ],
      mid: [
        { name: 'Belgian Linen', category: 'Fabric', estimatedCost: 3500, description: 'Medium-weight linen in warm gray', supplier: 'The Shade Store' },
        { name: 'Custom Hardware', category: 'Hardware', estimatedCost: 1200, description: 'Hand-forged iron rod with finials', supplier: 'Smith & Noble' },
        { name: 'Interlining', category: 'Lining', estimatedCost: 800, description: 'Cotton flannel interlining for drape', supplier: 'Rowley Company' },
      ],
      premium: [
        { name: 'Silk Taffeta', category: 'Fabric', estimatedCost: 8500, description: 'Dupioni silk in champagne', supplier: 'Scalamandré' },
        { name: 'Bespoke Traverse System', category: 'Hardware', estimatedCost: 4200, description: 'Motorized track with remote control', supplier: 'Silent Gliss' },
        { name: 'Luxury Interlining', category: 'Lining', estimatedCost: 2200, description: 'Wool bump interlining, blackout backing', supplier: 'Kravet' },
      ],
    },
  };

  const projectMaterials = materialDatabase[projectType] || materialDatabase.kitchen;
  return projectMaterials[budgetTier] || projectMaterials.mid;
};

export function MaterialRecommendations({ budget, projectType, onClose }: MaterialRecommendationsProps) {
  const materials = getMaterials(budget, projectType);
  const totalEstimate = materials.reduce((sum, m) => sum + m.estimatedCost, 0);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2
                className="text-[3rem] mb-4 tracking-[-0.03em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Material Recommendations
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Curated selections tailored to your ${budget.toLocaleString()} budget
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-border hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {materials.map((material, index) => (
              <article
                key={index}
                className="border border-border p-8 hover:border-foreground transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-[1.5rem] tracking-[-0.02em]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {material.name}
                  </h3>
                  <span className="text-xs tracking-widest uppercase opacity-50">
                    {material.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  {material.description}
                </p>
                <div className="flex justify-between items-end pt-4 border-t border-border/50">
                  <p className="text-xs tracking-wide opacity-70">
                    {material.supplier}
                  </p>
                  <p className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                    ${material.estimatedCost.toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Estimated total materials cost</p>
              <p
                className="text-[2rem] tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                ${totalEstimate.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Estimates include materials only. Installation, labor, and design fees quoted separately.
              Prices subject to availability and market conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

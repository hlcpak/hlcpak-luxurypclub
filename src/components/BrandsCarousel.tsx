
import React from 'react';

const BrandsCarousel = () => {
  const brands = [
    { name: 'Four Seasons', logo: 'four-seasons.svg' },
    { name: 'Ritz-Carlton', logo: 'ritz-carlton.svg' },
    { name: 'Aman Resorts', logo: 'aman.svg' },
    { name: 'Mandarin Oriental', logo: 'mandarin-oriental.svg' },
    { name: 'St. Regis', logo: 'st-regis.svg' },
    { name: 'Rosewood', logo: 'rosewood.svg' },
    { name: 'Peninsula', logo: 'peninsula.svg' },
    { name: 'Park Hyatt', logo: 'park-hyatt.svg' },
    { name: 'Waldorf Astoria', logo: 'waldorf-astoria.svg' },
    { name: 'Belmond', logo: 'belmond.svg' },
    { name: 'Six Senses', logo: 'six-senses.svg' },
    { name: 'One&Only', logo: 'one-and-only.svg' },
    { name: 'Bulgari', logo: 'bulgari.svg' },
    { name: 'Raffles', logo: 'raffles.svg' },
    { name: 'Banyan Tree', logo: 'banyan-tree.svg' },
    { name: 'Como Hotels', logo: 'como.svg' },
    { name: 'Oberoi', logo: 'oberoi.svg' },
    { name: 'Taj', logo: 'taj.svg' },
    { name: 'Jumeirah', logo: 'jumeirah.svg' },
    { name: 'Capella', logo: 'capella.svg' },
  ];

  // For now, we'll use placeholder divs as we don't have the actual logo SVGs
  const renderPlaceholderLogo = (brand: { name: string; logo: string }) => (
    <div className="h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-md px-6 py-2 flex items-center justify-center">
      <span className="text-gold text-sm font-medium">{brand.name}</span>
    </div>
  );

  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <div className="inline-block">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Our Trusted Partners</span>
          <h2 className="text-2xl md:text-3xl mt-2 text-white">Premium Hotel Partnerships</h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
        </div>
      </div>
      
      <div className="relative">
        {/* First row - moves left to right */}
        <div className="flex space-x-6 animate-marquee">
          {brands.slice(0, 10).map((brand, index) => (
            <div key={`brand-1-${index}`} className="flex-shrink-0">
              {renderPlaceholderLogo(brand)}
            </div>
          ))}
          {brands.slice(0, 10).map((brand, index) => (
            <div key={`brand-1-dup-${index}`} className="flex-shrink-0">
              {renderPlaceholderLogo(brand)}
            </div>
          ))}
        </div>
        
        {/* Second row - moves right to left */}
        <div className="flex space-x-6 mt-6" style={{ animation: 'marquee 30s linear infinite reverse' }}>
          {brands.slice(10, 20).map((brand, index) => (
            <div key={`brand-2-${index}`} className="flex-shrink-0">
              {renderPlaceholderLogo(brand)}
            </div>
          ))}
          {brands.slice(10, 20).map((brand, index) => (
            <div key={`brand-2-dup-${index}`} className="flex-shrink-0">
              {renderPlaceholderLogo(brand)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;

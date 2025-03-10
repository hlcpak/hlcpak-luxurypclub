
import React from 'react';
import { HotelDeal, TourPackage } from '@/lib/supabase';
import DealCard from './DealCard';
import SectionHeader from './SectionHeader';

interface DealsSectionProps {
  title: string;
  items: (HotelDeal | TourPackage)[];
  type: 'hotel' | 'tour';
  viewAllLink: string;
  viewAllLabel: string;
  itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  startIndex: number;
}

const DealsSection: React.FC<DealsSectionProps> = ({
  title,
  items,
  type,
  viewAllLink,
  viewAllLabel,
  itemsRef,
  startIndex
}) => {
  const getDelayClass = (index: number): string => {
    switch (index % 3) {
      case 0: return 'delay-100';
      case 1: return 'delay-200';
      case 2: return 'delay-300';
      default: return 'delay-100';
    }
  };

  return (
    <div className="mb-16">
      <SectionHeader 
        title={title} 
        viewAllLink={viewAllLink} 
        viewAllLabel={viewAllLabel} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.slice(0, 3).map((item, index) => (
          <DealCard
            key={item.id}
            item={item}
            type={type}
            index={index}
            delayClass={getDelayClass(index)}
            ref={(el) => (itemsRef.current[startIndex + index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsSection;

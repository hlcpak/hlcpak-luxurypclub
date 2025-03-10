
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  viewAllLink: string;
  viewAllLabel: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  viewAllLink, 
  viewAllLabel 
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-display font-semibold text-white">{title}</h3>
      <a href={viewAllLink} className="text-gold-dark hover:text-gold flex items-center">
        {viewAllLabel} <ArrowRight size={16} className="ml-2" />
      </a>
    </div>
  );
};

export default SectionHeader;

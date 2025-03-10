
import React, { forwardRef } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HotelDeal, TourPackage } from '@/lib/supabase';

interface DealCardProps {
  item: HotelDeal | TourPackage;
  type: 'hotel' | 'tour';
  index: number;
  delayClass: string;
}

const DealCard = forwardRef<HTMLDivElement, DealCardProps>(
  ({ item, type, index, delayClass }, ref) => {
    const navigate = useNavigate();

    const handleViewDeal = () => {
      if (type === 'hotel') {
        navigate(`/deals/${item.id}`);
      } else {
        navigate(`/packages/${item.id}`);
      }
    };

    const convertToPKR = (usdPrice: number) => {
      return (usdPrice * 280).toLocaleString();
    };

    return (
      <div
        ref={ref}
        className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ${delayClass} hover:border-gold/50 hover:shadow-gold`}
      >
        <div className="relative overflow-hidden h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-0.5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="text-xs bg-gold text-black px-2 py-1 rounded group-hover:bg-gold">
                {item.deal}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-gold transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center text-white/60 text-sm">
                <MapPin size={14} className="mr-1" />
                {item.location}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="opacity-100 group-hover:opacity-100">
                <span className="text-xs text-white/50">Member Price</span>
                <div className="text-xl font-display font-bold text-gold">
                  PKR {convertToPKR(item.member_price)}
                  <span className="text-sm text-white/60 ml-1 line-through">
                    PKR {convertToPKR(item.regular_price)}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-white/60 text-xs">
                <Clock size={14} className="mr-1" />
                {item.duration}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleViewDeal}
            className="w-full mt-4 py-3 rounded text-center border border-gold-dark text-white hover:bg-gold-dark transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    );
  }
);

DealCard.displayName = 'DealCard';
export default DealCard;

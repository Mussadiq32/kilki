import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ReviewSummaryProps {
  propertyId: number;
  showCount?: boolean;
  size?: 'small' | 'default';
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ 
  propertyId, 
  showCount = true, 
  size = 'default' 
}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewSummary = async () => {
      try {
        const { data: avgRating } = await supabase.rpc('get_property_average_rating', {
          property_id_param: propertyId
        });
        
        const { data: reviewCount } = await supabase.rpc('get_property_review_count', {
          property_id_param: propertyId
        });

        setAverageRating(Number(avgRating) || 0);
        setTotalReviews(reviewCount || 0);
      } catch (error) {
        console.error('Error fetching review summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewSummary();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-12 h-4 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (totalReviews === 0) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Star className={`${size === 'small' ? 'h-3 w-3' : 'h-4 w-4'} text-gray-300`} />
        <span className={`${size === 'small' ? 'text-xs' : 'text-sm'}`}>No reviews</span>
      </div>
    );
  }

  const starSize = size === 'small' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = size === 'small' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
        <span className={`${textSize} font-medium ml-1`}>
          {averageRating.toFixed(1)}
        </span>
      </div>
      {showCount && (
        <span className={`${textSize} text-gray-600`}>
          ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
};

export default ReviewSummary; 
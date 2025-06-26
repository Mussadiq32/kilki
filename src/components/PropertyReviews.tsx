import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Trash2,
  Edit,
  Flag,
  Award
} from 'lucide-react';

interface Review {
  id: string;
  property_id: number;
  user_id: string;
  user_name: string;
  user_email?: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  replies?: Reply[];
  votes?: Vote[];
  user_vote?: 'like' | 'dislike' | null;
}

interface Reply {
  id: string;
  review_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

interface Vote {
  id: string;
  review_id: string;
  user_id: string;
  vote_type: 'like' | 'dislike';
  created_at: string;
}

interface PropertyReviewsProps {
  propertyId: number;
  propertyTitle?: string;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ propertyId, propertyTitle }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: ''
  });
  
  const [replyContent, setReplyContent] = useState('');
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const StarRating = ({ rating, onRatingChange, readonly = false, size = 'default' }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
    size?: 'small' | 'default' | 'large';
  }) => {
    const starSize = size === 'small' ? 'h-4 w-4' : size === 'large' ? 'h-6 w-6' : 'h-5 w-5';
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${readonly ? '' : 'cursor-pointer'} transition-colors ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('property_reviews')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      // Fetch replies for each review
      const reviewsWithReplies = await Promise.all((reviewsData || []).map(async (review) => {
        const { data: replies } = await supabase
          .from('review_replies')
          .select('*')
          .eq('review_id', review.id)
          .order('created_at', { ascending: true });

        // Get user's vote if authenticated
        let userVote = null;
        if (isAuthenticated && user) {
          const { data: voteData } = await supabase
            .from('review_votes')
            .select('vote_type')
            .eq('review_id', review.id)
            .eq('user_id', user.id)
            .single();
          
          userVote = voteData?.vote_type || null;
        }

        return {
          ...review,
          replies: replies || [],
          user_vote: userVote
        };
      }));

      setReviews(reviewsWithReplies);

      // Get average rating and count
      const { data: avgRating } = await supabase.rpc('get_property_average_rating', {
        property_id_param: propertyId
      });
      
      const { data: reviewCount } = await supabase.rpc('get_property_review_count', {
        property_id_param: propertyId
      });

      setAverageRating(Number(avgRating) || 0);
      setTotalReviews(reviewCount || 0);

    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId, isAuthenticated]);

  const handleSubmitReview = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.title.trim() || !newReview.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and content for your review",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('property_reviews')
        .insert([{
          property_id: propertyId,
          user_id: user.id,
          user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          user_email: user.email,
          rating: newReview.rating,
          title: newReview.title,
          content: newReview.content
        }]);

      if (error) throw error;

      toast({
        title: "Review Submitted",
        description: "Thank you for your review!",
      });

      setNewReview({ rating: 5, title: '', content: '' });
      setShowReviewForm(false);
      fetchReviews();

    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVoteReview = async (reviewId: string, voteType: 'like' | 'dislike') => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('review_votes')
        .select('*')
        .eq('review_id', reviewId)
        .eq('user_id', user.id)
        .single();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking same vote type
          await supabase
            .from('review_votes')
            .delete()
            .eq('id', existingVote.id);
        } else {
          // Update vote type
          await supabase
            .from('review_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
        }
      } else {
        // Create new vote
        await supabase
          .from('review_votes')
          .insert([{
            review_id: reviewId,
            user_id: user.id,
            vote_type: voteType
          }]);
      }

      fetchReviews();
    } catch (error: any) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to record vote",
        variant: "destructive",
      });
    }
  };

  const handleSubmitReply = async (reviewId: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to reply",
        variant: "destructive",
      });
      return;
    }

    if (!replyContent.trim()) return;

    try {
      const { error } = await supabase
        .from('review_replies')
        .insert([{
          review_id: reviewId,
          user_id: user.id,
          user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          content: replyContent
        }]);

      if (error) throw error;

      setReplyContent('');
      setReplyingTo(null);
      fetchReviews();

      toast({
        title: "Reply Posted",
        description: "Your reply has been added",
      });

    } catch (error: any) {
      console.error('Error submitting reply:', error);
      toast({
        title: "Error",
        description: "Failed to post reply",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Reviews & Ratings
            {propertyTitle && <span className="text-sm text-gray-600">for {propertyTitle}</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} readonly size="large" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Average Rating
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalReviews}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Reviews
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {reviews.filter(r => r.verified).length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Verified Reviews
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="mt-6 text-center">
              <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <StarRating 
                rating={newReview.rating} 
                onRatingChange={(rating) => setNewReview({...newReview, rating})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Review Title</label>
              <Input
                placeholder="Summarize your experience"
                value={newReview.title}
                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Review Content</label>
              <Textarea
                placeholder="Share your detailed experience..."
                rows={4}
                value={newReview.content}
                onChange={(e) => setNewReview({...newReview, content: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSubmitReview} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No reviews yet. Be the first to review this property!
              </p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{review.user_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{review.user_name}</h3>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <StarRating rating={review.rating} readonly size="small" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVoteReview(review.id, 'like')}
                      className={review.user_vote === 'like' ? 'text-blue-600' : ''}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleVoteReview(review.id, 'dislike')}
                      className={review.user_vote === 'dislike' ? 'text-red-600' : ''}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Dislike
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    
                    <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                      {review.helpful_count} helpful
                    </div>
                  </div>

                  {/* Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="ml-8 space-y-3 pt-4 border-t">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm">{reply.user_name}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(reply.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="ml-8 pt-4 border-t">
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSubmitReply(review.id)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Post Reply
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyReviews; 
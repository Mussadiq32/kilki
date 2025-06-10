import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSource?: 'upload' | 'drive' | 'youtube';
  videoUrl?: string;
}

const VideoModal = ({ isOpen, onClose, videoSource = 'upload', videoUrl }: VideoModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderVideoContent = () => {
    switch (videoSource) {
      case 'upload':
        return (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            controls
            autoPlay
            muted
          >
            <source src="/videos/royal-group-intro.mp4" type="video/mp4" />
            <source src="/videos/royal-group-intro.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        );
      
      case 'drive':
        return (
          <iframe
            src={videoUrl || "https://drive.google.com/file/d/16Pb_1fz2UsbA2NlRZvKXvdBiWNc2_aqD/preview"}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          ></iframe>
        );
      
      case 'youtube':
        return (
          <iframe
            src={videoUrl || "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        );
      
      default:
        return (
          <div className="absolute inset-0 w-full h-full bg-gray-900 flex items-center justify-center">
            <p className="text-white text-lg">Video not available</p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            {/* Video Content */}
            <div className="relative w-full h-0 pb-[56.25%]">
              {renderVideoContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal; 
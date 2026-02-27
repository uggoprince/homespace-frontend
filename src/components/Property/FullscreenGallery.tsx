import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

type FullscreenGalleryProps = {
  photos: { photo: string }[];
  currentImage: number;
  numberOfPhotos: number;
  prevImage: () => void;
  nextImage: () => void;
  onClose: () => void;
};

const FullscreenGallery = ({
  photos, currentImage, numberOfPhotos, prevImage, nextImage, onClose,
}: FullscreenGalleryProps) => {
  if (!photos.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center
        rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {numberOfPhotos > 1 && (
        <>
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 w-12 h-12 flex items-center justify-center
            rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 w-12 h-12 flex items-center justify-center
            rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <Image
        src={photos[currentImage]?.photo}
        alt=""
        width={1200}
        height={800}
        className="max-w-full max-h-full object-contain"
        style={{ objectFit: 'contain' }}
        priority
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
        {currentImage + 1}
        {' / '}
        {numberOfPhotos}
      </div>
    </div>
  );
};

export default FullscreenGallery;

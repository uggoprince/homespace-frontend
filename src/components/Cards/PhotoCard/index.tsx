import { Photo } from "@/types/property";

export function PhotoCard({
  photo, index, showCover = false, onRemove, removeDisabled = false, children,
}: Readonly<{
  photo: Photo;
  index: number;
  showCover?: boolean;
  onRemove: () => void;
  removeDisabled?: boolean;
  children?: React.ReactNode;
}>) {
  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
      {showCover && index === 0 && (
        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md font-medium">Cover</span>
      )}
      {children}
      <button
        type="button"
        disabled={removeDisabled}
        onClick={onRemove}
        className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

import { Photo } from '@/types/property';
import { useState } from 'react';

// --- Photo upload helpers ---
function handlePhotoFiles(files: File[], setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>, setPhotoError: (e: string | null) => void) {
  const imageFiles = files.filter((f) => f.type.startsWith('image/'));
  const newPhotos: Photo[] = imageFiles.map((file) => ({
    id: `new-${Date.now()}-${Math.random()}`,
    file,
    url: URL.createObjectURL(file),
    existing: false,
  }));
  setPhotos((prev) => [...prev, ...newPhotos]);
  setPhotoError(null);
}

export function PhotoUploadArea({
  photos,
  setPhotos,
  photoError,
  setPhotoError,
}: Readonly<{
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  photoError: string | null;
  setPhotoError: (e: string | null) => void;
}>) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handlePhotoFiles([...e.dataTransfer.files], setPhotos, setPhotoError);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handlePhotoFiles([...e.target.files], setPhotos, setPhotoError);
  };

  let uploadAreaClassName: string;
  if (dragActive) {
    uploadAreaClassName = 'border-main-500 bg-indigo-50 dark:bg-indigo-900/20';
  } else if (photoError) {
    uploadAreaClassName = 'border-destructive bg-red-50 dark:bg-red-900/10';
  } else {
    uploadAreaClassName = 'border-gray-300 dark:border-slate-700 hover:border-main-400 dark:hover:border-main-600';
  }

  return (
    <>
      <button
        type="button"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={(e) => {
          const input = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
          input?.click();
        }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer block ${uploadAreaClassName}`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-slate-300 font-medium mb-1">
            {photos.some((p) => !p.existing)
              ? `${photos.filter((p) => !p.existing).length} photo(s) selected`
              : 'Drop images here or click to upload'}
          </p>
          <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB each</p>
        </div>
      </button>
      {photoError && <p className="text-destructive text-xs mt-2">{photoError}</p>}
    </>
  );
}

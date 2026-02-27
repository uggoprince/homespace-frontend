import React from 'react';
import { Button } from '@/components/ui/button';
import { PhotoIcon } from '@/components/SVG/icons';
import { PhotoCard } from '@/components/Cards/PhotoCard';
import { PhotoUploadArea } from './PhotoUploadArea';
import type { Photo } from '@/types/property';

interface PhotosSectionProps {
  mode: 'create' | 'edit';
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  photoError: string | null;
  setPhotoError: React.Dispatch<React.SetStateAction<string | null>>;
  photoLoading: boolean;
  handleAddPhotos: (files: File[]) => void;
  handleUpdatePhoto: (serverId: string, file: File) => void;
  setPendingDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
}

export function PhotosSection({
  mode,
  photos,
  setPhotos,
  photoError,
  setPhotoError,
  photoLoading,
  handleAddPhotos,
  handleUpdatePhoto,
  setPendingDeleteId,
}: Readonly<PhotosSectionProps>) {
  const removePhoto = (id: string) => setPhotos((prev) => prev.filter((p) => p.id !== id));

  return (
    <section className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <PhotoIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        Photos {mode === 'create' && <span className="text-destructive">*</span>}
      </h2>

      {mode === 'create' && (
        <>
          <PhotoUploadArea
            photos={photos}
            setPhotos={setPhotos}
            photoError={photoError}
            setPhotoError={setPhotoError}
          />
          {photos.length > 0 && (
            <PhotoGrid className="mt-6">
              {photos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  showCover
                  onRemove={() => removePhoto(photo.id)}
                />
              ))}
            </PhotoGrid>
          )}
        </>
      )}

      {mode === 'edit' && (
        <>
          {photos.some((p) => p.existing) && (
            <PhotoGrid className="mb-6">
              {photos.filter((p) => p.existing).map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  showCover
                  onRemove={() => photo.serverId && setPendingDeleteId(photo.serverId)}
                  removeDisabled={photoLoading}
                >
                  <label aria-label="Replace photo" className="absolute bottom-2 left-2 w-8 h-8 bg-gray-800/70 hover:bg-gray-700/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={photoLoading}
                      onChange={(e) => {
                        if (e.target.files?.[0] && photo.serverId) {
                          handleUpdatePhoto(photo.serverId, e.target.files[0]);
                        }
                      }}
                    />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </label>
                </PhotoCard>
              ))}
            </PhotoGrid>
          )}

          <div className="border-t border-gray-100 dark:border-slate-800 pt-5">
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">Add More Photos</p>
            <PhotoUploadArea
              photos={photos.filter((p) => !p.existing)}
              setPhotos={(updater) =>
                setPhotos((prev) => {
                  const existing = prev.filter((p) => p.existing);
                  const staged = typeof updater === 'function' ? updater(prev.filter((p) => !p.existing)) : updater;
                  return [...existing, ...staged];
                })
              }
              photoError={photoError}
              setPhotoError={setPhotoError}
            />
            {photos.some((p) => !p.existing) && (
              <>
                <PhotoGrid className="mt-4">
                  {photos.filter((p) => !p.existing).map((photo, index) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      index={index}
                      onRemove={() => removePhoto(photo.id)}
                    />
                  ))}
                </PhotoGrid>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    disabled={photoLoading}
                    loading={photoLoading}
                    onClick={() => {
                      const files = photos.filter((p) => !p.existing && p.file).map((p) => p.file!);
                      handleAddPhotos(files);
                    }}
                    className="cursor-pointer"
                  >
                    Upload Photos
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function PhotoGrid({ className, children }: Readonly<{ className?: string; children: React.ReactNode }>) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${className ?? ''}`}>
      {children}
    </div>
  );
}

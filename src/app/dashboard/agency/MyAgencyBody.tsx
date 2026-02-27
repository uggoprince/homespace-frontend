"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Image from "next/image";
import { GET_USER_AGENCY, UPDATE_BANNER } from "@/lib/graphql/agency";
import { useDashboardStore } from "@/stores/dashboardStore";
import ErrorHandler from "@/components/ErrorHandler";
import Modal from "@/components/Modal";
import { showToast } from "@/components/Toast";
import { Check, Eye, Mail, MapPin, Pencil, Phone } from "lucide-react";
import {
  FaFacebook, FaWhatsapp, FaTwitter, FaInstagram,
} from 'react-icons/fa';
import { PageHeader } from "@/components/Header/PageHeader";
import { CustomLink } from "@/components/Link";
import { PATHS } from "@/Utils/paths";
import { Skeleton } from "@/components/ui/skeleton";

// --- SVG Icons ---
const iconClassName = "w-5 h-5 text-gray-500 dark:text-slate-400";

const AgencyBuildingIcon = () => (
  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const EyeIcon = () => (
  <Eye className="w-4 h-4" />
);

// --- Contact info item ---

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 dark:text-slate-500">{label}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary dark:text-indigo-400 hover:underline break-all">
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-900 dark:text-white wrap-break-word">{value}</p>
      )}
    </div>
  </div>
);

// --- Loading skeleton ---

const AgencySkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* <div className="flex justify-between">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40 bg-gray-200 dark:bg-slate-800 rounded" />
        <Skeleton className="h-4 w-56 bg-gray-200 dark:bg-slate-800 rounded" />
      </div>
      <Skeleton className="h-10 w-40 bg-gray-200 dark:bg-slate-800 rounded-xl" />
    </div> */}
    <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
      <Skeleton className="h-40 bg-gray-200 dark:bg-slate-800 rounded-b-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-5 w-48 bg-gray-200 dark:bg-slate-800 rounded" />
        <div className="grid grid-cols-2 gap-5">
          {(['phone', 'email', 'location', 'social'] as const).map((field) => (
            <div key={field} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-slate-800 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-12 bg-gray-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ALLOWED_TYPES = new Set(['image/png', 'image/jpg', 'image/jpeg']);

export default function MyAgencyBody() {
  const { agency: storedAgency, agencyFetched, setAgency, invalidateAgency } = useDashboardStore();

  const { loading, error, data, refetch } = useQuery(GET_USER_AGENCY, {
    skip: agencyFetched,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.getUserAgency) {
      setAgency(data.getUserAgency);
    }
  }, [data, setAgency]);

  const [updateBanner, { loading: uploading }] = useMutation(UPDATE_BANNER);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.has(file.type)) {
      showToast('Only PNG and JPG files are allowed', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setBannerFile(file);
      setBannerPreview(event.target?.result as string);
      setDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!bannerFile || !agency?.id) return;
    try {
      const result = await updateBanner({ variables: { id: agency.id, files: [bannerFile] } });
      if (result.data?.updateAgencyBanner) {
        setAgency(result.data.updateAgencyBanner);
      }
      showToast('Banner updated', 'success');
      setDialogOpen(false);
    } catch {
      showToast('Failed to upload banner', 'error');
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setBannerFile(null);
      setBannerPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    setDialogOpen(open);
  };

  if (error) return <ErrorHandler error={error} showBackButton={false} onRetry={() => refetch()} />;

  const agency = storedAgency ?? data?.getUserAgency;

  const location = [agency?.address, agency?.state, agency?.country].filter(Boolean).join(", ");
  const socialLinks = [
    { icon: <FaWhatsapp className={iconClassName} />, label: "WhatsApp", value: agency?.whatsapp, href: `https://wa.me/${agency?.whatsapp}` },
    { icon: <FaFacebook className={iconClassName} />, label: "Facebook", value: agency?.facebook, href: agency?.facebook },
    { icon: <FaInstagram className={iconClassName} />, label: "Instagram", value: agency?.instagram },
    { icon: <FaTwitter className={iconClassName} />, label: "Twitter", value: agency?.twitter },
  ].filter((s) => s.value);

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFilePick}
      />
      {/* Page Header */}
      <PageHeader title="My Agency" description="Manage your agency profile"
        onRefresh={invalidateAgency}
        isRefreshing={loading}
      >
        <CustomLink
          to={PATHS.newProperty}
          Icon={EyeIcon}
          text="View Public Profile"
          className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
        />
      </PageHeader>

      {/* Agency Card */}
      {loading && <AgencySkeleton />}
      {agency && (
        <div className={`bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors${loading ? ' hidden' : ''}`}>
          {/* Agency Header - Gradient */}
          <div className="bg-linear-to-r from-main-500 to-purple-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Logo */}
              <div className="relative w-full max-w-120">
                <div className=" bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                  {agency.banner ? (
                    <Image src={agency.banner} alt={agency.name} className="w-full h-full object-cover" width={480} height={270} />
                  ) : (
                    <AgencyBuildingIcon />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h2 className="text-xl font-bold text-white">{agency.name}</h2>
                  <Check className="w-5 h-5 bg-white text-green-500 rounded-full p-1" />
                </div>
                <p className="text-white/70 text-sm">@{agency.username}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {agency.phoneNumber && (
                <ContactItem icon={<Phone className={iconClassName} />} label="Phone" value={agency.phoneNumber} />
              )}
              {agency.email && (
                <ContactItem icon={<Mail className={iconClassName} />} label="Email" value={agency.email} />
              )}
              {location && (
                <ContactItem icon={<MapPin className={iconClassName} />} label="Location" value={location} />
              )}
              {socialLinks.map((social) => (
                <ContactItem
                  key={social.label}
                  icon={social.icon}
                  label={social.label}
                  value={social.value}
                  href={social.href}
                />
              ))}
            </div>
          </div>

          {/* About Section */}
          {agency.about && (
            <div className="px-6 pb-6 border-t border-gray-100 dark:border-slate-800 pt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{agency.about}</p>
            </div>
          )}
        </div>
      )}

      {/* Banner Upload Modal */}
      <Modal
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        title="Upload Banner"
        className="sm:max-w-3xl"
        cancelLabel="Cancel"
        onCancel={() => handleDialogClose(false)}
        action={{
          label: uploading ? 'Uploading...' : 'Upload',
          onClick: handleUpload,
          loading: uploading,
          disabled: uploading,
        }}
      >
        {bannerPreview && (
          <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
            <Image src={bannerPreview} alt="Banner preview" className="w-full h-auto object-cover" width={800} height={400} />
          </div>
        )}
      </Modal>
    </div>
  );
}

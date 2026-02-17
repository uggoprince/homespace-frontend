'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';
import { getInitials } from '@/Utils/formatters';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';
import { CreateAgencyForm } from '@/components/CreateAgencyForm';
import {
  PencilIcon,
  BuildingIcon,
  LockIcon,
  BellIcon,
  LogOutIcon,
  ChevronRightIcon,
  CameraIcon,
} from 'lucide-react';

export default function ProfilePage() {
  const mounted = useIsMounted();
  const auth = useAuth();
  const initialAuth = useInitialAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const user = mounted ? auth?.user : null;
  const hasAgency = user?.profile?.hasAgency || initialAuth.hasAgency;
  const displayName = user
    ? `${user.firstname} ${user.lastname}`
    : initialAuth.displayName || '';

  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    country: user?.country || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      country: user?.country || '',
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: Add update user mutation when API supports it
    setIsEditing(false);
  };

  const inputClasses =
    'w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors';

  return (
    <div className="page-content container">
      <main className="max-w-3xl mx-auto py-8">
        {/* Page Title */}
        {/* <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            Manage your account information
          </p>
        </div> */}

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors">
          {/* Profile Header */}
          <div className="bg-linear-to-r from-primary to-primary px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(displayName)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    <CameraIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              {/* Name & Email */}
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-white">{displayName}</h2>
                {user?.email && (
                  <p className="text-white/80 text-sm">{user.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form/Details */}
          <div className="p-6">
            {/* Edit Toggle */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  ) : (
                    <p className="px-4 py-2.5 text-gray-900 dark:text-white">
                      {user?.firstname || '-'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  ) : (
                    <p className="px-4 py-2.5 text-gray-900 dark:text-white">
                      {user?.lastname || '-'}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                ) : (
                  <p className="px-4 py-2.5 text-gray-900 dark:text-white">
                    {user?.email || '-'}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                ) : (
                  <p className="px-4 py-2.5 text-gray-900 dark:text-white">
                    {user?.country || '-'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Agency CTA */}
        {!hasAgency && (
          <div className="mt-6 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BuildingIcon className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Become an Agent</h3>
                </div>
                <p className="text-white/80 text-sm max-w-md">
                  Create your own agency and start listing properties on HomeSpace.
                  Reach thousands of potential buyers and renters.
                </p>
              </div>
              <Button
                onClick={() => setDialogOpen(true)}
                className="shrink-0 bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold"
              >
                Create Agency
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Manage Agency Link (if user has agency) */}
        {hasAgency && (
          <div className="mt-6 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                  <BuildingIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">My Agency</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Manage your agency and listings
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/agency"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                Manage
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Account Actions */}
        <div className="mt-6 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Account Settings</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Manage your account preferences
            </p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            <Link
              href="/change-password"
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LockIcon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                <span className="text-gray-700 dark:text-slate-300">Change Password</span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
            </Link>
            <Link
              href="/notifications"
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BellIcon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                <span className="text-gray-700 dark:text-slate-300">Notification Preferences</span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-slate-500" />
            </Link>
            <button
              onClick={() => auth?.logout()}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <LogOutIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-600 dark:text-red-400">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      <Modal open={dialogOpen} onOpenChange={setDialogOpen} title="Create Agency" className="max-w-3xl">
        <CreateAgencyForm onSuccess={() => setDialogOpen(false)} />
      </Modal>
    </div>
  );
}

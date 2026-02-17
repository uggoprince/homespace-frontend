"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/providers/AuthProvider";
import { GET_USER_AGENCY } from "@/lib/graphql/agency";

// --- SVG Icon components ---

const PropertyIcon = () => (
  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ViewsIcon = () => (
  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const InquiriesIcon = () => (
  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ListingsIcon = () => (
  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

// --- Stats ---

const stats = {
  totalProperties: 0,
  activeListings: 0,
  totalViews: 0,
  inquiries: 0,
  viewsChange: 0,
  inquiriesChange: 0,
};

// --- Activity placeholder ---

const recentActivity: { id: number; type: "inquiry" | "view" | "listing"; message: string; time: string }[] = [];

const ActivityIcon = ({ type }: { type: string }) => {
  if (type === "inquiry") return <InquiriesIcon />;
  if (type === "view") return <ViewsIcon />;
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
};

const activityColor: Record<string, string> = {
  inquiry: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  view: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  listing: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
};

export default function DashboardPage() {
  const auth = useAuth();
  const firstName = auth?.user?.firstname || "there";
  const { data } = useQuery(GET_USER_AGENCY);
  const agency = data?.getUserAgency;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Welcome back, {firstName}</p>
        </div>
        <Link
          href="/properties/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
        >
          <PlusIcon />
          Add Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 dark:text-slate-400 text-sm">Total Properties</span>
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
              <PropertyIcon />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProperties}</p>
          <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">{stats.activeListings} active listings</p>
        </div>

        {/* Total Views */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 dark:text-slate-400 text-sm">Total Views</span>
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
              <ViewsIcon />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalViews.toLocaleString()}</p>
          {stats.viewsChange > 0 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.viewsChange}% this month
            </p>
          )}
        </div>

        {/* Inquiries */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 dark:text-slate-400 text-sm">Inquiries</span>
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
              <InquiriesIcon />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.inquiries}</p>
          {stats.inquiriesChange > 0 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.inquiriesChange}% this month
            </p>
          )}
        </div>

        {/* Agency Status */}
        <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-sm">Agency Status</span>
            {agency && (
              <span className="flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                <VerifiedIcon />
                Active
              </span>
            )}
          </div>
          <p className="text-lg font-bold truncate">{agency?.name || "No agency"}</p>
          <p className="text-white/70 text-sm">{agency ? `@${agency.username}` : "Create one to get started"}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 transition-colors">
          <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          {recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${activityColor[activity.type]}`}>
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-slate-300">{activity.message}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 dark:text-slate-500 text-sm">
              No recent activity yet
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 transition-colors">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/properties/new"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <PlusIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Add New Property</p>
                <p className="text-xs text-gray-500 dark:text-slate-500">List a new property</p>
              </div>
            </Link>
            <Link
              href="/dashboard/agency"
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <EditIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Edit Agency Profile</p>
                <p className="text-xs text-gray-500 dark:text-slate-500">Update your agency info</p>
              </div>
            </Link>
            <Link
              href="/dashboard/properties"
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <ListingsIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Listings</p>
                <p className="text-xs text-gray-500 dark:text-slate-500">View all properties</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

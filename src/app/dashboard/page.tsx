"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/providers/AuthProvider";
import { GET_USER_AGENCY } from "@/lib/graphql/agency";
import { useDashboardStore } from "@/stores/dashboardStore";
import { Clipboard, Eye, MessageCircleMore, Plus, SquarePen } from "lucide-react";
import { PropertyIcon } from "@/components/SVG/icons";
import { AddLink } from "@/components/Link";
import { PATHS } from "@/Utils/paths";
import { PageHeader } from "@/components/Header/PageHeader";

// --- SVG Icon components ---
const ViewsIcon = () => (
  <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
);

const InquiriesIcon = () => (
  <MessageCircleMore className="w-5 h-5 text-amber-600 dark:text-amber-400" />
);

const VerifiedIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlusIcon = () => (
  <Plus className="w-5 h-5" />
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

const StatsCard = ({ title, icon, value, subtitle }: { title: string; icon: ReactNode; value: string | number; subtitle?: string | ReactNode }) => {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 dark:text-slate-400 text-sm">{title}</span>
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
};



export default function DashboardPage() {
  const auth = useAuth();
  const firstName = auth?.user?.firstname || "there";
  const { agency: storedAgency, agencyFetched, setAgency, invalidateAgency } = useDashboardStore();

  const { data, loading } = useQuery(GET_USER_AGENCY, {
    skip: agencyFetched,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.getUserAgency) setAgency(data.getUserAgency);
  }, [data, setAgency]);

  const agency = storedAgency ?? data?.getUserAgency;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader title="Dashboard" description={`Welcome back, ${firstName}`}
        onRefresh={invalidateAgency}
        isRefreshing={loading}
      >
        <AddLink
          to={PATHS.newProperty}
          Icon={PlusIcon}
          text="Add Property"
        />
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <StatsCard
          title="Total Properties"
          icon={<PropertyIcon className="text-main-600 dark:text-main-400" />}
          value={stats.totalProperties}
          subtitle={`${stats.activeListings} active listings`}
        />

        {/* Total Views */}
        <StatsCard
          title="Total Views"
          icon={<ViewsIcon />}
          value={stats.totalViews}
          subtitle={stats.viewsChange > 0 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.viewsChange}% this month
            </p>)}
        />

        {/* Inquiries */}
        <StatsCard
          title="Inquiries"
          icon={<MessageCircleMore className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          value={stats.inquiries}
          subtitle={stats.inquiriesChange > 0 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.inquiriesChange}% this month
            </p>
          )}
        />

        {/* Agency Status */}
        <div className="bg-linear-to-br from-main-500 to-purple-600 rounded-2xl p-5 text-white">
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
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${activityColor[activity.type]}`}>
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
              href="/dashboard/properties/new"
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
                <SquarePen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
                
                <Clipboard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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

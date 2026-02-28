"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_AGENCY, GET_AGENCY_PROPERTIES_WITH_DESCRIPTION } from "@/lib/graphql/agency";
import { DELETE_PROPERTY } from "@/lib/graphql/property";
import { useDashboardStore } from "@/stores/dashboardStore";
import { formatPrice } from "@/Utils/formatters";
import ErrorHandler from "@/components/ErrorHandler";
import { Ellipsis, Eye, Plus, SquarePen, Trash2 } from "lucide-react";
import { AddLink } from "@/components/Link";
import { PATHS, propertyEditPath, propertyPath } from "@/Utils/paths";
import { CustomTable, type TableColumn } from "@/components/CustomTable";
import { StatusBadge } from "@/components/Badge";
import { DropdownMenu } from "@/components/DropdownMenu";
import { PageHeader } from "@/components/Header/PageHeader";
import { Property } from "@/types/property";
import { usePropertyDetailsStore } from "@/stores/propertyDetailsStore";
import Modal from "@/components/Modal";
import PropertyLeftColumn from "@/components/Property/PropertyLeftColumn";
import ConfirmDialog from "@/components/ConfirmDialog";
import Image from "next/image";

// --- SVG Icons ---
const PlusIcon = () => (
  <Plus className="w-5 h-5" />
);

const PropertyIcon = () => (
  <svg className="w-8 h-8 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

// --- Loading skeleton ---
const TableSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex justify-between">
      {/* <div className="space-y-2">
        <div className="h-7 w-44 bg-gray-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-60 bg-gray-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="h-10 w-36 bg-gray-200 dark:bg-slate-800 rounded-xl" /> */}
    </div>
    <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
      <div className="h-12 bg-gray-100 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800" />
      {(['row-1', 'row-2', 'row-3'] as const).map((row) => (
        <div key={row} className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
          <div className="h-5 flex-1 bg-gray-200 dark:bg-slate-800 rounded" />
          <div className="h-5 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 dark:bg-slate-800 rounded" />
          <div className="h-5 w-12 bg-gray-200 dark:bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  </div>
);

// --- Empty state ---
const EmptyState = () => (
  <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-12 text-center transition-colors">
    <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <PropertyIcon />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties yet</h3>
    <p className="text-gray-500 dark:text-slate-400 mb-6">Start by adding your first property listing</p>
    <AddLink
      to={PATHS.newProperty}
      Icon={PlusIcon}
      text="Add Your First Property"
    />
  </div>
);

// --- Column definitions ---
function buildPropertyColumns(onDelete: (p: Property) => void): TableColumn<Property>[] {
  return [
    {
      key: "property",
      header: "Property",
      render: (p) => (
        <>
          <p className="text-sm font-medium text-gray-900 dark:text-white max-w-65 truncate">{p.title}</p>
          <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5 max-w-70 truncate">{p.address}</p>
        </>
      ),
    },
    {
      key: "photo",
      header: "Photo",
      render: (p) => {
        const photo = p.photos?.[0]?.photo;
        return (
          <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 shrink-0">
            {photo ? (
              <Image
                src={photo}
                alt={p.title}
                fill
                className="object-cover rounded-lg"
                sizes="100vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PropertyIcon />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (p) => <StatusBadge status={p.status || "active"} />,
    },
    {
      key: "price",
      header: "Price",
      render: (p) => (
        <p className="text-sm text-gray-900 dark:text-white">
          {formatPrice(p.price, p.country, p.currency)}
        </p>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (p) => (
        <p className="text-sm text-gray-500 dark:text-slate-400 capitalize">{p.propertyType}</p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (p) => (
        <div role="none" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <DropdownMenu
            triggerLabel={<Ellipsis size={18} />}
            menuList={[
              {
                label: "View",
                icon: <Eye className="text-white size-3.5" />,
                href: propertyPath(p.propertyCode),
                linkClassName: "text-sm font-medium",
              },
              {
                label: "Edit",
                icon: <SquarePen className="text-white size-3.5" />,
                href: propertyEditPath(p.propertyCode),
                linkClassName: "text-sm font-medium",
              },
              {
                label: "Delete",
                icon: <Trash2 className="size-3.5 text-inherit" />,
                onClick: () => onDelete(p),
                itemClassName: "text-sm font-medium text-red-600 hover:text-white",
              },
            ]} />
        </div>
      ),
    },
  ];
}

export default function MyPropertiesPage() {
  const {
    agency: storedAgency, agencyFetched, setAgency,
    properties: storedProperties, propertiesFetched, setProperties, invalidateProperties,
  } = useDashboardStore();

  const { selectedProperty, setSelectedProperty, clearSelectedProperty } = usePropertyDetailsStore();

  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  const { data: agencyData, loading: agencyLoading, error: agencyError, refetch: refetchAgency } = useQuery(GET_USER_AGENCY, {
    skip: agencyFetched,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (agencyData?.getUserAgency) setAgency(agencyData.getUserAgency);
  }, [agencyData, setAgency]);

  const agencyId = storedAgency?.id ?? agencyData?.getUserAgency?.id;

  const {
    data: propertiesData,
    loading: propertiesLoading,
    error,
    refetch: refetchProperties,
  } = useQuery(GET_AGENCY_PROPERTIES_WITH_DESCRIPTION, {
    variables: { agencyId, offset: 0, limit: 50 },
    skip: !agencyId,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (propertiesData?.getAgencyProperties?.properties) {
      setProperties(propertiesData.getAgencyProperties.properties);
    }
  }, [propertiesData, setProperties]);

  const [deleteProperty, { loading: deleting }] = useMutation(DELETE_PROPERTY, {
    onCompleted: () => {
      invalidateProperties();
      refetchProperties();
      setPropertyToDelete(null);
    },
  });

  const propertyColumns = buildPropertyColumns(setPropertyToDelete);

  const loading = (!agencyFetched && agencyLoading) || (!propertiesFetched && propertiesLoading);

  if (agencyError) return <ErrorHandler error={agencyError} showBackButton={false} onRetry={() => { refetchAgency(); }} />;
  if (error) return <ErrorHandler error={error} showBackButton={false} onRetry={() => refetchProperties()} />;

  const properties = storedProperties.length > 0 ? storedProperties : (propertiesData?.getAgencyProperties?.properties ?? []);

  let content: React.ReactNode;
  if (loading) {
    content = <TableSkeleton />;
  } else if (properties.length > 0) {
    content = (
      <CustomTable
        columns={propertyColumns}
        data={properties}
        keyExtractor={(p) => p.id}
        pageSize={10}
        itemLabel="properties"
        onRowClick={setSelectedProperty}
      />
    );
  } else {
    content = <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="My Properties" description="Manage your property listings"
        onRefresh={() => { invalidateProperties(); refetchProperties(); }}
        isRefreshing={loading}
      >
        <AddLink
          to={PATHS.newProperty}
          Icon={PlusIcon}
          text="Add Property"
        />
      </PageHeader>
      {content}
      <ConfirmDialog
        open={!!propertyToDelete}
        onOpenChange={(open) => { if (!open) setPropertyToDelete(null); }}
        title="Delete property"
        description={`Are you sure you want to delete "${propertyToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={() => {
          if (propertyToDelete) deleteProperty({ variables: { id: propertyToDelete.id } });
        }}
      />
      <Modal
        open={!!selectedProperty}
        onOpenChange={(open) => {
          if (!open) {
            clearSelectedProperty();
            setCurrentImage(0);
            setIsSaved(false);
            setShowShareMenu(false);
          }
        }}
        title={selectedProperty?.title ?? ""}
        className="max-w-4xl"
        bodyClassName="py-2"
      >
        {selectedProperty && (
          <PropertyLeftColumn
            property={selectedProperty}
            photos={selectedProperty.photos ?? []}
            currentImage={currentImage}
            numberOfPhotos={selectedProperty.photos?.length ?? 0}
            isSaved={isSaved}
            showShareMenu={showShareMenu}
            toggleGallery={() => {}}
            toggleSaved={() => setIsSaved((s) => !s)}
            toggleShareMenu={() => setShowShareMenu((s) => !s)}
            prevImage={() => setCurrentImage((i) => (i - 1 + (selectedProperty.photos?.length ?? 1)) % (selectedProperty.photos?.length ?? 1))}
            nextImage={() => setCurrentImage((i) => (i + 1) % (selectedProperty.photos?.length ?? 1))}
            setCurrentImage={setCurrentImage}
            formatPrice={formatPrice}
            canViewLargeImage={false}
          />
        )}
      </Modal>
    </div>
  );
}

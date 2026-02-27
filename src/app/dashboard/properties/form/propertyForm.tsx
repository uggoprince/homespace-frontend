'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Country, State } from 'country-state-city';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/Input/FormInput';
import { FormTextarea } from '@/components/Input/FormTextarea';
import { FormCombobox, type ComboboxOption } from '@/components/Input/FormCombobox';
import { FormSelect } from '@/components/Input/FormSelect';
import { FormSegmentedControl } from '@/components/Input/FormSegmentedControl';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/ConfirmDialog';
import { usePropertyForm } from '@/hooks/property/usePropertyForm';
import type { Property } from '@/types/property';
import { CircleDollarSign, InfoIcon, MapPin } from 'lucide-react';
import { PropertyIcon } from '@/components/SVG/icons';
import { PATHS } from '@/Utils/paths';
import { PhotosSection } from './PhotosSection';
import { BATHROOM_OPTIONS, BEDROOM_OPTIONS, rentPeriods, propertyTypesList } from '@/Utils/constants';

interface PropertyFormProps {
  mode?: 'create' | 'edit';
  propertyData?: Property | null;
}

const countryOptions: ComboboxOption[] = Country.getAllCountries().map((c) => ({
  value: c.name,
  label: c.name,
}));

function getCurrencySymbol(code: string): string {
  try {
    return new Intl.NumberFormat('en', {
      style: 'currency', currency: code,
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(0).replaceAll(/[\d,.\s]/g, '').trim();
  } catch {
    return code;
  }
}

const _currencyCodes: string[] = (() => {
  try {
    return Intl.supportedValuesOf('currency');
  } catch {
    const seen = new Set<string>();
    return Country.getAllCountries()
      .filter((c) => c.currency && !seen.has(c.currency) && seen.add(c.currency))
      .map((c) => c.currency)
      .sort();
  }
})();

const currencyOptions: ComboboxOption[] = _currencyCodes.map((code) => ({
  value: code,
  label: `${code} (${getCurrencySymbol(code)})`,
}));

const propertyTypeOptions: ComboboxOption[] = propertyTypesList.map((t) => ({ value: t, label: t }));


export default function PropertyForm({ mode = 'create', propertyData = null }: Readonly<PropertyFormProps>) {
  const {
    form, onSubmit, loading,
    photos, setPhotos, photoError, setPhotoError,
    photoLoading, handleAddPhotos, handleUpdatePhoto, handleDeletePhoto,
  } = usePropertyForm(mode, propertyData);

  const [pendingDeleteId, setPendingDeleteId] = React.useState<string | null>(null);

  const intent = form.watch('intent');
  const selectedCountry = form.watch('country');
  const selectedCurrency = form.watch('currency');
  const currencySymbol = getCurrencySymbol(selectedCurrency);

  const stateOptions: ComboboxOption[] = useMemo(() => {
    if (!selectedCountry) return [];
    const country = Country.getAllCountries().find((c) => c.name === selectedCountry);
    if (!country) return [];
    return State.getStatesOfCountry(country.isoCode).map((s) => ({
      value: s.name,
      label: s.name,
    }));
  }, [selectedCountry]);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/properties"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'create' ? 'Add New Property' : 'Edit Property'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {mode === 'create' ? 'List a new property on HomeSpace' : 'Update property details'}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">

          {/* Basic Information */}
          <section className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
            <SectionHeading icon="info">Basic Information</SectionHeading>
            <div className="space-y-5">
              <FormInput
                control={form.control}
                name="title"
                label="Property Title"
                placeholder="e.g. Luxury 4 Bedroom Duplex with Pool"
                required
                disabled={loading}
              />
              <FormTextarea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Describe the property in detail — features, amenities, location highlights..."
                required
                rows={5}
                disabled={loading}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormCombobox
                  control={form.control}
                  name="propertyType"
                  label="Property Type"
                  placeholder="Select type..."
                  searchPlaceholder="Search types..."
                  emptyMessage="No type found."
                  options={propertyTypeOptions}
                  required
                  disabled={loading}
                />
                <FormSegmentedControl
                  control={form.control}
                  name="intent"
                  label="Listing Type"
                  disabled={loading}
                  options={[
                    { value: 'sale', label: 'For Sale', activeClassName: 'bg-emerald-600 text-white' },
                    { value: 'rent', label: 'For Rent', activeClassName: 'bg-blue-600 text-white' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
            <SectionHeading icon="location">Location</SectionHeading>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormCombobox
                  control={form.control}
                  name="country"
                  label="Country"
                  placeholder="Select country..."
                  searchPlaceholder="Search countries..."
                  emptyMessage="No country found."
                  options={countryOptions}
                  disabled={loading}
                  onValueChange={() => form.setValue('state', '')}
                />
                <FormCombobox
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="Select state..."
                  searchPlaceholder="Search states..."
                  emptyMessage={selectedCountry ? 'No state found.' : 'Select a country first.'}
                  options={stateOptions}
                  disabled={loading || !selectedCountry}
                  required
                />
              </div>
              <FormInput
                control={form.control}
                name="address"
                label="Full Address"
                placeholder="e.g. 20, Admiralty Way, Lekki Phase 1"
                required
                disabled={loading}
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
            <SectionHeading icon="price">Pricing</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormCombobox
                control={form.control}
                name="currency"
                label="Currency"
                placeholder="Select currency..."
                searchPlaceholder="Search currencies..."
                emptyMessage="No currency found."
                options={currencyOptions}
                required
                disabled={loading}
              />
              <FormInput
                control={form.control}
                name="price"
                label="Price"
                type="number"
                placeholder="0.00"
                prefix={currencySymbol}
                required
                disabled={loading}
              />
              {intent === 'rent' && (
                <FormSelect
                  control={form.control}
                  name="rentPaymentPeriod"
                  label="Payment Period"
                  placeholder="Select period"
                  options={rentPeriods}
                  disabled={loading}
                />
              )}
            </div>
          </section>

          {/* Property Details */}
          <section className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
            <SectionHeading icon="home">Property Details</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <FormSelect
                control={form.control}
                name="bedRooms"
                label="Bedrooms"
                placeholder="-"
                options={BEDROOM_OPTIONS.map((n) => ({ value: n, label: n === '9' ? '9+' : n }))}
                disabled={loading}
              />
              <FormSelect
                control={form.control}
                name="bathRooms"
                label="Bathrooms"
                placeholder="-"
                options={BATHROOM_OPTIONS.map((n) => ({ value: n, label: n === '7' ? '7+' : n }))}
                disabled={loading}
              />
              <FormInput
                control={form.control}
                name="area"
                label="Area (sqft)"
                placeholder="e.g. 2500"
                disabled={loading}
              />
              <FormInput
                control={form.control}
                name="units"
                label="Units"
                type="number"
                disabled={loading}
              />
            </div>
            <div className="mt-5">
              <FormSegmentedControl
                control={form.control}
                name="postedBy"
                label="Posted By"
                required
                disabled={loading}
                options={[
                  { value: 'owner', label: 'Owner', activeClassName: 'bg-emerald-600 text-white' },
                  { value: 'agent', label: 'Agent', activeClassName: 'bg-blue-600 text-white' },
                ]}
              />
            </div>
          </section>

          <PhotosSection
            mode={mode}
            photos={photos}
            setPhotos={setPhotos}
            photoError={photoError}
            setPhotoError={setPhotoError}
            photoLoading={photoLoading}
            handleAddPhotos={handleAddPhotos}
            handleUpdatePhoto={handleUpdatePhoto}
            setPendingDeleteId={setPendingDeleteId}
          />

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
            <Link
              href={PATHS.dashboardProperties}
              className="w-full sm:w-auto px-6 py-2 text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors text-center text-sm"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={loading} loading={loading} className="w-full sm:w-auto cursor-pointer">
              {mode === 'create' ? 'Create Property' : 'Save Changes'}
            </Button>
          </div>

        </form>
      </Form>
      <ConfirmDialog
        open={!!pendingDeleteId}
        onOpenChange={(open) => { if (!open) setPendingDeleteId(null); }}
        title="Delete photo?"
        description="This will permanently remove the photo. This action cannot be undone."
        confirmLabel="Delete"
        loading={photoLoading}
        onConfirm={() => {
          if (pendingDeleteId) {
            handleDeletePhoto(pendingDeleteId);
            setPendingDeleteId(null);
          }
        }}
      />
    </div>
  );
}

// --- Sub-components ---

type IconType = 'info' | 'location' | 'price' | 'home';

const sectionIconsClassName = "w-5 h-5 text-indigo-600 dark:text-indigo-400";

const sectionIcons: Record<IconType, React.ReactNode> = {
  info: (
    <InfoIcon className={sectionIconsClassName} />
  ),
  location: (
    <MapPin className={sectionIconsClassName} />
  ),
  price: (
    <CircleDollarSign className={sectionIconsClassName} />
  ),
  home: (
    <PropertyIcon className={sectionIconsClassName} />
  ),
  // photo: (
  //   <PhotoIcon className={sectionIconsClassName} />
  // ),
};

function SectionHeading({ icon, children }: Readonly<{ icon: IconType; children: React.ReactNode }>) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
      {sectionIcons[icon]}
      {children}
    </h2>
  );
}


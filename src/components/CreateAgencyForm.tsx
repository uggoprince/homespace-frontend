"use client"

import { useMemo } from "react"
import { Country, State } from "country-state-city"
import { CustomForm } from "@/components/Form"
import { Group } from "@/components/Form/group"
import { FormInput } from "@/components/Input/FormInput"
import { FormTextarea } from "@/components/Input/FormTextarea"
import { FormCombobox, ComboboxOption } from "@/components/Input/FormCombobox"
import { Button } from "@/components/ui/button"
import { useCreateAgencyForm } from "@/hooks/agency/useCreateAgencyForm"

const countryOptions: ComboboxOption[] = Country.getAllCountries().map((c) => ({
  value: c.isoCode,
  label: c.name,
}))

export function CreateAgencyForm({ onSuccess }: { onSuccess?: () => void }) {
  const { form, onSubmit, loading } = useCreateAgencyForm(onSuccess)
  const control = form.control
  const selectedCountry = form.watch("country")

  const stateOptions: ComboboxOption[] = useMemo(() => {
    if (!selectedCountry) return []
    return State.getStatesOfCountry(selectedCountry).map((s) => ({
      value: s.isoCode,
      label: s.name,
    }))
  }, [selectedCountry])

  return (
    <CustomForm {...form} onSubmit={onSubmit} className="max-w-170">
      <div className="w-full overflow-y-auto flex flex-col gap-4 pr-1 xl:p-0 max-h-50 lg:max-h-75 xl:max-h-100 mb-1">
        <Group>
          <FormInput control={control} name="name" label="Name" required className="w-[97%]" disabled={loading} />
          <FormInput control={control} name="username" label="@Username" required className="w-[97%]" disabled={loading} />
        </Group>
        <FormTextarea control={control} name="about" label="About" required disabled={loading} rows={3} className="w-[99%]" />
        <Group>
          <FormCombobox
            control={control}
            name="country"
            label="Country"
            placeholder="Select country..."
            searchPlaceholder="Search countries..."
            emptyMessage="No country found."
            options={countryOptions}
            required
            className="w-[97%]"
            disabled={loading}
            onValueChange={() => form.setValue("state", "")}
          />
          <FormCombobox
            control={control}
            name="state"
            label="State"
            placeholder="Select state..."
            searchPlaceholder="Search states..."
            emptyMessage={selectedCountry ? "No state found." : "Select a country first."}
            options={stateOptions}
            required
            className="w-[97%]"
            disabled={loading || !selectedCountry}
          />
        </Group>
        <Group>
          <FormInput control={control} name="address" label="Address" required className="w-[97%]" disabled={loading} />
          <FormInput control={control} name="phoneNumber" label="Phone Number" required className="w-[97%]" disabled={loading} />
        </Group>
        <FormInput control={control} name="email" label="Email" type="email" className="w-[99%]" disabled={loading} />
        <Group>
          <FormInput control={control} name="whatsapp" label="WhatsApp Number" className="w-[97%]" disabled={loading} />
          <FormInput control={control} name="facebook" label="Facebook" className="w-[97%]" disabled={loading} />
        </Group>
        <Group>
          <FormInput control={control} name="instagram" label="Instagram" className="w-[97%]" disabled={loading} />
          <FormInput control={control} name="twitter" label="Twitter" className="w-[97%]" disabled={loading} />
        </Group>
      </div>
      <Button type="submit" disabled={loading} loading={loading}>Create Agency</Button>
    </CustomForm>
  )
}

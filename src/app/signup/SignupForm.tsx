"use client"

import { useMemo } from "react";
import { Country, State } from "country-state-city";
import { CustomForm } from "@/components/Form";
import { Group } from "@/components/Form/group";
import { FormInput } from "@/components/Input/FormInput";
import { FormCombobox, ComboboxOption } from "@/components/Input/FormCombobox";
import { Button } from "@/components/ui/button";
import { useSignupForm } from "@/hooks/user/useSignupForm";

const countryOptions: ComboboxOption[] = Country.getAllCountries().map((c) => ({
  value: c.isoCode,
  label: c.name,
}));

export function SignupForm() {
  const { form, onSubmit, loading } = useSignupForm();
  const control = form.control;
  const selectedCountry = form.watch("country");

  const stateOptions: ComboboxOption[] = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry).map((s) => ({
      value: s.isoCode,
      label: s.name,
    }));
  }, [selectedCountry]);

  return (
    <div className="container flex flex-col justify-around h-full">
      <CustomForm {...form} onSubmit={onSubmit} className="max-w-170">
        <div className="w-full">
          <span>Create Account</span>
        </div>
        <div className="w-full overflow-y-auto flex flex-col gap-4 pr-1 xl:p-0 max-h-50 lg:max-h-75 xl:max-h-100 mb-1">
          <Group>
            <FormInput
              control={control}
              name="firstname"
              label="First Name"
              required
              className="w-[97%]"
            />
            <FormInput control={control} name="lastname" label="Last Name" required className="w-[97%]" />
          </Group>
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
          <FormInput control={control} name="address" label="Address" type="text" required className="w-[99%]" />
          <FormInput control={control} name="email" label="Email" type="email" autoComplete="email" required className="w-[99%]" />
          <Group>
            <FormInput control={control} name="password" type="password" label="Password" required className="w-[97%]" />
            <FormInput control={control} name="confirmPassword" type="password" label="Confirm Password" required className="w-[97%]" />
          </Group>
        </div>
        <Button id="signupButton" type="submit" disabled={loading} loading={loading}>Sign Up</Button>
      </CustomForm>
    </div>
  );
}

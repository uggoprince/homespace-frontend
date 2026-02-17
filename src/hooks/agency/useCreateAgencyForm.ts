import { useMutation } from "@apollo/client"
import { Country, State } from "country-state-city"
import { createAgencySchema } from "@/schemas/createAgencySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { CREATE_AGENCY } from "@/lib/graphql/agency"
import { useAuth } from "@/providers/AuthProvider"
import { showToast } from "@/components/Toast"
import { updateLocalStorage } from "@/lib/localStorage"
import { useRouter } from "next/navigation"

type CreateAgencyFormValues = z.infer<typeof createAgencySchema>

export const useCreateAgencyForm = (onSuccess?: () => void) => {
  const auth = useAuth()
  const router = useRouter()

  const form = useForm<CreateAgencyFormValues>({
    resolver: zodResolver(createAgencySchema),
    defaultValues: {
      name: "",
      username: "",
      about: "",
      country: "",
      state: "",
      address: "",
      phoneNumber: "",
      email: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      twitter: "",
    },
  })

  const [createAgency, { loading }] = useMutation(CREATE_AGENCY, {
    errorPolicy: "all",
    onCompleted: () => {
      updateLocalStorage("user", { profile: { hasAgency: true } })
      auth?.updateUser()
      showToast("Agency created successfully!", "success")
      onSuccess?.()
      router.push("/dashboard/agency")
    },
    onError: (error) => {
      if (error.networkError) {
        showToast("Network error. Try again.", "error")
        return
      }

      if (error.graphQLErrors?.length) {
        const gqlError = error.graphQLErrors[0]
        showToast(gqlError.message || "Failed to create agency.", "error")

        const fieldErrors = (gqlError as unknown as Record<string, unknown>).error as Record<string, string> | undefined
        if (fieldErrors) {
          for (const [field, message] of Object.entries(fieldErrors)) {
            if (field in form.getValues()) {
              form.setError(field as keyof CreateAgencyFormValues, { message })
            }
          }
        }
        return
      }

      showToast(error.message || "Failed to create agency.", "error")
    },
  })

  function onSubmit({ country, state, ...values }: CreateAgencyFormValues) {
    const countryName = Country.getCountryByCode(country)?.name ?? country
    const stateName = State.getStateByCodeAndCountry(state, country)?.name ?? state
    createAgency({ variables: { ...values, country: countryName, state: stateName } })
  }

  return { form, onSubmit, loading }
}

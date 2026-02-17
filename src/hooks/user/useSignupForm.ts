import { useMutation } from "@apollo/client"
import { Country, State } from "country-state-city"
import { signupFormSchema } from "@/schemas/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { SIGNUP_USER_QUERY_STRING } from "@/lib/graphql/user"
import { useAuth } from "@/providers/AuthProvider"
import { showToast } from "@/components/Toast"

type SignupFormValues = z.infer<typeof signupFormSchema>

export const useSignupForm = () => {
  const auth = useAuth()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { firstname: "", lastname: "", country: "", state: "", address: "", email: "", password: "", confirmPassword: "" },
  })

  const [signUp, { loading }] = useMutation(SIGNUP_USER_QUERY_STRING, {
    errorPolicy: "all",
    onCompleted: (data) => {
      const { token, user } = data.signUp
      auth?.loginUser(token, user)
      showToast("Account created!", "success")
    },
    onError: (error) => {
      if (error.networkError) {
        showToast("Network error. Try again.", "error")
        return
      }

      if (error.graphQLErrors?.length) {
        const gqlError = error.graphQLErrors[0]
        showToast(gqlError.message || "Signup failed.", "error")

        const fieldErrors = (gqlError as unknown as Record<string, unknown>).error as Record<string, string> | undefined
        if (fieldErrors) {
          for (const [field, message] of Object.entries(fieldErrors)) {
            if (field in form.getValues()) {
              form.setError(field as keyof SignupFormValues, { message })
            }
          }
        }
        return
      }

      showToast(error.message || "Signup failed. Please try again.", "error")
    },
  })

  function onSubmit({ confirmPassword: _, country, state, ...values }: SignupFormValues) {
    const countryName = Country.getCountryByCode(country)?.name ?? country
    const stateName = State.getStateByCodeAndCountry(state, country)?.name ?? state
    signUp({ variables: { ...values, country: countryName, state: stateName } })
  }

  return { form, onSubmit, loading }
}
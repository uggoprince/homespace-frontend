import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { loginFormSchema } from "@/schemas"
import { LOGIN_USER_QUERY_STRING } from "@/lib/graphql/user"
import { useAuth } from "@/providers/AuthProvider"
import { showToast } from "@/components/Toast"

type LoginFormValues = z.infer<typeof loginFormSchema>

export const useLoginForm = () => {
  const auth = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  const [login, { loading }] = useMutation(LOGIN_USER_QUERY_STRING, {
    errorPolicy: "all",
    onCompleted: (data) => {
      const { token, user } = data.login
      auth?.loginUser(token, user)
      showToast("Login successful", "success")
    },
    onError: (error) => {
      const message = error.graphQLErrors?.[0]?.message
        || error.message
        || "Login failed. Please try again."
      showToast(message, "error")
    },
  })

  function onSubmit(values: LoginFormValues) {
    login({ variables: values })
  }

  return { form, onSubmit, loading }
}

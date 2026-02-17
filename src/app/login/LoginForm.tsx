"use client"

import { CustomForm } from "@/components/Form"
import { FormInput } from "@/components/Input/FormInput"
import { Button } from "@/components/ui/button"
import { useLoginForm } from "@/hooks/user/useLoginForm"

export function LoginForm() {
  const { form, onSubmit, loading } = useLoginForm();

  return (
    <div className="container flex flex-col justify-around h-full px-16">
      <CustomForm {...form} onSubmit={onSubmit} className="max-w-120">
        <div className="w-full">
          <span>Login</span>
        </div>
        <div className="w-full overflow-y-auto flex flex-col gap-4 py-3">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            required
            disabled={loading}
          />
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            required
            disabled={loading}
          />
        </div>
            
        <Button id="loginButton"
          className="cursor-pointer"
          type="submit" 
          disabled={loading}
          loading={loading}>
            Login
        </Button>
      </CustomForm>
    </div>
  )
}

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import rocket from "../../../assets/rocket.png"
import google from "../../../assets/google.svg"
import facebook from "../../../assets/facebook.svg"
import SocialButton from "../components/SocialButton"
import Input from "../components/Input"
import { useLogin } from "../../../hooks/useAuth"

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const loginUser = useLogin()
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    setServerError(null)
    loginUser.mutate(formData, {
      onError: (err: any) => {
        setServerError(err?.message || "Server error")
      }
    })
  }

  return (
    <div className="h-[100vh] w-[100vw] bg-[var(--color-background)]">
      <div className="h-[64px]"></div>
      <div className="m-auto max-w-[520px] pt-[10px] items-center text-center">
        <div className="relative py-[var(--spacing-2xl)] px-[var(--spacing-2xl)] border-[var(--border-width-normal)] border-[var(--color-border)] w-full rounded-[var(--border-radius-md)] bg-[var(--color-background)]">
          <div className="flex header text-left mb-4">
            <h1 className="leading-[46px] text-[var(--font-size-4xl)] font-bold max-w-[278px] mb-4 text-[var(--color-text-primary)]">
              Login
            </h1>
            <img
              className="absolute top-[22px] right-[20px] w-[176px] -translate-y-[50%]"
              src={rocket || "/placeholder.svg"}
              alt="Rocket"
            />
          </div>

          <div className="social flex justify-between items-start flex-wrap">
            <SocialButton icon={google} text="Google" />
            <SocialButton icon={facebook} text="Facebook" />
          </div>

          <div className="divider flex items-center my-3">
            <hr className="w-[100%] h-[1px] border-[var(--color-border)]" />
            <span className="px-[var(--spacing-lg)] text-[var(--font-size-lg)] font-semibold text-[var(--color-text-primary)]">
              or
            </span>
            <hr className="w-[100%] h-[1px] border-[var(--color-border)]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form text-left">
            {/* Email */}
            <div className="mb-2.5">
              <label className="text-[var(--color-text-primary)] text-[var(--font-size-base)] font-bold">
                Email
              </label>
            </div>
            <div className="mb-[10px]">
              <Input {...register("email")} error={!!errors.email} />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex justify-between">
              <label className="mb-2.5 text-[var(--color-text-primary)] text-[var(--font-size-base)] font-bold">
                Password
              </label>
              <a className="hover:cursor-pointer mb-2.5 text-[var(--color-primary)] text-[var(--font-size-base)] font-bold">
                Forgot password?
              </a>
            </div>
            <div className="mb-[10px]">
              <Input {...register("password")} error={!!errors.password} isObscure />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="w-full flex justify-center my-2">
                <p className="text-red-500 text-sm font-semibold">{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              className="hover:cursor-pointer p-[var(--spacing-md)] w-full rounded-[var(--border-radius-md)] bg-[var(--color-text-primary)] text-white text-[var(--font-size-base)] font-bold hover:bg-[var(--color-primary)] transition-colors"
            >
              Login
            </button>
          </form>
        </div>

        <footer className="px-5 pb-10 pt-1.5 w-full text-[var(--color-text-secondary)]">
          Don't have an account?
          <a
            className="hover:cursor-pointer mb-2.5 text-[var(--color-primary)] text-[var(--font-size-base)] font-bold ml-1"
            href="/register"
          >
            Sign Up
          </a>
        </footer>
      </div>
    </div>
  )
}

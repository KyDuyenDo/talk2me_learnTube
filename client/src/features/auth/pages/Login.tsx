import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import rocket from "../../../assets/rocket.png"
import google from "../../../assets/google.svg"
import facebook from "../../../assets/facebook.svg"
import SocialButton from "../components/SocialButton"
import Input from "../components/Input"
import ErrorAlert from "../components/ErrorAlert"
import { useLogin } from "../../../hooks/useAuth"

const loginSchema = z.object({
  email: z.string().email("E-mail must be valid"),
  password: z.string().min(1, "Required field"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const loginUser = useLogin()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    setServerError(null)
    loginUser.mutate(formData, {
      onError: (err: any) => {
        setServerError(err?.message || "Couldn't find your account.")
      },
    })
  }

  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="h-[64px]"></div>
      <div className="m-auto max-w-[520px] pt-[10px] items-center text-center">
        <div className="relative py-[32px] px-[40px] border-2 border-[#e6e6eb] w-full rounded-sm">
          <div className="flex header text-left mb-4">
            <h1 className="leading-[46px] text-[40px] font-[900] max-w-[278px] mb-4">Login</h1>
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
            <hr className="w-[100%] h-[1px] text-gray-300" />
            <span className="px-[20px] text-[20px] font-[600]">or</span>
            <hr className="w-[100%] h-[1px] text-gray-300" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form text-left">
            <div className="mb-2.5">
              <label className="text-[#1b1f2e] text-[16px] font-[700]">Email</label>
            </div>
            <div className="mb-[10px]">
              <Input {...register("email")} error={!!errors.email} />
              <div className="h-[14px]"></div>
              {errors.email && <ErrorAlert text={errors.email.message || "Invalid email"} />}
            </div>

            <div className="flex justify-between">
              <label className="mb-2.5 text-[#1b1f2e] text-[16px] font-[700]">Password</label>
              <a className="hover:cursor-pointer mb-2.5 text-[#536dfe] text-[16px] font-[700]">Forgot password?</a>
            </div>
            <div className="mb-[10px]">
              <Input {...register("password")} error={!!errors.password} isObscure />
              <div className="h-[14px]"></div>
              {errors.password && <ErrorAlert text={errors.password.message || "Required field"} />}
            </div>

            {serverError && (
              <div className="mb-[10px]">
                <ErrorAlert text={serverError} />
              </div>
            )}

            <button
              type="submit"
              disabled={loginUser.isPending}
              className="hover:cursor-pointer p-[16px] w-full rounded-md bg-[#1b1f2e] text-amber-50 text-[16px] font-[700] hover:bg-[#536dfe]"
            >
              {loginUser.isPending ? "Loading.." : "Login"}
            </button>
          </form>
        </div>

        <footer className="px-5 pb-10 pt-1.5 w-full">
          Don't have an account?
          <a className="hover:cursor-pointer mb-2.5 text-[#536dfe] text-[16px] font-[700]" href="/register">
            {" "}
            Sign Up
          </a>
        </footer>
      </div>
    </div>
  )
}

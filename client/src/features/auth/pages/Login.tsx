import type React from "react"

import { useState, type FunctionComponent } from "react"
import rocket from "../../../assets/rocket.png"
import google from "../../../assets/google.svg"
import facebook from "../../../assets/facebook.svg"
import SocialButton from "../components/SocialButton"
import Input from "../components/Input"
import ErrorAlert from "../components/ErrorAlert"
import { useLogin } from "../../../hooks/useAuth";


const LoginPage: FunctionComponent = () => {
  const loginUser  = useLogin();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Required field"
    if (!emailRegex.test(email)) return "E-mail must be valid"
    return null
  }

  const validatePassword = (password: string) => {
    if (!password) return "Required field"
    return null
  }

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    const emailError = validateEmail(email)
    setErrors((prev) => ({ ...prev, email: emailError || undefined }))
  }

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }))
    const passwordError = validatePassword(password)
    setErrors((prev) => ({ ...prev, password: passwordError || undefined }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (touched.email) {
      const emailError = validateEmail(e.target.value)
      setErrors((prev) => ({ ...prev, email: emailError || undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (touched.password) {
      const passwordError = validatePassword(e.target.value)
      setErrors((prev) => ({ ...prev, password: passwordError || undefined }))
    }
  }

  const handleLogin = () => {
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined,
      general: !emailError && !passwordError && !email ? "Couldn't find your account." : undefined,
    })

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    if (!emailError && !passwordError) {
      loginUser.mutate(formData, {
        onSuccess: (res) => {
          if (res.error) {
            setErrors((prev)=>({...prev,  general: res.error as string }))
          } else {
            console.log(res.data)
          }
        }
      })
    }
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
          <div className="form text-left">
            <div className="mb-2.5">
              <label className="text-[var(--color-text-primary)] text-[var(--font-size-base)] font-bold">Email</label>
            </div>
            <div className="mb-[10px]">
              <Input error={!!errors.email} value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
              <div className="h-[14px]"></div>
              {errors.email && <ErrorAlert text={errors.email} />}
            </div>
            <div className="flex justify-between">
              <label className="mb-2.5 text-[var(--color-text-primary)] text-[var(--font-size-base)] font-bold">
                Password
              </label>
              <a className="hover:cursor-pointer mb-2.5 text-[var(--color-primary)] text-[var(--font-size-base)] font-bold">
                Forgot password?
              </a>
            </div>
            <div className="mb-[10px]">
              <Input
                error={!!errors.password}
                isObscure={true}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
              <div className="h-[14px]"></div>
              {errors.password && <ErrorAlert text={errors.password} />}
            </div>
            {errors.general && (
              <div className="mb-[10px]">
                <ErrorAlert text={errors.general} />
              </div>
            )}
            <div>
              <button
                onClick={handleLogin}
                className="hover:cursor-pointer p-[var(--spacing-md)] w-full rounded-[var(--border-radius-md)] bg-[var(--color-text-primary)] text-white text-[var(--font-size-base)] font-bold hover:bg-[var(--color-primary)] transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <footer className="px-5 pb-10 pt-1.5 w-full text-[var(--color-text-secondary)]">
          Don't have an account?
          <a
            className="hover:cursor-pointer mb-2.5 text-[var(--color-primary)] text-[var(--font-size-base)] font-bold ml-1"
            href="/register"
          >
            {" "}
            Sign Up
          </a>
        </footer>
      </div>
    </div>
  )
}

export default LoginPage

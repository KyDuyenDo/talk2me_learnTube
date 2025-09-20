import type React from "react"

import { useState, type FunctionComponent } from "react"
import rocket from "../../../assets/rocket.png"
import google from "../../../assets/google.svg"
import facebook from "../../../assets/facebook.svg"
import SocialButton from "../components/SocialButton"
import Input from "../components/Input"
import ErrorAlert from "../components/ErrorAlert"
import { registerUser } from "../../../api/auth/auth.service";


const RegisterPage: FunctionComponent = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({})
    const [touched, setTouched] = useState<{ name: boolean; email: boolean; password: boolean }>({
        name: false,
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

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if (!name) {
            const nameError = "Required name"
            setErrors((prev) => ({ ...prev, name: nameError || undefined }))
        }
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

    const handleRegister = () => {
        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        setErrors({
            email: emailError || undefined,
            password: passwordError || undefined,
            general: !emailError && !passwordError && !email ? "Couldn't find your account." : undefined,
        })

        registerUser(formData).then((res: any) => {
            if (res.error) {
                setErrors((prev) => ({ ...prev, general: res.error }))
            } else {
                console.log(res.data)
            }
        })

    }

    return (
        <div className="h-[100vh] w-[100vw]">
            <div className="h-[64px]"></div>
            <div className="m-auto max-w-[520px] pt-[10px] items-center text-center">
                <div className="relative py-[32px] px-[40px] border-2 border-[#e6e6eb] w-full rounded-md">
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
                    <div className="form text-left">
                        <div className="mb-2.5">
                            <label className="text-[#1b1f2e] text-[16px] font-[700]">Your Name</label>
                        </div>
                        <div className="mb-[10px]">
                            <Input error={!!errors.name} value={name} onChange={handleNameChange} />
                            <div className="h-[14px]"></div>
                            {errors.name && <ErrorAlert text={errors.name} />}
                        </div>
                        <div className="mb-2.5">
                            <label className="text-[#1b1f2e] text-[16px] font-[700]">Email</label>
                        </div>
                        <div className="mb-[10px]">
                            <Input error={!!errors.email} value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
                            <div className="h-[14px]"></div>
                            {errors.email && <ErrorAlert text={errors.email} />}
                        </div>
                        <div className="flex justify-between">
                            <label className="mb-2.5 text-[#1b1f2e] text-[16px] font-[700]">Password</label>
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
                                onClick={handleRegister}
                                className="hover:cursor-pointer p-[16px] w-full rounded-md bg-[#1b1f2e] text-amber-50 text-[16px] font-[700] hover:bg-[#8100ff]"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
                <footer className="px-5 pb-10 pt-1.5 w-full">
                    Have an account?
                    <a className="hover:cursor-pointer mb-2.5 text-[#536dfe] text-[16px] font-[700]"
                    href="/login"
                    > Log In</a>
                </footer>
            </div>
        </div>
    )
}

export default RegisterPage

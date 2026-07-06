import React, { useState } from "react"
import { Meteor } from "meteor/meteor"
import { Accounts } from "meteor/accounts-base"
import { useNavigate, Link } from "react-router-dom"
import { z } from "zod"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "/components/ui/tabs"
import { Card, CardContent } from "/components/ui/card"
import { Sparkles, ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { cn } from "/lib/utils"

// Validation schemas
const loginSchema = z.object({
  loginIdentifier: z.string().min(1, "Email or username is required"),
  loginPassword: z.string().min(1, "Password is required"),
})

const registerSchema = z.object({
  registerUsername: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  registerEmail: z.string().email("Please enter a valid email address"),
  registerPassword: z.string().min(6, "Password must be at least 6 characters"),
  registerConfirmPassword: z.string().min(1, "Please repeat your password"),
}).refine((data) => data.registerPassword === data.registerConfirmPassword, {
  message: "Passwords do not match",
  path: ["registerConfirmPassword"],
})

export const Login = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Backend errors
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form field-level validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register Form States
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setValidationErrors({})

    const validation = loginSchema.safeParse({ loginIdentifier, loginPassword })
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {}
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message
      })
      setValidationErrors(formattedErrors)
      return
    }

    setLoading(true)
    Meteor.loginWithPassword(loginIdentifier.trim(), loginPassword, (err) => {
      setLoading(false)
      if (err) {
        setError((err as any).reason || "Login failed. Please check your credentials.")
      } else {
        setSuccess("Welcome back! Redirecting...")
        setTimeout(() => navigate("/"), 1200)
      }
    })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setValidationErrors({})

    const validation = registerSchema.safeParse({
      registerUsername,
      registerEmail,
      registerPassword,
      registerConfirmPassword,
    })

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {}
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message
      })
      setValidationErrors(formattedErrors)
      return
    }

    setLoading(true)
    Accounts.createUser(
      {
        username: registerUsername.trim(),
        email: registerEmail.trim(),
        password: registerPassword,
      },
      (err) => {
        setLoading(false)
        if (err) {
          setError((err as any).reason || "Registration failed.")
        } else {
          setSuccess("Account created! Redirecting to home...")
          setTimeout(() => navigate("/"), 1200)
        }
      }
    )
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Clear specific validation errors when the user types
  const handleFieldChange = (
    field: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value)
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const handleTabChange = (val: string) => {
    setActiveTab(val as "login" | "register")
    setError("")
    setSuccess("")
    setValidationErrors({})
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-background text-foreground">
      {/* Left Column: Background image side (Hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 relative bg-muted/30 select-none overflow-hidden justify-center items-center border-r border-border/50">
        <div className="relative w-full h-full overflow-hidden shadow-[0_12px_40px_oklch(0.145_0_0_/_6%)] bg-card border border-border">
          <img
            src="/login-bg.png"
            alt="Microblogging Playground background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column: Interactive Login/Register Form container */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-background min-h-screen md:min-h-0">
        {/* Content wrapper */}
        <div className="w-full max-w-[420px] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent mb-2">
              <Sparkles className="size-5" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              {activeTab === "login" ? "Welcome back!" : "Create account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === "login" 
                ? "Sign in to catch up with the playground updates."
                : "Get your spot on the friendly bulletin board."}
            </p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="relative w-full grid grid-cols-2 p-1">
              {/* Smooth sliding active indicator background */}
              <div 
                className="absolute top-1 bottom-1 rounded-lg bg-card shadow-xs transition-all duration-300 ease-in-out"
                style={{
                  width: 'calc(50% - 4px)',
                  transform: `translateX(${activeTab === 'login' ? '0%' : '100%'})`,
                  left: '4px'
                }}
              />
              <TabsTrigger 
                value="login" 
                className="w-full z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="w-full z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Error Message Box (Backend Errors) */}
            {error && (
              <div className="p-3.5 text-xs font-semibold rounded-xl bg-destructive/10 text-destructive border border-destructive/20 animate-in fade-in-50 duration-200">
                {error}
              </div>
            )}

            {/* Success Message Box */}
            {success && (
              <div className="p-3.5 text-xs font-semibold rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400 animate-in fade-in-50 duration-200">
                {success}
              </div>
            )}

            {/* Form Content Wrapper (Fixed min-height to prevent vertical shift on layout swap) */}
            <div className="min-h-[385px] flex flex-col justify-start mt-2">
              {/* Login Tab Content */}
              <TabsContent value="login">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0 flex flex-col gap-4">
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label 
                          htmlFor="login-username" 
                          className={cn(validationErrors.loginIdentifier && "text-destructive")}
                        >
                          Email or Username
                        </Label>
                        <div className="relative">
                          <Mail className={cn(
                            "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors",
                            validationErrors.loginIdentifier && "text-destructive/70"
                          )} />
                          <Input
                            id="login-username"
                            type="text"
                            placeholder="you@example.com"
                            value={loginIdentifier}
                            onChange={(e) => handleFieldChange("loginIdentifier", e.target.value, setLoginIdentifier)}
                            className={cn(
                              "pl-10", 
                              validationErrors.loginIdentifier && "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                            )}
                            disabled={loading}
                          />
                        </div>
                        {validationErrors.loginIdentifier && (
                          <span className="text-[11px] font-bold text-destructive animate-in fade-in-50 duration-200">
                            {validationErrors.loginIdentifier}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label 
                          htmlFor="login-password"
                          className={cn(validationErrors.loginPassword && "text-destructive")}
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className={cn(
                            "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors",
                            validationErrors.loginPassword && "text-destructive/70"
                          )} />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => handleFieldChange("loginPassword", e.target.value, setLoginPassword)}
                            className={cn(
                              "pl-10 pr-10",
                              validationErrors.loginPassword && "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                            )}
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                        {validationErrors.loginPassword && (
                          <span className="text-[11px] font-bold text-destructive animate-in fade-in-50 duration-200">
                            {validationErrors.loginPassword}
                          </span>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full mt-4"
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Register Tab Content */}
              <TabsContent value="register">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0 flex flex-col gap-4">
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label 
                          htmlFor="register-username"
                          className={cn(validationErrors.registerUsername && "text-destructive")}
                        >
                          Username
                        </Label>
                        <div className="relative">
                          <User className={cn(
                            "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors",
                            validationErrors.registerUsername && "text-destructive/70"
                          )} />
                          <Input
                            id="register-username"
                            type="text"
                            placeholder="sunny_day"
                            value={registerUsername}
                            onChange={(e) => handleFieldChange("registerUsername", e.target.value, setRegisterUsername)}
                            className={cn(
                              "pl-10",
                              validationErrors.registerUsername && "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                            )}
                            disabled={loading}
                          />
                        </div>
                        {validationErrors.registerUsername && (
                          <span className="text-[11px] font-bold text-destructive animate-in fade-in-50 duration-200">
                            {validationErrors.registerUsername}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label 
                          htmlFor="register-email"
                          className={cn(validationErrors.registerEmail && "text-destructive")}
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className={cn(
                            "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors",
                            validationErrors.registerEmail && "text-destructive/70"
                          )} />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="you@example.com"
                            value={registerEmail}
                            onChange={(e) => handleFieldChange("registerEmail", e.target.value, setRegisterEmail)}
                            className={cn(
                              "pl-10",
                              validationErrors.registerEmail && "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                            )}
                            disabled={loading}
                          />
                        </div>
                        {validationErrors.registerEmail && (
                          <span className="text-[11px] font-bold text-destructive animate-in fade-in-50 duration-200">
                            {validationErrors.registerEmail}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label 
                          htmlFor="register-password"
                          className={cn(validationErrors.registerPassword && "text-destructive")}
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className={cn(
                            "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors",
                            validationErrors.registerPassword && "text-destructive/70"
                          )} />
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 6 characters"
                            value={registerPassword}
                            onChange={(e) => handleFieldChange("registerPassword", e.target.value, setRegisterPassword)}
                            className={cn(
                              "pl-10 pr-10",
                              validationErrors.registerPassword && "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                            )}
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                        {validationErrors.registerPassword && (
                          <span className="text-[11px] font-bold text-destructive animate-in fade-in-50 duration-200">
                            {validationErrors.registerPassword}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label 
                          htmlFor="register-confirm-password"
                          className={cn(validationErrors.registerConfirmPassword && "text-destructive")}
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className={cn(
                            "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors",
                            validationErrors.registerConfirmPassword && "text-destructive/70"
                          )} />
                          <Input
                            id="register-confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Repeat password"
                            value={registerConfirmPassword}
                            onChange={(e) => handleFieldChange("registerConfirmPassword", e.target.value, setRegisterConfirmPassword)}
                            className={cn(
                              "pl-10 pr-10",
                              validationErrors.registerConfirmPassword && "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                            )}
                            disabled={loading}
                          />
                        </div>
                        {validationErrors.registerConfirmPassword && (
                          <span className="text-[11px] font-bold text-destructive animate-in fade-in-50 duration-200">
                            {validationErrors.registerConfirmPassword}
                          </span>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full mt-4"
                        disabled={loading}
                      >
                        {loading ? "Creating account..." : "Register"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

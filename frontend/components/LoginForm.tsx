"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  AlertCircle,Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginForm({
    className,
    ...props

}: React.ComponentProps<"form">) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            setError("Oops! Incorrect email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={cn("flex flex-col md:gap-4 gap-6", className)} {...props} onSubmit={handleSubmit}>
              {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details to log in.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                        />
                    </div>
                </div>
               <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
               <Button type="submit" className="w-full bg-[#0066DA] text-white hover:bg-[#2684FC]" disabled={loading}>
                           {loading ? 'Logging in...' : 'Login'}
                         </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}


import SignupForm from "@/components/SignupForm"
import {  Package } from "lucide-react"


export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
     
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"> 
           <a href="/" className="flex items-center gap-2 text-2xl font-bold text-[#0066DA]">
            <div className="  flex size-6 items-center justify-center rounded-md">
             <Package className="h-10 w-10" />

            </div>
              <span className="text-2xl text-semibold ">FlipZon</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm/>
          </div>
        </div>
      </div>
       <div className="bg-muted relative hidden lg:block">
        <img
          src="/signup-bg.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-fit  p-6"
        />
      </div>
    </div>
  )
}

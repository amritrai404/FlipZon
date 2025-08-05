import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
export default function NotFound() {
    return (
        <div className="text-center min-h-svh pt-70">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-gray-600 mt-2">We couldn't find the page you're looking for.</p>
            <div className="py-2"><Link href='/'><Button><span><MoveLeft/></span> Back to Home</Button></Link></div>
        </div>
    );
}
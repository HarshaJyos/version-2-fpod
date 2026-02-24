"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error("Runtime Error:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-8">
                <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-foreground mb-4">
                Something went wrong!
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                We encountered an unexpected error while trying to process your request.
                Don't worry, our team has been notified.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={() => reset()}
                    size="lg"
                    className="w-full sm:w-auto px-8 rounded-full shadow-lg shadow-primary/20"
                >
                    Try Again
                </Button>
                <Link href="/">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 rounded-full border-border">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HardHat } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                <HardHat className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-outfit text-foreground mb-4">
                404 - Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                Oops! It looks like you've ridden off the map. We couldn't find the page you were looking for.
                Perhaps it's taking a quick 3-minute UV sanitization break?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                    <Button size="lg" className="w-full sm:w-auto px-8 rounded-full shadow-lg shadow-primary/20">
                        Return Home
                    </Button>
                </Link>
                <Link href="/distributors">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 rounded-full border-border">
                        Find Distributors
                    </Button>
                </Link>
            </div>
        </div>
    );
}

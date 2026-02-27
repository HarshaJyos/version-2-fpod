import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Terms & Conditions | Freshpod",
    description: "Terms and conditions for using Freshpod products and services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mt-12">
                <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-8">Terms and Conditions</h1>

                <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-lg">
                    <p>
                        Welcome to Freshpod. These terms and conditions outline the rules and regulations for the use of Freshpod's Website and Products.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing this website and using our products, we assume you accept these terms and conditions in full. Do not continue to use Freshpod's website or products if you do not accept all of the terms and conditions stated on this page.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Freshpod's website for personal, non-commercial transitory viewing only.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Disclaimer</h2>
                    <p>
                        The materials on Freshpod's website and the products sold are provided on an 'as is' basis. Freshpod makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Limitations</h2>
                    <p>
                        In no event shall Freshpod or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Freshpod's website, even if Freshpod or a Freshpod authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Revisions and Errata</h2>
                    <p>
                        The materials appearing on Freshpod's website could include technical, typographical, or photographic errors. Freshpod does not warrant that any of the materials on its website are accurate, complete, or current. Freshpod may make changes to the materials contained on its website at any time without notice.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Links</h2>
                    <p>
                        Freshpod has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Freshpod of the site. Use of any such linked website is at the user's own risk.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Governing Law</h2>
                    <p>
                        Any claim relating to Freshpod's website shall be governed by the laws of India without regard to its conflict of law provisions.
                    </p>

                </div>
            </div>
        </div>
    );
}

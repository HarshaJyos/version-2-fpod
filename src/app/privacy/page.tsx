import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Freshpod",
    description: "Privacy policy outlining how Freshpod collects and uses your data.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mt-12">
                <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-8">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-lg">
                    <p>
                        At Freshpod, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Freshpod and how we use it.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                    <p>
                        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                    </p>
                    <p>
                        If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                    <p>We use the information we collect in various ways, including to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                        <li>Send you emails</li>
                        <li>Find and prevent fraud</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Log Files</h2>
                    <p>
                        Freshpod follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Cookies and Web Beacons</h2>
                    <p>
                        Like any other website, Freshpod uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Third Party Privacy Policies</h2>
                    <p>
                        Freshpod's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Contact Us</h2>
                    <p>
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at hello@freshpod.in.
                    </p>

                </div>
            </div>
        </div>
    );
}

"use client";

import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter();

    return (
        <div className="w-1/2 h-full py-15">
            <div className="text-6xl font-semibold pt-8">
                Ops run on Zapier—seamless workflows, no IT bottlenecks.
            </div>
            <div className="text-2xl pt-8">
                Ops wants speed. IT wants oversight. Zapier’s AI automation
                gives everyone the best of both worlds with one place to build,
                manage, and govern workflows that power your business.
            </div>
            <div className="flex py-8 gap-4">
                <PrimaryButton
                    onClick={() => {
                        router.push("/signup");
                    }}
                    size="large"
                >
                    Get Started Free
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Hero;

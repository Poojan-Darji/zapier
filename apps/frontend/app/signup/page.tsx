"use client";
import React from "react";
import CheckFeature from "../../components/CheckFeature";
import Appbar from "../../components/Appbar";
import Input from "../../components/Input";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    return (
        <div>
            <Appbar />
            <div className="flex items-center  w-8/12 mx-auto gap-20">
                <div className="flex-1/2 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-4">
                        Join millions worldwidde who automate their work useing
                        Zapier.
                    </div>
                    <CheckFeature label="Easy setup, no coding required" />
                    <CheckFeature label="Free forever for core features" />
                    <CheckFeature label="14-day trial of premium features & apps" />
                </div>

                <div className="flex-1/2 mt-20 px-6 border rounded border-gray-300 py-4">
                    <Input type="text" label="Email" onChange={(e) => {}} />
                    <Input type="text" label="Name" onChange={(e) => {}} />
                    <Input
                        type="password"
                        label="Password"
                        onChange={(e) => {}}
                    />
                    <div className="py-3 text-sm">
                        By signing up, you agree to Zapier&apos;s terms of
                        service and privacy policy.
                    </div>
                    <div className="py-2">
                        <PrimaryButton size="small" onClick={() => {}}>
                            Get Started for Free
                        </PrimaryButton>
                    </div>
                    <div className="text-sm py-3 text-center">
                        Already have an account?
                        <span
                            className="text-[#ff4f00] cursor-pointer"
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            {" "}
                            Log In{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Appbar, CheckFeature, Input, PrimaryButton } from "../../components";

const Page = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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
                    <Input
                        type="text"
                        label="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        type="text"
                        label="Name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <Input
                        type="password"
                        label="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <div className="py-3 text-sm">
                        By signing up, you agree to Zapier&apos;s terms of
                        service and privacy policy.
                    </div>
                    <div className="py-2">
                        <PrimaryButton
                            size="small"
                            onClick={async () => {
                                const res = await axios.post(
                                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`,
                                    { name, username: email, password }
                                );
                                if (res.status === 200) {
                                    router.push("/login");
                                }
                            }}
                        >
                            Get Started for Free
                        </PrimaryButton>
                    </div>
                    <div className="text-sm pt-3 text-center">
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

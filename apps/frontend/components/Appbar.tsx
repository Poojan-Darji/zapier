"use client";
import React from "react";
import LinkButton from "./buttons/LinkButton";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";

const Appbar = () => {
    const router = useRouter();
    const path = usePathname();
    console.log("router", path);
    return (
        <div className="flex border border-gray-300 justify-between items-center px-20 py-2">
            <div className="text-xl font-extrabold">Zapier</div>
            <div className="flex">
                <div className="pr-2">
                    <LinkButton onClick={() => {}}> Contact Sales</LinkButton>
                </div>
                <div className={`${path === "/login" && "hidden"} pr-4`}>
                    <LinkButton
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        Log In
                    </LinkButton>
                </div>
                <div className={`${path === "/signup" && "hidden"}`}>
                    <PrimaryButton
                        size="small"
                        onClick={() => {
                            router.push("/signup");
                        }}
                    >
                        Sign Up
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Appbar;

"use client";
import React from "react";
import LinkButton from "./buttons/LinkButton";
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";

const Appbar = () => {
    const router = useRouter();

    return (
        <div className="flex border border-gray-300 justify-between items-center px-20 py-2">
            <div className="text-xl font-extrabold">Zapier</div>
            <div className="flex">
                <div className="pr-2">
                    <LinkButton onClick={() => {}}> Contact Sales</LinkButton>
                </div>
                <div className="pr-4">
                    <LinkButton
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        Log In
                    </LinkButton>
                </div>
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
    );
};

export default Appbar;

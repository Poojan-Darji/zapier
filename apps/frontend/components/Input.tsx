"use client";

import React from "react";

interface InputProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password";
}

const Input = ({ label, onChange, type }: InputProps) => {
    return (
        <div className="py-1">
            <div className="text-sm font-semibold pb-1 pt-2">
                * <label>{label}</label>
            </div>
            <input
                className="border rounded px-4 py-2 w-full border-gray-400 text-sm"
                type={type}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;

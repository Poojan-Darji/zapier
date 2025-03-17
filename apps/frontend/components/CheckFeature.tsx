import React from "react";

interface CheckFeatureProps {
    label: string;
}

const CheckFeature = ({ label }: CheckFeatureProps) => {
    return (
        <div className="flex py-2">
            <div className="pr-4">
                <CheckMark />
            </div>
            {label}
        </div>
    );
};

export default CheckFeature;

const CheckMark = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 bg-green-700 text-white rounded-full"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
};

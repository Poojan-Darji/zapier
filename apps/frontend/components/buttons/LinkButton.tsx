import React from "react";

interface LinkButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const LinkButton = ({ children, onClick }: LinkButtonProps) => {
    return (
        <div
            className="flex justify-center px-2 py-2 cursor-pointer hover:bg-[#ebe9df] font-normal text-sm"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default LinkButton;

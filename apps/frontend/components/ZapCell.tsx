import Image from "next/image";
import React from "react";

interface ZapCellProps {
    name: string;
    index: number;
    image?: string;
    onClick: () => void;
}

const ZapCell = ({ name, index, onClick, image }: ZapCellProps) => {
    return (
        <div
            onClick={onClick}
            className="border border-black py-8 px-8 flex justify-center w-[400px] text-xl cursor-pointer gap-3 "
        >
            {image ? (
                <div className="aspect-3/2 object-contain">
                    <Image
                        width={30}
                        height={30}
                        src={image}
                        alt="image"
                        unoptimized={true}
                        className="rounded-md"
                    />
                </div>
            ) : (
                <div className="font-bold">{index}.</div>
            )}
            <div>{name}</div>
        </div>
    );
};

export default ZapCell;

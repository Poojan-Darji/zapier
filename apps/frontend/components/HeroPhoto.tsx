import Image from "next/image";
import React from "react";

const HeroPhoto = () => {
    return (
        <div className="w-1/2 relative">
            <Image
                src={"/homepage-hero_vvpkmi.avif"}
                alt="herophoto"
                fill
                className="scale-80"
            />
        </div>
    );
};

export default HeroPhoto;

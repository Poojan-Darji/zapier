import Appbar from "../components/Appbar";
import Hero from "../components/Hero";
import HeroPhoto from "../components/HeroPhoto";

export default function Home() {
    return (
        <div className="">
            <Appbar />
            <div className="flex w-10/12 mx-auto h-[90vh] gap-2">
                <Hero />
                <HeroPhoto />
            </div>
        </div>
    );
}

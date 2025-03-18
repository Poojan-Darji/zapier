import { Appbar, Hero, HeroPhoto } from "../components";

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

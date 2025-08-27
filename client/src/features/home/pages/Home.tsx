import type { FunctionComponent } from "react";

interface HomePageProps {

}

const HomePage: FunctionComponent<HomePageProps> = () => {
    return (
        <div className="p-7">
            <div className="p-3">
                <div className="flex items-center mb-7">
                    <span className="leading-[24px] text-[24px] font-[700] text-[#1b1f2e]">Flash Card</span>
                    <a className="ml-8 text-blue-600 text-[16px] font-[700] text-center">View all</a>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default HomePage;
import type { FunctionComponent } from "react";
import UserProfile from "./UserProfile";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <header className="sticky top-0 z-50">
            <div className="box-border py-3 px-4 z-[300] h-16 block bg-white">
                <div className="flex justify-between w-full">
                    <div></div>
                    <UserProfile/>
                </div>
            </div>
        </header>
    );
}

export default Header;

import Dropdown from "./Elements/dropdown";
import FlexRowAlign from "./flexbox/FlexRowAlign";

type NavbarProps = {
    title: string;
    title2: string;
};

const Navbar = ({
    title,
    title2,
}: NavbarProps) => (
    <nav className="border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
                {title}
            </a>
            <FlexRowAlign>
                <div className="text-base font-medium text-gray-500">
                    {title2 ? title2 : ""}
                </div>
                <a href="/login" className="text-base font-medium text-gray-500 hover:text-gray-900 ml-4">
                    Logout
                </a>
            </FlexRowAlign>
        </div>
    </nav>

);

export default Navbar;

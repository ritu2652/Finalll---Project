import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const NavBar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-width flex-between padding-x padding-y bg-transparent">
        <Link href="/" className="flex-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex gap-x-4">
        <CustomButton 
         title = "Sign In"
         btnType = 'button'
         containerStyles='text-primary-blue
         rounded-full bg-white min-w-[130px]'

        />
         <CustomButton 
         title = "Contat Us"
         btnType = 'button'
         containerStyles='text-primary-blue
         rounded-full bg-white min-w-[130px]'

        />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

import React from "react";
import Navbar from "../global/Navbar";
import { useRecoilValue } from "recoil";
import { menuSelector, themeSelector, tokenSelector } from "../states/Selectors";
import { Navigate } from "react-router-dom";
import MenuList from "../global/MenuList";

type props = {
  children: React.ReactNode;
};
export default function PrivateRouteContainer({ children }: props) {
  const token = useRecoilValue(tokenSelector);
  const theme = useRecoilValue(themeSelector);
  const menu=useRecoilValue(menuSelector)

  return (
    <div>
      {token.access.length > 0 ? (
        <div>
          <Navbar />
          {menu==true?
          <MenuList/>
          :<div
            className={`!min-h-screen flex flex-col
              ${theme == "dark"
                ? "bg-gray-900 text-white"
                : "bg-gray-50 "}
            `}
          >
            <div className="pt-28 !pb-10 px-4 md:px-16">
            {children}

            </div>
          </div>}
        </div>
      ) : (
        <Navigate to={"/signin"} />
      )}
    </div>
  );
}

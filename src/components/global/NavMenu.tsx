// import React from "react";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { FaHammer } from "react-icons/fa";
import { PiNewspaperFill } from "react-icons/pi";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function NavMenu() {
  // const lang = useRecoilValue(langSelector);
  const { t } = useTranslation();

  const menusFa = [
    {
      url: "/posts",
      icon: <PiNewspaperFill fontSize={22} />,
    },
    {
      url: "/projects",
      icon: <FaHammer fontSize={22} />,
    },
    {
      url: "https://about.ammarsalahi.ir",
      icon: <BsEmojiSunglassesFill fontSize={22} />,
    },
  
  ];

  return (
    <div>
      <ul className="list-none gap-5 pt-2 flex">
        {menusFa.map((item: any, idx: number) => (
          <li className="nav-menu" key={idx} dir={t("dir")}>
            <Link to={item.url} className="flex items-center gap-1">
              {item.icon}
              {t(`menu${idx + 1}`)}
            </Link>
          </li>
        ))}
       
      </ul>
    </div>
  );
}

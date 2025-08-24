import { Button, Checkbox } from "antd";
import { Formik } from "formik";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaPaintBrush } from "react-icons/fa";
import { AiFillCode } from "react-icons/ai";
import { PiCheck, PiCodeFill } from "react-icons/pi";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { langSelector, typeSelector } from "../states/Selectors";
import { FaCheck } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft, FaRobot } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { TbWorldWww } from "react-icons/tb";
import { generalTypeAtom } from "../states/Atoms";

interface stepprops {
  next: ()=>void;
  next2:()=>void
}
export default function StepZero(props: stepprops) {
  const [types, settypes] = useRecoilState(generalTypeAtom);
  const lang = useRecoilValue(langSelector);
  const { t } = useTranslation();

  return (
    <div dir={t("dir")} className="w-full py-10">
      <p className="text-2xl pb-7 text-center">{t("title1")}</p>
      <ul className="menu w-full rounded-box [&_li>*]:rounded-full p-0">
       
        <li>
          <a
            className={
              types == "Web"
                ? "selected_step hover:bg-blue-600"
                : "unselected_step"
            }
            onClick={() => settypes("Web")}
          >
            {types == "Web" && <FaCheck fontSize={25} />}
            {t("opt01")}
            <TbWorldWww fontSize={25} />
          </a>
        </li>
         <li>
          <a
            className={
              types == "AI"
                ? "selected_step hover:bg-blue-600"
                : "unselected_step "
            }
            onClick={() => settypes("AI")}
          >
            {types == "AI" && <FaCheck fontSize={25} />}
            {t("opt02")}
            <FaRobot fontSize={25} />
          </a>
        </li>
      </ul>

      <button
        className="btn w-full bg-blue-600 text-white hover:bg-blue-600 border border-blue-600 rounded-full"
        onClick={types=="AI"?props.next2: props.next}
        disabled={types == "" && true}
      >
        {t("continue")}
        {lang == "fa" ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </div>
  );
}

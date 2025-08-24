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
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

interface stepprops {
  next: ()=>void;
  prev:()=>void;
}
export default function StepOne(props: stepprops) {
  const [types, settypes] = useRecoilState(typeSelector);
  const lang = useRecoilValue(langSelector);
  const { t } = useTranslation();

  return (
    <div dir={t("dir")} className="w-full">
       <div className="flex justify-start gap-10">
              <button
                className="btn btn-sm btn-ghost rounded-full"
                onClick={props.prev}
              >
                {lang == "en" ? <FaChevronLeft fontSize={20} /> : <FaChevronRight fontSize={20} />}
          </button>
          <p className="text-lg lg:text-2xl pb-10 ps-5 text-center">{t("title1")}</p>
        </div>
      {/* <p className="text-2xl pb-7 text-center">{t("title1")}</p> */}
      <ul className="menu w-full rounded-box [&_li>*]:rounded-full p-0">
        <li>
          <a
            className={
              types == "backend"
                ? "selected_step hover:bg-blue-600"
                : "unselected_step "
            }
            onClick={() => settypes("backend")}
          >
            {types == "backend" && <FaCheck fontSize={25} />}
            {t("opt1")}
            <AiFillCode fontSize={25} />
          </a>
        </li>
        <li>
          <a
            className={
              types == "frontend"
                ? "selected_step hover:bg-blue-600"
                : "unselected_step"
            }
            onClick={() => settypes("frontend")}
          >
            {types == "frontend" && <FaCheck fontSize={25} />}
            {t("opt2")}
            <FaPaintBrush fontSize={25} />
          </a>
        </li>
        <li>
          <a
            className={
              types == "full"
                ? "selected_step hover:bg-blue-600"
                : "unselected_step"
            }
            onClick={() => settypes("full")}
          >
            {types == "full" && <FaCheck fontSize={25} />}

            {t("opt3")}
            <PiCodeFill fontSize={25} />
          </a>
        </li>
        <li>
          <a
            className={
              types == "know"
                ? "selected_step hover:bg-blue-600"
                : "unselected_step"
            }
            onClick={() => settypes("know")}
          >
            {types == "know" && <FaCheck fontSize={25} />}
            {t("opt4")}
            <BsEmojiNeutralFill fontSize={25} />
          </a>
        </li>
      </ul>

      <button
        className="btn w-full bg-blue-600 text-white hover:bg-blue-600 border border-blue-600 rounded-full"
        onClick={props.next}
        disabled={types == "" && true}
      >
        {t("continue")}
        {lang == "fa" ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </div>
  );
}

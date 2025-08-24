import { Input, Button } from "antd";
import { Formik } from "formik";
import React from "react";
import { FaUser, FaPhone, FaHammer } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from "recoil";
import { langSelector, userSelector } from "../states/Selectors";
import { useTranslation } from "react-i18next";
import { generalTypeAtom } from "../states/Atoms";

interface stepprops {
  prev: ()=>void;
  next: ()=>void;
  prev2:()=>void;
}

export default function StepTwo(props: stepprops) {
  const [userdata, setUserdata] = useRecoilState(userSelector);
  const lang = useRecoilValue(langSelector);
  const types = useRecoilValue(generalTypeAtom);
  
  const { t } = useTranslation();

  return (
    <div dir={t("dir")}>
      <div className="flex  justify-between lg:justify-start lg:gap-10">
        <button
          className="btn btn-sm btn-ghost rounded-full"
          onClick={types=="AI"?props.prev2:props.prev}
        >
          {lang == "en" ? <FaChevronLeft fontSize={20} /> : <FaChevronRight fontSize={20} />}
        </button>
        <p className="text-base font-semibold lg:text-2xl pb-10 ps-5 text-center">{t("title2")}</p>
      </div>
      <Formik
        initialValues={{
          name: "",
          project: "",
          phone: "",
          email: "",
        }}
        onSubmit={(values) => {
          setUserdata({
            name: values.name,
            email: values.email,
            phone: values.phone,
            project: values.project,
          });
          props.next();
        }}
        validate={(values) => {
          let errors: any = {};
          if (!values.name) {
            errors.name = t("notempty");
          }
          if (!values.phone) {
            errors.phone = t("notempty");
          }
          if (!values.project) {
            errors.project = t("notempty");
          }
          return errors;
        }}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit} dir={t("dir")}>
            <label className="input input-bordered w-full flex items-center gap-5 rounded-full">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder={t("fullname")}
                value={values.name}
                name="name"
                onChange={handleChange}
              />
            </label>
            {errors?.name && (
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.name}
                </span>
              </div>
            )}
            <label className="input input-bordered mt-4 w-full flex items-center gap-5 rounded-full">
              <FaPhone />
              <input
                type="text"
                className="grow"
                placeholder={t("phone")}
                value={values.phone}
                name="phone"
                onChange={handleChange}
              />
            </label>
            {errors?.phone && (
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.phone}
                </span>
              </div>
            )}
            <label className="input input-bordered mt-4 w-full flex items-center gap-5 rounded-full">
              <MdEmail />
              <input
                type="text"
                className="grow"
                placeholder={t("email")}
                value={values.email}
                name="email"
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered mt-4 w-full flex items-center gap-5 rounded-full">
              <FaHammer />
              <input
                type="text"
                className="grow"
                placeholder={t("projname")}
                value={values.project}
                name="project"
                onChange={handleChange}
              />
            </label>
            {errors?.project && (
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.project}
                </span>
              </div>
            )}
            <button
              className="btn w-full bg-blue-600 mt-7 text-white hover:bg-blue-600 border border-blue-600 rounded-full"
              type="submit"
            >
              {t("continue")}
              {lang == "fa" ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

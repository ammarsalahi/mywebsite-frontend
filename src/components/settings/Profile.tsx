import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import bgs from "../../assets/bgs.jpg";
import { BiCheckCircle } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { PiCameraPlusFill } from "react-icons/pi";
import { TbCameraPlus } from "react-icons/tb";
import { Api } from "../api/Index";
import { USERS_ID } from "../api/Endpoints";
import { AuthConfigHeader, AuthConfigHeaderFile } from "../api/Configs";
import { message } from "antd";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { langSelector } from "../states/Selectors";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { User } from "../types";

interface userProps {
  user: User;
  token: any;
  reload: () => void;
  theme: string;
  prevload?:()=>void;
}
export default function Profile(props: userProps) {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgShow, setImgShow] = useState("");
  const imgref = useRef<HTMLInputElement>(null);
  const lang = useRecoilValue(langSelector);
  const { t } = useTranslation();
  message.config({
    top: document.documentElement.clientHeight - 100,
  });

  const handleOpenFile = () => {
    imgref.current?.click();
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImgFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgShow(objectUrl);
    }
  };

  return (
    <div className="md:px-28">
      <div className="flex justify-between items-center pb-5 pe-3">
                <button className="btn btn-ghost w-20 text-2xl rounded-2xl" onClick={props.prevload}>
                    {lang == "en" ? (
                      <FaChevronLeft  />
                    ) : (
                      <FaChevronRight />
                    )}
                </button>
        <p className="text-3xl text-center">{t('set1')} </p>
      </div> 
      <Formik
        initialValues={{
          firstName: props.user.first_name || "",
          lastName: props.user.last_name || "",
          userName: props.user.username,
          email: props.user.email,
          is_otp: props.user.is_otp,
        }}
        validate={(values) => {
          let errors: any = {};
          if (!values.email) {
            errors.email = t("notempy");
          }
          if (!values.userName) {
            errors.userName = t("notempty");
          }
        }}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("first_name", values.firstName);
          formData.append("last_name", values.lastName);
          formData.append("username", values.userName);
          formData.append("email", values.email);
          formData.append("is_otp", `${values.is_otp}`);
          if (imgFile != null) {
            formData.append("profile_image", imgFile);
          }

          Api.patch(USERS_ID(props.token.user), formData, {
            headers: AuthConfigHeaderFile(props.token.access),
          })
            .then((res) => {
              message.success(t("accepted"));
              props.reload();
            })
            .catch((err) => {
              message.error(t("notaccepted"));
            });
        }}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit}>
                   
            <div className="relative">
              <div className="flex justify-center pb-4 items-center gap-10">

                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    ref={imgref}
                    onChange={handleChangeImage}
                  />
                  <img
                    src={imgShow == "" ? props.user.profile_image : imgShow}
                    alt=""
                    className="rounded-[50%] w-[150px] h-[150px] border-4 border-blue-500 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={handleOpenFile}
                    // className='absolute inset-0 mt-24 me-12 btn btn-ghost text-5xl text-base-300 hover:bg-transparent '
                    className="absolute inset-0 flex gap-2 items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-[80%] text-white text-4xl font-bold pt-20 px-4 rounded-[50%]"
                  >
                    <PiCameraPlusFill
                      className={
                        props.theme == "dark" ? "text-white" : "text-gray-600"
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-5 gap-y-3">
              <div>
                <div className="label">
                  <div className="label-alt text-base">{t("firstname")}</div>
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className="input input-bordered rounded-2xl w-full"
                />
              </div>
              <div>
                <div className="label">
                  <div className="label-alt text-base">{t("lastname")}</div>
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  className="input input-bordered rounded-2xl w-full"
                />
              </div>
              <div>
                <div className="label">
                  <div className="label-alt text-base">{t("signuser")}</div>
                </div>
                <input
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  className="input input-bordered rounded-2xl w-full"
                />
                <div className="label">
                  {errors.userName && touched.userName && (
                    <div className="label-alt text-base text-red-500">
                      {errors.userName.toString()}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="label">
                  <div className="label-alt text-base">{t("profemail")}</div>
                </div>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="input input-bordered rounded-2xl w-full"
                />
                <div className="label">
                  {errors.email && touched.email && (
                    <div className="label-alt text-base text-red-500">
                      {errors.email.toString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-start items-center gap-5 px-2 pb-3">
                <input
                  type="checkbox"
                  className="toggle toggle-md checked:[--tglbg:#3b82f6] checked:border-white checked:text-white"
                  name="is_otp"
                  checked={values.is_otp}
                  onChange={handleChange}
                  // defaultChecked={values.is_otp == true}
                />
                <span className="text-base">
                  {values.is_otp == true ? t("profopt1") : t("profopt2")}
                </span>
              </div>
            </div>
            <button
              className="btn-blue rounded-2xl w-full mt-3 flex gap-2 text-base"
              type="submit"
            >
              <FaCheck />
              {t("agree")}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

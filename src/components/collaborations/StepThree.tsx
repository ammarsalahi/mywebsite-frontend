import { Button, Input } from "antd";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { PiCameraPlus } from "react-icons/pi";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiPen, PiTrash } from "react-icons/pi";
import { useRecoilValue } from "recoil";
import { typeSelector, userSelector } from "../states/Selectors";
import { Api } from "../api/Index";
import { COOPERATIONS } from "../api/Endpoints";
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

interface stepprops {
  prev: any;
}
export default function StepThree(props: stepprops) {
  const fileInput = useRef<any>(null);
  const [imgshow, setImgshow] = useState<any>("");
  const [imgfile, setImgfile] = useState<any>(null);
  const types = useRecoilValue(typeSelector);
  const userdata = useRecoilValue(userSelector);
  const { t } = useTranslation();

  const openFile = () => {
    fileInput.current.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgfile(file);
      setImgshow(URL.createObjectURL(file));
    }
  };
  return (
    <div dir={t("dir")}>
      <div className="flex justify-start gap-5">
        <button className="btn btn-sm rounded-full" onClick={props.prev}>
          {lang == "en" ? (
            <FaChevronLeft fontSize={20} />
          ) : (
            <FaChevronRight fontSize={20} />
          )}
        </button>
        <p className="text-xl pb-10 text-center">{t("title3")}</p>
      </div>
      <Formik
        initialValues={{
          text: "",
        }}
        validate={(values) => {
          let errors: any = {};
          if (!values.text) {
            errors.text = t("notempty");
          }
          return errors;
        }}
        onSubmit={(values) => {
          const data = new FormData();
          data.append("types", types);
          data.append("name", userdata.name);
          data.append("project", userdata.project);
          data.append("phone_number", userdata.phone);
          data.append("email", userdata.email);
          data.append("description", values.text);
          if (imgfile != null) {
            data.append("website_image", imgfile);
          }
          Api.post(COOPERATIONS, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              Swal.fire({
                icon: "success",
                text: t("accepted"),
                showCancelButton: false,
                confirmButtonText: "باشه",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit} dir={t("dir")}>
            <textarea
              className="textarea textarea-bordered w-full mb-5"
              placeholder={t("projdesc")}
              value={values.text}
              name="text"
              onChange={handleChange}
              rows={4}
            />
            {errors?.text && (
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.text}
                </span>
              </div>
            )}
            {imgshow == "" ? (
              <div className="dashed-card p-6 mb-5">
                <input
                  type="file"
                  hidden
                  ref={fileInput}
                  onChange={handleFileChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
                <button
                  className="btn btn-ghost text-lg"
                  type="button"
                  onClick={openFile}
                >
                  <PiCameraPlus />
                  {t("projimg")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-10 mb-5">
                <div className="pt-5">
                  <div className="p-2 cursor-pointer">
                    <PiPen fontSize={40} className="text-blue-600" />
                  </div>
                  <div className="p-2 cursor-pointer">
                    <PiTrash fontSize={40} className="text-red-600" />
                  </div>
                </div>
                <img
                  src={imgshow}
                  className="col-span-9 w-full h-36 border-2 border-gray-300 rounded-lg"
                />
              </div>
            )}
            <button
              className="btn  w-full bg-blue-600 text-white hover:bg-blue-600 border border-blue-600 rounded-full"
              type="submit"
            >
              {t("accepted")}
              <FaCheck />
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

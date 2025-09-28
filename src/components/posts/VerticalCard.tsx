import React from "react";
import { PiClock } from "react-icons/pi";
import { Api, showImage } from "../api/Index";
import { Link, useNavigate } from "react-router-dom";
import { BiBookReader, BiPencil } from "react-icons/bi";
import { FaFire, FaTrash } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { langSelector, tokenSelector } from "../states/Selectors";
import { BiCategory } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import DeleteModal from "../global/DeleteModal";
import { POSTS_ID } from "../api/Endpoints";
import { message } from 'antd';
import { Post } from "../types";

interface postProps {
  post: Post;
  reload: () => void;
  theme: string;
}

export default function VerticalCard(props: postProps) {
  let navigate = useNavigate();

  const handleEdit = (id: string) => () => {
    navigate(`/posts/edit/${id}`);
  };
  const token = useRecoilValue(tokenSelector);
  const { t } = useTranslation();
  const lang = useRecoilValue(langSelector);
  message.config({
      top: 80,
    });
    let modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
  
    const handleShowDelete=()=>{
     modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
      modalElement?.showModal();
    }
    const handleClose=()=>{
      props.reload()
      modalElement?.close()
    }

    const handleDelete=()=>{
      Api.delete(POSTS_ID(props.post.post_id)).then(()=>{
            message.success("با موفقیت حذف شد");
            props.reload()
          }).catch(()=>{
            message.error("متاسفانه مشکلی پیش آمد!")
      });
      handleClose()
    }
  return (
    <div className={`card-${props.theme} w-auto rounded-xl z-0`} dir={t("dir")}>
      <Link to={`/posts/${props.post?.post_id}`}>
        <div className="relative">
          <figure>
            <img
              src={showImage(props.post?.header_image)}
              alt="projects"
              className="h-44 w-full rounded-t-xl bg-gray-400"
            />
            <button className="btn btn-sm btn-glass z-0 flex gap-2 shadow-lg px-6  rounded-full absolute top-5 right-5 hover:bg-blue-500 hover:text-white hover:border-blue-500">
              <BiCategory />{" "}
              {lang == "fa"
                ? props.post?.category.name
                : props.post?.category.english_name}
            </button>
            {/* <span className='absolute top-5 left-5'>
                <FaFire className='text-2xl shadow-xl text-orange-500'/>
              </span> */}
          </figure>
        </div>

        <div className="card-body p-3">
          <div className="px-2">
            <h2 className="pt-3 pb-1 font-bold text-base">
              {lang == "fa" ? props.post?.title : props.post?.english_title}
            </h2>
            <div className="flex justify-between py-3 ">
              <div className="flex gap-1 items-center text-sm">
                <PiClock fontSize={18} />
                <span>{props.post?.persian_date}</span>
              </div>
              <div className="flex gap-1 items-center text-sm">
                <BiBookReader fontSize={18} />
                <span>{props.post?.reading_time}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {token.access?.length > 0 && (
        <div className="card-actions  flex justify-between py-4 px-5">
         {props.post?.post_id!=undefined && <button
            className="btn btn-ghost btn-circle btn-sm text-base text-blue-500"
            onClick={handleEdit(props.post?.post_id)}
          >
            <BiPencil className="text-xl" />
          </button>}
          <button
            className="btn btn-ghost btn-circle btn-sm text-base text-red-500"
            onClick={handleShowDelete}
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      )}
        {props.post?.english_title!=undefined &&<DeleteModal 
            type="posttype" 
            name={props.post.title} 
            engname={props.post.english_title} 
            close={handleClose} 
            delete={handleDelete}
         />}

    </div>
  );
}

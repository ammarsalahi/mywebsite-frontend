import { CgClose } from 'react-icons/cg';

import { useTranslation } from 'react-i18next';
import { FaXTwitter ,FaTelegram,FaDiscord, FaLinkedin, FaReddit} from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { message } from 'antd';



interface modalProps{
  close:()=>void;
  type:string;
  id:string;
}

export default function ShareModal(props:modalProps) {
  // const lang = useRecoilValue(langSelector);
  const {t} = useTranslation();
    message.config({
      top: 80,
    });
  const handleClose=()=>{
    props.close();
  }

  const shareUrl = `https://ammarsalahi.ir/${props.type}/${props.id}`; // آدرس پست
  const text = encodeURIComponent(`Check out this post: ${shareUrl}`);

  const links = {
    twitter: `https://twitter.com/intent/tweet?text=${text}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    reddit: `https://www.reddit.com/submit?url=${shareUrl}&title=${text}`,
    discord: `https://discord.com/channels/@me`, // دیسکورد API برای share مستقیم نداره
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      message.success(t('copied'));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <dialog id={"sharemodal"} className="modal">
      <div className="modal-box py-3">
        <div className="flex justify-between ps-5 items-center">
          <h3 className="font-bold text-lg text-center">{props.type=="posts"?t('sharepost'):t('shareproject')}</h3>
          <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
            <CgClose/>
          </button>
        </div>
        <div className='py-4 md:py-10 md:px-10 space-y-5 p-0'>
          <div className="flex flex-wrap justify-center md:justify-between gap-5 lg:gap-2">
            
            {/* Copy */}
            <button 
              onClick={handleCopy}
              className="btn btn-ghost btn-circle text-2xl"
            >
              <IoCopy size={36} />
            </button>

            {/* Twitter */}
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle text-2xl text-sky-500"
            >
              <FaXTwitter size={36}/>
            </a>

            {/* Telegram */}
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle text-2xl text-blue-600"
            >
              <FaTelegram size={36}/>
            </a>

            {/* LinkedIn */}
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle text-2xl text-blue-500"
            >
              <FaLinkedin size={36}/>
            </a>

            {/* Discord */}
            <a
              href={links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle text-2xl text-indigo-500"
            >
              <FaDiscord size={36}/>
            </a>

            {/* Reddit */}
            <a
              href={links.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle text-2xl text-orange-500"
            >
              <FaReddit size={36}/>
            </a>

          </div>
        </div>
      </div>
    </dialog>
  )
}

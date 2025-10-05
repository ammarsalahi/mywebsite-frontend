import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { FaHammer } from 'react-icons/fa'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa6";

interface navprops{
    path:string
    theme:string
}

export default function NavDropDownMenu(props:navprops) {

  
  return (
    <div>
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
         <FaAngleDown/>
             منو
        </div>
        <ul tabIndex={0} className={props.theme=="dark"?"drop-items bg-gray-900 text-white":
            props.path!=="/"?"drop-items bg-white text-black":"drop-items bg-blue-500 text-white"}>
            <li>
            <Link to="/posts" className='flex items-center gap-2'>
            <PiNewspaperFill fontSize={22} />
            پست‌ها</Link>
            </li>
            <li>
            <Link to="/projects" className='flex items-center gap-2'>
            <FaHammer fontSize={22} />
            پروژه‌ها</Link>
            </li>
            <li>
            <Link to="https://about.ammarsalahi.ir" className='flex items-center gap-2'>
            <BsEmojiSunglassesFill fontSize={22}  />
            درباره‌ی من </Link>
            </li>
            {/* <li>
            <Link to="/cooperations" className='flex items-center gap-2'>
            <FaHandshake fontSize={23}/>
            درخواست همکاری </Link>
            </li> */}
        </ul>
        </div>
    </div>
  )
}

import { useParams } from 'react-router-dom'
import EditPost from '../posts/EditPost'
import AddPost from '../posts/AddPost'
import { useRecoilValue } from 'recoil'
import { themeSelector } from '../states/Selectors'

export default function AddEditPost() {
  let {id}:any=useParams()
  const theme=useRecoilValue(themeSelector)
  
  return (
    <div>
      {id?
        <EditPost id={id} theme={theme}/>
        :
        <AddPost theme={theme}/>
      }
    </div>
  )
}

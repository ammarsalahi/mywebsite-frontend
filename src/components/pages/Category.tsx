import { useRecoilValue } from 'recoil'
import { themeSelector } from '../states/Selectors'
import CategoryList from '../categories/CategoryList';


export default function CategoryPage() {
  const theme=useRecoilValue(themeSelector);

  return (
    <div>
      <CategoryList theme={theme}/>
    </div>
  )
}

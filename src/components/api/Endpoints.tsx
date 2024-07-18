import { BASE_URL } from "./Index"

const _=(url:string)=>{
    return `${BASE_URL}${url}`
}

export const POSTS=_('/contents/posts')

export const POSTS_ID=(post_id:any)=>_(`/contents/posts/${post_id}`)

export const POSTS_DETAIL_ID=(post_id:any)=>_(`/contents/post-detail/${post_id}`)

export const PROJECTS=_('/contents/projects')

export const PROJECTS_ID=(project_id:any)=>_(`/contents/projects/${project_id}`)

export const PROJECT_DETAIL_ID=(project_id:any)=>_(`/contents/project-detail/${project_id}`)

export const CATEGORIES=_('/contents/categories')

export const CATEGORIES_ID=(name:any)=>_(`/contents/categories/${name}`)

export const KEYWORDS=_('/contents/keywords')

export const KEYWORDS_ID=(id:any)=>_(`/contents/keywords/${id}`)

export const ABOUTS=_('/contents/abouts')

export const ABOUTS_ID=(username:any)=>_(`/accounts/abouts/${username}`)

export const ABOUT_ME=_('/accounts/about/')

export const SOCIALS=_('/accounts/socials')

export const SOCIALS_ID=(username:any)=>_(`/accounts/socials/${username}`)

export const HOME=_('/contents/home')

export const POST_SEARCH_FILTER=(search:string,sort:boolean,cate:string)=>_(`/contents/posts/?q=${search}&sort=${sort}&cate=${cate}`)

export const PROJECT_SEARCH_FILTER=(search:string,sort:boolean,cate:string)=>_(`/contents/projects/?q=${search}&sort=${sort}`)



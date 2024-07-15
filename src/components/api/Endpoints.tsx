import { BASE_URL } from "./Index"

const _=(url:string)=>{
    return `${BASE_URL}${url}`
}

export const POSTS=_('/contents/posts')

export const POSTS_ID=(post_id:any)=>_(`/contents/posts/${post_id}`)

export const PROJECTS=_('/contents/projects')

export const PROJECTS_ID=(project_id:any)=>_(`/contents/projects/${project_id}`)

export const CATEGORIES=_('/contents/categories')

export const CATEGORIES_ID=(name:any)=>_(`/contents/categories/${name}`)

export const KEYWORDS=_('/contents/keywords')

export const KEYWORDS_ID=(id:any)=>_(`/contents/keywords/${id}`)

export const ABOUTS=_('/contents/abouts')

export const ABOUTS_ID=(username:any)=>_(`/contents/abouts/${username}`)

export const SOCIALS=_('/contents/socials')

export const SOCIALS_ID=(username:any)=>_(`/contents/socials/${username}`)

export const HOME=_('/contents/home')


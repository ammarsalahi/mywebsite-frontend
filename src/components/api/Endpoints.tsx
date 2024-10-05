import { BASE_URL } from "./Index"

const _=(url:string)=>{
    return `${BASE_URL}${url}`
}

export const POSTS=_('/contents/posts/')

export const POSTS_ID=(post_id:any)=>_(`/contents/posts/${post_id}/`)

export const POSTS_DETAIL_ID=(post_id:any)=>_(`/contents/post-detail/${post_id}/`)

// export const POST_ADD = _('/contents/posts-add/')

export const PROJECTS=_('/contents/projects/')

export const PROJECTS_ID=(project_id:any)=>_(`/contents/projects/${project_id}`)

export const PROJECT_DETAIL_ID=(project_id:any)=>_(`/contents/project-detail/${project_id}`)

export const CATEGORIES=_('/contents/categories')

export const CATEGORIES_ID=(name:any)=>_(`/contents/categories/${name}`)

export const KEYWORDS=_('/contents/keywords')

export const KEYWORDS_ID=(id:any)=>_(`/contents/keywords/${id}`)

export const KEYWORD_ADD =_('/contents/keywords-add/')

export const TECHNOLOGIES=_('/contents/technologies')

export const TECHNOLOGIES_ID=(id:any)=>_(`/contents/technologies/${id}`)

export const ABOUTS=_('/accounts/abouts')

export const ABOUTS_ID=(username:any)=>_(`/accounts/abouts/${username}`)

export const ABOUT_ME=_('/accounts/about/')

export const SOCIALS=_('/accounts/socials')

export const SOCIALS_ID=(username:any)=>_(`/accounts/socials/${username}`)



export const HOME=_('/contents/home')

export const POST_SEARCH_FILTER=(search:string,sort:boolean,cate:string)=>_(`/contents/posts/?q=${search}&sort=${sort}&cate=${cate}`)

export const POST_CATEGORY=(name:string)=>_(`/contents/category-posts/${name}`)

export const POST_KEYWORDS=(name:string)=>_(`/contents/keyword-posts/${name}`)


export const PROJECT_SEARCH_FILTER=(search:string,sort:boolean)=>_(`/contents/projects/?q=${search}&sort=${sort}`)

export const PROJECT_TECHNOLOGIES=(name:string)=>(`/contents/technology-projects/${name}`)

export const NEW_POSTS=_('/contents/new-posts/');

export const COOPERATIONS=_('/accounts/cooperations/');

export const FOOTER=_('/contents/footer/');

export const SEARCH=(q:any)=>_(`/contents/search/?q=${q}`);

export const SIGNIN=_('/accounts/signin/');
import axios from "axios";

const BASE_URL= import.meta.env.VITE_API_URL;

const Api=axios.create({
    baseURL:BASE_URL
})
 const showImage=(imgs:string)=>{
    if(imgs.startsWith('http')){
        return imgs
    }else{
       const urls=`${BASE_URL}${imgs}`
       return urls
    }
  }

export {BASE_URL,Api,showImage}

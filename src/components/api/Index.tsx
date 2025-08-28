import axios from "axios";

const envurl= import.meta.env.VITE_API_URL;

const BASE_URL = `${envurl}api/v1`
const Api=axios.create({
    baseURL:BASE_URL
})
 const showImage=(imgs:string)=>{
    if(imgs.startsWith('http')){
        return imgs
    }else{
       const urls=`${envurl}${imgs}`
       return urls
    }
  }

export {BASE_URL,Api,showImage}

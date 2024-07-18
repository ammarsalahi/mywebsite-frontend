import axios from "axios";

const BASE_URL='http://127.0.0.1:8000'

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

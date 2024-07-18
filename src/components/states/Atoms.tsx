import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key:'recoil-persist',
    storage:localStorage,
    converter:JSON
})


const filterAtom=atom({
    key:'filters',
    default:{
        assort:true,
        list:true,
        news:false,
    }
})

const projfilterAtom=atom({
    key:'proj-filters',
    default:{
        assort:true,
        list:true,
    }
})
const postSearchAtom=atom({
    key:'post-search',
    default:""
})

const projectSearchAtom=atom({
    key:'proj-search',
    default:""
})

const menuAtom=atom({
    key:'menu',
    default:false
})

const imgurlAtom=atom({
    key:'imgurl',
    default:'',
    effects_UNSTABLE: [persistAtom],

})
export {filterAtom,projectSearchAtom,postSearchAtom,projfilterAtom,menuAtom,imgurlAtom}
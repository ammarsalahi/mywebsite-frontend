import { atom } from "recoil";

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
    key:'post-search',
    default:""
})

const menuAtom=atom({
    key:'menu',
    default:false
})
export {filterAtom,projectSearchAtom,postSearchAtom,projfilterAtom,menuAtom}
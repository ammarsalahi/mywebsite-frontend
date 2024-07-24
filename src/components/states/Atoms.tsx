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
        list:false,
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

const typeAtom=atom({
    key:'project-type',
    default:'',
    effects_UNSTABLE: [persistAtom],

});

const userAtom=atom({
    key:'project-user',
    default:{
        name:"",
        project:"",
        phone:"",
        email:""
    },
    effects_UNSTABLE: [persistAtom],

});

const isloadingAtom=atom({
    key:'is-loading-atom',
    default:false
})
export {filterAtom,projectSearchAtom,postSearchAtom,projfilterAtom,menuAtom,imgurlAtom,typeAtom,userAtom,isloadingAtom}
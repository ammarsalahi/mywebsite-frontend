import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key:'recoil-persist',
    storage:localStorage,
    // converter:JSON
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

});

const userAtom=atom({
    key:'project-user',
    default:{
        name:"",
        project:"",
        phone:"",
        email:""
    },

});

const isloadingAtom=atom({
    key:'is-loading-atom',
    default:false
});

const themeAtom=atom({
    key:'theme-atom',
    default: sessionStorage.getItem('themes') ? sessionStorage.getItem('themes') : "light",
});

const pageLoadAtom=atom({
    key:'page-atom',
    default:false
})

const tokenAtom =atom({
    key:'token-atom',
    default:{
        access:"",
        refresh:""
    },
    effects_UNSTABLE: [persistAtom],
})

export {
    filterAtom,projectSearchAtom,postSearchAtom,
    projfilterAtom,menuAtom,imgurlAtom,typeAtom,
    userAtom,isloadingAtom,themeAtom,pageLoadAtom,
    tokenAtom,
}
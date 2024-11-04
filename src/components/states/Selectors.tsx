import { selector } from "recoil";
import { filterAtom, imgurlAtom, menuAtom, postSearchAtom, projectSearchAtom, projfilterAtom, typeAtom, userAtom,isloadingAtom,themeAtom, pageLoadAtom, tokenAtom, settingsAtom, categoryAtom } from "./Atoms";


const filterSelector=selector({
    key:'filter-selector',
    get:({get})=>{
        const value=get(filterAtom)
        return value
    },
    set:({set},newvalue)=>{
        set(filterAtom,newvalue)
    }
})

const projfilterSelector=selector({
    key:'proj-filterselector',
    get:({get})=>{
        const value=get(projfilterAtom)
        return value
    },
    set:({set},newvalue)=>{
        set(projfilterAtom,newvalue)
    }
})
const postSearchSelector=selector({
    key:'post-search-selector',
    get:({get})=>{
        const value=get(postSearchAtom)
        return value
    },
    set:({set},newvalue)=>{
        set(postSearchAtom,newvalue)
    }
})
const projectSearchSelector=selector({
    key:'filterselector',
    get:({get})=>{
        const value=get(projectSearchAtom)
        return value
    },
    set:({set},newvalue)=>{
        set(projectSearchAtom,newvalue)
    }
})

const menuSelector=selector({
    key:'menu-selector',
    get:({get})=>{
        const value=get(menuAtom)
        return value
    },
    set:({set},newValue)=>{
        set(menuAtom,newValue)
    }
})

const imgurlSelector=selector({
    key:'img-selector',
    get:({get})=>{
        const value=get(imgurlAtom)
        return value
    },
    set:({set},newValue)=>{
        set(imgurlAtom,newValue)
    }
})

const typeSelector=selector({
    key:'types-select',
    get:({get})=>{
        const value=get(typeAtom)
        return value
    },
    set:({set},newValue)=>{
        set(typeAtom,newValue)
    }
})
const userSelector=selector({
    key:'user-select',
    get:({get})=>{
        const value=get(userAtom)
        return value
    },
    set:({set},newValue)=>{
        set(userAtom,newValue)
    }
})

const islodingselector=selector({
    key:'load-select',
    get:({get})=>{
        const value=get(isloadingAtom)
        return value
    },
    set:({set},newValue)=>{
        set(isloadingAtom,newValue)
    }
})

const themeSelector=selector({
    key:'theme-select',
    get:({get})=>{
        const value=get(themeAtom)
        return value
    },
    set:({set},newValue:any)=>{
        set(themeAtom,newValue)
        sessionStorage.setItem('themes', newValue);
    }
})

const pageLoadSelector=selector({
    key:"page-selector",
    get:({get})=>{
        const value=get(pageLoadAtom)
        return value
    },
    set:({set},newValue:any)=>{
        set(pageLoadAtom,newValue)
    }
})

const tokenSelector=selector({
    key:"token-selector",
    get:({get})=>{
        const value=get(tokenAtom)
        return value
    },
    set:({set},newValue:any)=>{
        set(tokenAtom,newValue)
    }
});

const settingsSelector=selector({
    key:"setting-selector",
    get:({get})=>{
        const value=get(settingsAtom)
        return value
    },
    set:({set},newValue:any)=>{
        set(settingsAtom,newValue)
    }
})

const categorySelector=selector({
    key:"cat-selector",
    get:({get})=>{
        const value=get(categoryAtom)
        return value
    },
    set:({set},newValue:any)=>{
        set(categoryAtom,newValue)
    }
})

export {
    filterSelector,postSearchSelector,projectSearchSelector,
    menuSelector,imgurlSelector,projfilterSelector,
    typeSelector,userSelector,islodingselector,themeSelector,
    pageLoadSelector,tokenSelector,settingsSelector,categorySelector
}
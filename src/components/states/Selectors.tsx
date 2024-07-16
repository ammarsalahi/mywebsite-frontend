import { selector } from "recoil";
import { filterAtom, menuAtom, postSearchAtom, projectSearchAtom } from "./Atoms";


const filterSelector=selector({
    key:'filterselector',
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
        const value=get(filterAtom)
        return value
    },
    set:({set},newvalue)=>{
        set(filterAtom,newvalue)
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

export {filterSelector,postSearchSelector,projectSearchSelector,menuSelector}
import { selector } from "recoil";
import { filterAtom } from "./Atoms";


const filterSelector=selector({
    key:'filters',
    get:({get})=>{
        const value=get(filterAtom)
        return value
    },
    set:({set},newvalue)=>{
        set(filterAtom,newvalue)
    }
})

export {filterSelector}
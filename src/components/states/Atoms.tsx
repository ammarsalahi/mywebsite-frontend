import { atom } from "recoil";

const filterAtom=atom({
    key:'filters',
    default:{
        sort:'ascend',
        list:'card',
        news:false,
    }
})

export {filterAtom}
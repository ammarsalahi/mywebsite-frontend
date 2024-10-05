const AuthConfigHeader=(token:string):{ Authorization: string ,"Content-Type":string} => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
}

const AuthConfigHeaderFile=(token:string):{ Authorization: string ,"Content-Type":string} => {
    return {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
    }
}

export{
    AuthConfigHeader,
    AuthConfigHeaderFile
}
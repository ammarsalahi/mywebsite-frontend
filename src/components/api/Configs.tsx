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

const ConfigHeaderFile=():{ "Content-Type":string} => {
    return {
        "Content-Type": "multipart/form-data",
    }
}
export{
    AuthConfigHeader,
    AuthConfigHeaderFile,
    ConfigHeaderFile
}
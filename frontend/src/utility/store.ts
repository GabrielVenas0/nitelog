
export function Get_Storage(key:string){
    const value = localStorage.getItem(key)
    if(value){
        return JSON.parse(value)
    }
    return
}
export function Save_Storage(key:string, value: any){
    if(value){
        localStorage.setItem(key, JSON.stringify(value))
    }
}
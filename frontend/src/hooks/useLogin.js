import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin =  ()=>{
    const [loading, setLoading] = useState(false); 
    const {authUser,setAuthUser} = useAuthContext()
    const login = async (username,password)=>{
        setLoading(true);
        try {
           const res = await fetch ("api/auth/login", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:  JSON.stringify({username,password})
           })
           const data = await res.json();
           console.log(data);
           if(res.status === 201){ 
                localStorage.setItem("chatUser",JSON.stringify(data));
                setAuthUser(data)    
                
                
           } else{
             throw new Error(data.error)
           }
           
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    
    return {loading, login}
}

export default useLogin;
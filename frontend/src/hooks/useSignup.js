import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()
  const signup = async ({fullName,username,password,confirmPassword,gender})=>{
   const success =  handleInputErrors({fullName,username,password,confirmPassword,gender});
   console.log(success)
   if(!success) return;
   toast.success("success")
   setLoading(true)
   try {
    console.log('getting ')
    const res = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({fullName,username,password,confirmPassword,gender})
    })

    const data = await res.json();
    console.log(data)
    if(data.error){
        throw new Error(data.error)
    }

    localStorage.setItem("chatUser",JSON.stringify(data))
    setAuthUser(data)
   } catch (error) {
        toast.error(error.message)
   } finally{
    setLoading(false)
   }
  }
  return {loading,signup}
}

export default useSignup;

function handleInputErrors ({fullName,username,password,confirmPassword,gender}){
    if(!fullName ||!username|| !password || !confirmPassword||!gender){
        toast.error("Please fill all fields")
        return false;
    }
    if(password!== confirmPassword){
        toast.error("passwords do not match")
        return false;
    }
    if(password.length<6){
        toast.error('password must be at least 6 characters');
        return false;
    }
    return true
}
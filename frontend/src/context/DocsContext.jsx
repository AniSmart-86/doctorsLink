import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/DocData";
import axios from "axios";
import { toast } from "react-toastify";

export const DocsContext = createContext();

export const DocsContextProvider = (props) => {
  const currencySymbol = "$";

  const BackendUrl =  'https://doctorslink-api.onrender.com';

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const[ userData, setUserData] = useState(false)

  const loaduserData = async()=>{

try {
    

    const {data} = await axios.get(BackendUrl + '/api/users/get',{headers:{token}})
    if(data.success){
        setUserData(data.userData)
    }else{
        toast.error(data.message)
    }
} catch (error) {
    console.log(error)
    toast.error(data.message)
}


  }

  const value = { doctors, currencySymbol, token, setToken, BackendUrl, userData, setUserData, loaduserData };


  useEffect(()=>{
    if(token){
        loaduserData();
    }else{
        setUserData(false);
    }
  },[token])

  return (
    <DocsContext.Provider value={value}>{props.children}</DocsContext.Provider>
  );
};

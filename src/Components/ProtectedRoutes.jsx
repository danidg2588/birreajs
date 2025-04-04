import { Outlet } from "react-router-dom"
import axios from "axios"
import React, { useEffect, useState } from 'react'
import Authentication from "./Authentication/Authentication"

const ProtectedRoutes = () => {

  const [token,setToken] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState({
    username: null,
    password: null,
  });

  useEffect(() => {
    setToken(localStorage.getItem("birrea.app"))
  },[])

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (login.username !== "" && login.password !== "") {
        axios.post("https://danilo2588.pythonanywhere.com/authentication", {
            'username':login.email,
            'password':login.password,
        })
        .then( function(response){
            if (response.status == 200 && response.data.token)
            {
              localStorage.setItem("birrea.app",response.data.token)
              setToken(response.data.token)
            }
        })
        .catch(function (error){
            console.log(error)
        })
        .finally(function(){
            setIsLoading(false)
        })
      } else {
          alert("error")
      }
  };

  return token ? <Outlet /> : <Authentication isLoading={isLoading} login={login} setLogin={setLogin} handleSubmitEvent={handleSubmitEvent} />
}

export default ProtectedRoutes
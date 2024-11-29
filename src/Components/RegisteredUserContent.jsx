import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from './AuthProvider'
import React from 'react'

function RegisteredUserContent() {
    const user = useAuth();
    if (!user.token) return <Navigate to="/sign-in" />;
    return <Outlet />;
}

export default RegisteredUserContent
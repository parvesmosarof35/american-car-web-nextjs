import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Loader from "../shared/Loaders/Loader";

const PrivateRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Optional: check expiry
                if (decoded.exp * 1000 > Date.now()) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Invalid token", error);
                setIsAuthorized(false);
            }
        } else {
            setIsAuthorized(false);
        }
        setIsLoading(false);
    }, [token]);

    if (isLoading) {
        return <Loader />;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [credentials, setCredentials] = useState(initialState)

    const handleChange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        callback();
    }

    return{
        credentials,
        handleChange,
        handleSubmit
    }
}
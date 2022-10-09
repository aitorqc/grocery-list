import React, { useEffect } from "react";

export default function Alert({ type, msg, removeAlert }) {
    useEffect(() => {
        const timeout = setTimeout(()=>{
            removeAlert();
        }, 4000);
        return () => clearTimeout(timeout)
    }, []);

    return (
        <p className={`alert alert-${type}`}>{msg}</p>
    )
}

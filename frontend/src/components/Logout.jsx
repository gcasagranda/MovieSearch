import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./comp.module.css";

const Logout = () => {

    const navigateTo = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/logout', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            await response.json();
            localStorage.clear();
            window.location.reload();
            navigateTo("/");
        } catch (error) {
          console.error('Erro ao enviar dados para o backend:', error);
        }
    };

    return (
        <div className={styles.formdiv}>
            <button className={styles.formbutton} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessAlert = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light"
        });
};

export const showErrorAlert = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light"
        });
}   
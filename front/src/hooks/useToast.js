import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function useToast() {
  const mode = useSelector((state) => state.mode);
  const options = {
    className: "toastMessage",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    mode: mode,
  };

  return (type, message) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warn(message, options);
        break;
      default:
        toast(message, options);
    }
  };
}

export default useToast;

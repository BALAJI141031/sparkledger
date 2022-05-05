import { createContext } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const notifyUserContext = createContext();

function NotifyUser({ children }) {
  return (
    <notifyUserContext.Provider value={{ toast }}>
      {children}
    </notifyUserContext.Provider>
  );
}

const useNotifyUser = () => useContext(notifyUserContext);

export { NotifyUser, useNotifyUser };

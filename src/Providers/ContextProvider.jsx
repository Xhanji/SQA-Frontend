import { Children, createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null ,
    userType: null,
    setUser: () => {},
    setToken: () => {},
    setUserType: () => {}
});

export const ContextProvider = ({children}) =>{
    const [user, setUser] = useState ({});
    const [token, _setToken] = useState (localStorage.getItem('ACCESS_TOKEN'));
    const [userType, _setUserType] = useState(localStorage.getItem('USER_TYPE')); // Inicializamos con lo almacenado en el localStorage
    
    
    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setUserType = (type) => {
        _setUserType(type);
        if(type) {
            localStorage.setItem('USER_TYPE', type); // Guardamos el tipo de usuario en el localStorage
        } else {
            localStorage.removeItem('USER_TYPE');
        }
    };
    return (
        <stateContext.Provider value={{
            user,
            token,
            userType, // Proveemos el tipo de usuario
            setUser,
            setToken,
            setUserType // Proveemos el setter para el tipo de usuario
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)
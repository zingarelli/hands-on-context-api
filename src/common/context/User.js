import { createContext, useState } from "react";

export const UserContext = createContext();

// component that manages states and provides a Provider
export const UserProvider = ({ children }) => {
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState(0);

    return (
        <UserContext.Provider value={ {nome, setNome, saldo, setSaldo}} >
            {children}
        </UserContext.Provider>
    )
}
import React, { createContext, useState } from 'react';

export const RoleContext = createContext();

export function ContextProvider({ children }) {
    const [role, setRole] = useState(null);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}
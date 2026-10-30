import { createContext, useState, useEffect } from 'react';


export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('admin_session');
    return savedAdmin ? JSON.parse(savedAdmin) : null; 
  });

  
  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin_session', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin_session');
    }
  }, [admin]);

  
  const loginAdmin = (adminData) => {
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
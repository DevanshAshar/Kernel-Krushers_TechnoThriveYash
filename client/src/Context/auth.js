import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token:''
  });
  const storedToken = localStorage.getItem('auth');
  useEffect(() => {
    
    console.log(storedToken)
    if (storedToken) {
      setAuth({
        ...auth,
        token: storedToken,
      });
      axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
    }
  }, [storedToken]); 

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth=()=>useContext(AuthContext)
export {useAuth,AuthProvider}
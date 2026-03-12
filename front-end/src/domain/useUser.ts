import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';


export const useUser = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user)=>{
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);
    


  return (
    {
        isLoading,
        user
    }
    
  )
}

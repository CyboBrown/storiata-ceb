import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useSession } from './AuthContext';
import { UserAuthentication } from '../services/UserAuthentication';

type ContributorContextType = {
  isContributor: boolean;
};

const ContribModeContext = createContext<ContributorContextType | null>(null);
export const useContributorContext = () => {
  const context = useContext(ContribModeContext);
  
  if (!context) {
    throw new Error('useContributorContext must be used within a ContributorContextProvider');
  }

  return context;
};

export const ContributorContextProvider = ({ children }: PropsWithChildren) => {
  const [isContributor, setIsContributor] = useState<boolean>(false);
  const { getUserUUID } = useSession();
  
  useEffect(() => {
    const currentUserID = getUserUUID();
    if (currentUserID) {
      const checkContributorStatus = async () => {
        const userIsContributor: boolean = await UserAuthentication.getUserType(
          currentUserID
        );

        setIsContributor(userIsContributor)
      }
      checkContributorStatus();
    }
  }, [getUserUUID])

  return (
    <ContribModeContext.Provider value={{ isContributor }}>
      {children}
    </ContribModeContext.Provider>
  );
};


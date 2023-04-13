import { useContext } from 'react';
import { AuthContext, GroupsContext } from '../context';

export const handleResetStocks = () => {
  const { onLogout } = useContext(AuthContext);
  const { handleResetGroups } = useContext(GroupsContext);

  const handleResetStocks = () => {
    onLogout();
    handleResetGroups();
  };

  return {
    handleResetStocks
  };
};

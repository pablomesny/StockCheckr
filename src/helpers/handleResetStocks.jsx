import { useContext } from "react";
import { GroupsContext } from "../context";

export const handleResetStocks = () => {

    const { handleResetGroups } = useContext( GroupsContext );

    const handleResetStocks = () => {
        handleResetGroups();
    }

  return {
    handleResetStocks
  }
}
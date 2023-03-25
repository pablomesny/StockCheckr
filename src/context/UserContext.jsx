import { createContext, useState } from "react"

const UserContext = createContext();

const initialValues = {
  groups: [],
  brands: [],
  categories: [],
  attributesGroup: [],
  attributes: [],
  sales: null
}

export const UserProvider = ({ children }) => {

    const [ stocks, setStocks ] = useState( initialValues );

    const handleSetGroups = ( groups ) => {
      setStocks( prev => ({
        ...prev,
        groups
      }))
    }

    const handleAddGroup = ( group ) => {
      setStocks( prev => ({
        ...stocks,
        groups: [
          prev.groups,
          group
        ]
      }))
    }

    const value = {
      stocks,
      handleSetGroups,
      handleAddGroup
    }

  return (
    <UserContext.provider value={ value }>
        { children }
    </UserContext.provider>
  )
}

import { createContext, useState } from "react"

export const StocksContext = createContext();

const initialValues = {
  groups: [],
  brands: [],
  categories: [],
  attributesGroup: [],
  attributes: [],
  sales: []
}

export const StocksProvider = ({ children }) => {

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
    <StocksContext.Provider value={ value }>
        { children }
    </StocksContext.Provider>
  )
}

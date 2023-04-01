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
      setStocks({
        ...stocks,
        groups: [
          ...stocks.groups,
          group
        ]
      })
    }
    
    const handleDeleteGroup = ( id ) => {
      setStocks({
        ...stocks,
        groups: stocks.groups.filter( group => group.id !== id )
      })
    }

    const handleUpdateGroup = ( group ) => {

      const { id } = group;

      setStocks({
        ...stocks,
        groups: stocks.groups.map( item => {
          if( item.id === id ) {
            return group;
          }
          return item;
        })
      })
    }

    const handleResetStocks = () => {
      setStocks( initialValues );
    }

    const value = {
      stocks,
      handleSetGroups,
      handleAddGroup,
      handleResetStocks,
      handleDeleteGroup,
      handleUpdateGroup
    }

  return (
    <StocksContext.Provider value={ value }>
        { children }
    </StocksContext.Provider>
  )
}

import { createContext, useState } from "react"

export const GroupsContext = createContext();

const initialValues = {
  total: 0,
  items: []
}

export const GroupsProvider = ({ children }) => {

    const [ groups, setGroups ] = useState( initialValues );

    const handleSetGroups = ( groups, total ) => {
      setGroups({
        total,
        items: groups
      })
    }

    const handleAddGroup = ( group ) => {
      setGroups( prev => ({
        total: total + 1,
        items: [
          ...prev.items,
          group
        ]
      }))
    }
    
    const handleDeleteGroup = ( id ) => {

      const itemsLeft = groups.items.filter( group => group.id !== id );

      setGroups({
        total: itemsLeft.length,
        items: [
          groups.items.filter( group => group.id !== id )
        ]
      })
    }

    const handleUpdateGroup = ( group ) => {

      const { id } = group;

      setGroups({
        ...groups,
        items: groups.items.map( item => {
          if( item.id === id ) {
            return group;
          }
          return item;
        })
      })
    }

    const handleResetGroups = () => {
      setGroups( initialValues );
    }

    const value = {
      groups,
      handleSetGroups,
      handleAddGroup,
      handleResetGroups,
      handleDeleteGroup,
      handleUpdateGroup
    }

  return (
    <GroupsContext.Provider value={ value }>
        { children }
    </GroupsContext.Provider>
  )
}

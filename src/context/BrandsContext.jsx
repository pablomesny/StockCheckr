import { createContext, useState } from "react"

export const BrandsContext = createContext();

const initialValues = {
    total: 0,
    items: []
}

export const BrandsProvider = ({ children }) => {

    const [ brands, setBrands ] = useState( initialValues );

    const handleSetBrands = ( brands, total ) => {
        setBrands({
            total,
            items: brands
        })
    }

    const handleAddBrand = ( brand ) => {
        setBrands( prev => ({
            total: prev.total + 1,
            items: [
                ...prev.items,
                brand
            ]
        }))
    }

    const handleDeleteBrand = ( id ) => {
        setBrands( prev => ({
            total: prev.total - 1,
            items: [
                prev.items.filter( brand => brand.id !== id )
            ]
        }))
    }

    const handleUpdateBrand = ( brand ) => {

        const { id } = brand;

        setBrands({
            ...brands,
            items: brands.items.map( item => {
                if( item.id === id ) {
                    return brand;
                }
                return item;
            })
        })
    }

    const handleResetBrands = () => {
        setBrands( initialValues );
    }

    const value = {
        brands,
        handleSetBrands,
        handleAddBrand,
        handleResetBrands,
        handleDeleteBrand,
        handleUpdateBrand
    }

  return (
    <BrandsContext.Provider value={ value }>
        { children }
    </BrandsContext.Provider>
  )
}

import { createContext, useState } from 'react';

export const CategoriesContext = createContext();

const initialValues = {
  total: 0,
  items: []
};

export const CategoriesProvider = ({ children }) => {

  const [categories, setCategories] = useState(initialValues);

  const handleSetCategories = (categories, total) => {
    setCategories({
      total,
      items: categories
    });
  };

  const handleAddCategory = category => {
    setCategories(prev => ({
      total: prev.total + 1,
      items: [...prev.items, category]
    }));
  };

  const handleDeleteCategory = id => {
    setCategories(prev => ({
      total: prev.total - 1,
      items: [prev.items.filter(category => category.id !== id)]
    }));
  };

  const handleUpdateCategory = category => {
    const { id } = category;

    setCategories({
      ...categories,
      items: categories.items.map(item => {
        if (item.id === id) {
          return category;
        }
        return item;
      })
    });
  };

  const handleResetCategories = () => {
    setCategories(initialValues);
  };

  const value = {
    categories,
    handleSetCategories,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleResetCategories
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

import { Navigate, Route, Routes } from "react-router-dom"
import { AttributesPage, BrandsPage, CategoriesPage, ControlPanelPage, CreateSalePage, GroupsPage, ManageSalesPage, ProductsPage } from "../pages"

export const ControlPanelRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ControlPanelPage /> } />
        <Route path="/groups" element={ <GroupsPage /> } />
        <Route path="/brands" element={ <BrandsPage /> } />
        <Route path="/categories" element={ <CategoriesPage /> } />
        <Route path="/attributes" element={ <AttributesPage /> } />
        <Route path="/products" element={ <ProductsPage /> } />
        <Route path="/sales/create" element={ <CreateSalePage /> } />
        <Route path="/sales/manage" element={ <ManageSalesPage /> } /> 

        <Route path="/*" element={ <Navigate to="/" />} />
    </Routes>
  )
}

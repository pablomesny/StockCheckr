import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages"
import { NavBar } from '../components';

export const AppRouter = () => {
  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path="/*" element={ <LoginPage /> } />
      </Routes>
    </>
  )
}

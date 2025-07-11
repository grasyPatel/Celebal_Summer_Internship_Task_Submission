
import Header from "../Common/Header.jsx"
import Footer from '../Common/Footer.jsx'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
    <Header />
    <main>
      <Outlet/>
    </main>

   

    <Footer/>
    </>

  )
}

export default UserLayout
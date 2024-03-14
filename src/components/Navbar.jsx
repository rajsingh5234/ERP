import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
   HomeFilled, ProductFilled, SignalFilled, CalendarFilled, CloseOutlined, LogoutOutlined
} from '@ant-design/icons';


const Navbar = ({ showNavbar, setShowNavbar, onLogout }) => {
   const routes = [
      {
         name: "Dashboard",
         path: '/dashboard',
         icon: <HomeFilled />
      },
      {
         name: "Products",
         path: '/products',
         icon: <ProductFilled />
      },
      {
         name: "Orders",
         path: '/orders',
         icon: <SignalFilled />
      },
      {
         name: "Calendar",
         path: '/calendar',
         icon: <CalendarFilled />
      },
   ]

   useEffect(() => {

      const onResize = () => {
         if (window.innerWidth <= 960) {
            setShowNavbar(false);
         }
      }

      onResize();

      window.addEventListener("resize", onResize);

      return () => {
         window.removeEventListener("resize", onResize);
      }
   }, []);


   return (
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${showNavbar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`} aria-label="Sidebar">
         <div className="h-full px-3 py-4 overflow-y-auto space-y-2 bg-primary">
            <div className='flex justify-between'>
               <span className='text-white text-2xl font-semibold'>ERP</span>
               <CloseOutlined className='md:hidden cursor-pointer text-white' onClick={() => setShowNavbar(false)} />
            </div>
            <ul className="space-y-2 font-medium">
               {
                  routes.map(({ icon, name, path }) => (
                     <li key={path}>
                        <NavLink to={path} className="flex items-center p-2 text-white rounded-lg hover:bg-white/10">
                           {icon}
                           <span className="ms-3">{name}</span>
                        </NavLink>
                     </li>
                  ))
               }
               <li onClick={onLogout}>
                  <div className="flex items-center p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer">
                     <LogoutOutlined />
                     <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                  </div>
               </li>
            </ul>
         </div>
      </aside>
   )
}


export default Navbar

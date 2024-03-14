import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';

const Header = ({ setShowNavbar, onLogout }) => {
   return (
      <div className={`flex justify-between items-center mb-4 md:hidden`}>
         <div className='flex gap-2 sm:gap-4 items-center'>
            <MenuOutlined onClick={() => setShowNavbar(prev => prev = !prev)} />
            <h2 className='text-primary text-xl font-bold capitalize'>ERP</h2>
         </div>

         <LogoutOutlined className='text-xl text-primary' onClick={onLogout} />
      </div>
   );
};


export default Header;

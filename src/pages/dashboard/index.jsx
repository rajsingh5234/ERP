import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import GetCategories from './utils/GetCategories';
import ContentBox from './components/ContentBox';
import { BarChart, LineChart, PieChart } from '../../components/Charts';
import Icon from '@ant-design/icons';
import SignalFilled from '@ant-design/icons/SignalFilled';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import ProductOutlined from '@ant-design/icons/ProductOutlined';
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';
import GetUsers from './utils/GetUsers';
import GetSales from './utils/GetSales';
import Statistic from 'antd/lib/statistic';

const months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "June",
   "July",
   "Aug",
   "Sept",
   "Oct",
   "Nov",
   "Dec",
];

const DashBoard = () => {

   const { products } = useSelector((state) => state.productsReducer)
   const { orders } = useSelector((state) => state.ordersReducer)

   const { productCategories, productCategoryValues } = useMemo(() => {
      return GetCategories(products)
   }, [products]);

   const users = useMemo(() => {
      return GetUsers(orders)
   }, [orders]);

   const totalSale = useMemo(() => {
      return GetSales(orders)
   }, [orders])

   const stats = [
      {
         label: 'Products Listed',
         value: products?.length || 0,
         icon: ProductOutlined,
      },
      {
         label: 'Buyers On Platform',
         value: users?.length || 0,
         icon: UsergroupAddOutlined,
      },
      {
         label: 'Total Orders',
         value: orders?.length || 0,
         icon: SignalFilled,
      },
      {
         label: 'Sales',
         value: totalSale,
         icon: DollarOutlined,
         prefix: "$"
      },
   ]

   return (
      <>
         <div className="mb-6 grid gap-y-4 sm:gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon, suffix = "+", prefix }) => (
               <ContentBox key={label}>
                  <div className='flex flex-row-reverse justify-between'>
                     <div className=" mt-4 mx-4 rounded-xl bg-primary text-white shadow-primary/20 grid h-12 w-12 place-items-center">
                        <Icon component={icon} className='text-2xl' />
                     </div>
                     <div className="p-4 text-left">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-primary">{label}</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-primary">
                           {
                              <Statistic
                                 value={value}
                                 suffix={suffix ? suffix : ""}
                                 prefix={prefix ? prefix : ""}
                              />
                           }
                        </h4>
                     </div>
                  </div>
               </ContentBox>
            ))}
         </div>

         <div className='pb-8 space-y-4'>
            <ContentBox className='p-4 w-full space-y-2'>
               <h6
                  className="text-base text-center font-semibold text-primary m-4 mb-0"
               >
                  Monthly Sales
               </h6>
               <BarChart
                  data_1={[50, 140, 100, 210, 100, 500, 200, 300, 150, 300, 400, 533]}
                  title_1="Revenue"
                  bgColor_1="rgb(0,115,255)"
                  labels={months}
               />
            </ContentBox>

            <div className='grid grid-cols-1 gap-y-4 sm:gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3'>

               <ContentBox className='p-2 space-y-2'>
                  <h6 className="text-base text-center font-semibold text-primary m-4 mb-0">Product Categories</h6>
                  <PieChart
                     labels={productCategories}
                     data={productCategoryValues}
                  />
               </ContentBox>
               <ContentBox className='p-4 sm:col-span-2 space-y-2'>
                  <h6 className="text-base text-center font-semibold text-primary m-4 mb-0">Total Users</h6>
                  <LineChart
                     data={[
                        200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
                     ]}
                     label="Users"
                     borderColor="rgb(53, 162, 255)"
                     backgroundColor="rgba(53, 162, 255,0.5)"
                     labels={months}
                  />
               </ContentBox>


            </div>
         </div>

      </>
   );
};

export default DashBoard;

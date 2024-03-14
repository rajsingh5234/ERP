
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chip from '../../components/Chip';
import Popover from 'antd/lib/popover';
import { Calendar as Antcalendar } from 'antd';
import CalendarView from './components/CalendarView';
import GetOrderDateMap from './utils/GetOrderDateMap';
import Loader from '../../components/Loader';

const Calendar = () => {

   const { orders } = useSelector((state) => state.ordersReducer);

   const [orderDeliveryDetail, setOrderDeliveryDetail] = useState(null)

   const fetchOrderDeliveryDetail = (orderData) => {
      const orderDeliveryDetail = GetOrderDateMap(orderData);
      setOrderDeliveryDetail(orderDeliveryDetail);
   }

   const cellRender = (current) => {

      let date = new Date(current.$d).toLocaleDateString()

      if (orderDeliveryDetail[date]) {
         return (
            <Popover
               content={<CalendarView orders={orderDeliveryDetail[date]} />}
               placement="bottom"
               trigger="click">
               <div
                  className='w-full h-full grid place-items-center'
               >
                  <Chip text={orderDeliveryDetail[date].length} varient='gray' />
               </div>
            </Popover>

         )
      }
      else {
         return <></>
      }
   };

   useEffect(() => {
      if (orders) {
         fetchOrderDeliveryDetail(orders);
      }
   }, [orders])


   if (!orderDeliveryDetail) {
      return <Loader />
   }

   return (
      <div className="mt-8 mb-8 flex flex-col gap-12">
         <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-primary to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
               <h6 className="flex justify-between items-center antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                  Calendar
               </h6>
            </div>
            <div className="calendar p-6 px-4 pt-0 pb-2">
               <Antcalendar cellRender={cellRender} />
            </div>
         </div>
      </div>
   )
};

export default Calendar;

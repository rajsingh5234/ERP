import React from "react";
import Statistic from 'antd/lib/statistic';

const CalendarView = ({ orders }) => {
   return (
      <div className="divide-y">
         {
            orders?.map((order) => {
               return (
                  <div key={order.id} className="p-2">
                     <p>
                        <b>Customer name:&nbsp;</b>
                        {order.customer_name}
                     </p>

                     <p
                        className="flex items-center">
                        <b>Total price:&nbsp;</b>
                        <Statistic
                           valueStyle={{ fontSize: "1rem" }}
                           value={order.total_price}
                           prefix="$"
                        />
                     </p>

                     <p>
                        <b>Products:&nbsp;</b>
                        {order?.items?.map((item, i, arr) => {
                           return (
                              <React.Fragment
                                 key={item.product_id}
                              >
                                 {item.productDetail.title}{i === arr.length - 1 ? '' : ', '}
                              </React.Fragment>
                           )
                        })}
                     </p>
                  </div>
               )
            })
         }
      </div>
   )
};

export default CalendarView;

import Select from "antd/lib/select";

const ViewOrders = ({ order, onStatusChange = () => { } }) => {

   const onOrderStatusChange = (value) => {
      onStatusChange(value);
   };

   return (
      <section className="py-8 relative sm:max-h-[488px] sm:max-w-[900px] overflow-auto">

         <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h1 className="font-manrope font-bold text-3xl leading-10 text-black pb-6">Order Details</h1>
            <div className="flex items-start flex-col gap-6 xl:flex-row-reverse ">
               <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
                  <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                     <h2
                        className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                        Order Summary
                     </h2>
                     <div className="data py-6 border-b border-gray-200">
                        <div className="flex items-center justify-between gap-4 mb-5">
                           <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Order Id</p>
                           <p className="font-medium text-lg leading-8 text-gray-900">{order.id}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-5">
                           <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Customer name</p>
                           <p className="font-medium text-lg leading-8 text-gray-600">{order.customer_name}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4 ">
                           <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">Order Status</p>
                           <Select
                              value={order.status}
                              style={{
                                 width: 150,
                              }}
                              onChange={onOrderStatusChange}
                              options={[
                                 {
                                    value: 'Shipped',
                                    label: 'Shipped',
                                 },
                                 {
                                    value: 'Delivered',
                                    label: 'Delivered',
                                 },
                                 {
                                    value: 'Processing',
                                    label: 'Processing',
                                 },
                              ]}
                           />
                        </div>
                     </div>
                     <div className="total flex items-center justify-between pt-6">
                        <p className="font-normal text-xl leading-8 text-black ">Subtotal</p>
                        <h5 className="font-manrope font-bold text-2xl leading-9 text-indigo-600">${order?.total_price}</h5>
                     </div>
                  </div>
               </div>
               <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
                  <div className="grid grid-cols-1 gap-6">
                     {
                        order?.items?.map((item) => {
                           return (
                              <div key={item.product_id} className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                                 <div className="img-box">
                                    <img src={item?.productDetail?.thumbnail} alt={item?.productDetail?.title} className="w-full max-w-[300px] max-h-[200px] object-cover md:max-w-[122px] md:max-h-[122px]" />
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                                    <div>
                                       <h2 className="font-medium text-xl leading-8 text-black mb-3">
                                          {item?.productDetail?.title}
                                       </h2>
                                       <p className="font-normal text-lg leading-8 text-gray-500 ">
                                          Quantity: {item?.quantity}
                                       </p>

                                    </div>
                                    <div className="flex items-center justify-end gap-8">
                                       <h6 className="font-medium text-xl leading-8 text-indigo-600">${item?.productDetail?.price}</h6>
                                    </div>
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
            </div>
         </div>
      </section>

   )
};

export default ViewOrders;

import { useDispatch, useSelector } from 'react-redux';
import Table from "antd/lib/table";
import Statistic from 'antd/lib/statistic';
import OrdersTableActions from './components/OrdersTableActions';
import { changeOrderStatus, deleteOrder, setOrdersModalChild, setOrdersModalVisibility, setSelectedOrder } from '../../redux/slices/ordersSlice';
import CustomModal from '../../components/CustomModal';
import ViewOrders from './components/ViewOrders';
import Chip from '../../components/Chip';
import GetChipVarient from './utils/GetChipVarient';

const Orders = () => {

   const { orders, ordersModalVisibility, ordersModalChild, selectedOrder } = useSelector((state) => state.ordersReducer);

   const dispatch = useDispatch();

   const onOpenModal = (modalChild, order) => {
      dispatch(setOrdersModalChild(modalChild));
      dispatch(setSelectedOrder(order));
      dispatch(setOrdersModalVisibility(true));
   }

   const onCloseModal = () => {
      dispatch(setSelectedOrder(null));
      dispatch(setOrdersModalVisibility(false));
   }

   const onStatusChange = (status) => {
      dispatch(changeOrderStatus(status))
   }

   const onDeleteOrder = (orderId) => {
      if (orderId === undefined || orderId === null) return
      dispatch(deleteOrder(orderId));
   }

   const orderModalChildren = {
      viewOrder: <ViewOrders order={selectedOrder} onStatusChange={onStatusChange} />,
   }

   const OrderTableColumns = [
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Order Id</p>,
         width: 100,
         dataIndex: "id",
         key: "id",
         align: "center",
         ellipsis: true,
         render: (text) => <span className="text-secondaryLite font-medium">{text}</span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Customer name</p>,
         width: 100,
         dataIndex: "customer_name",
         key: "customer_name",
         align: "center",
         ellipsis: true,
         sorter: (a, b) => a?.customer_name?.localeCompare(b?.customer_name),
         render: (text) => <span className="text-secondaryLite font-medium">{text}</span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Price</p>,
         dataIndex: "total_price",
         key: "total_price",
         width: 100,
         align: "center",
         ellipsis: true,
         sorter: (a, b) => a.total_price - b.total_price,
         render: (text) => <span className="text-secondaryLite font-medium">
            <Statistic
               valueStyle={{ fontSize: "1rem", color: "#546E7A" }}
               value={text}
               prefix="$"
            />
         </span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Status</p>,
         dataIndex: "status",
         key: "status",
         width: 100,
         align: "center",
         ellipsis: true,
         render: (text) => <div className='grid place-items-center'><Chip text={text} varient={GetChipVarient(text)} /></div>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Date</p>,
         dataIndex: "date",
         key: "date",
         width: 100,
         align: "center",
         ellipsis: true,
         render: (text, record) => {
            if (record.status !== "Delivered") {
               return (
                  <span className="text-secondaryLite font-medium">{text}</span>
               )
            }
            else {
               return (
                  <span className="text-secondaryLite font-medium">-</span>
               )
            }
         },
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Actions</p>,
         dataIndex: "actions",
         key: "actions",
         width: 100,
         align: "center",
         ellipsis: true,
         render: (_, record) => <OrdersTableActions
            onView={() => onOpenModal("viewOrder", record)}
            onDelete={() => onDeleteOrder(record.id)}
         />,
      },
   ]

   return (
      <div className="mt-8 mb-8 flex flex-col gap-12">
         <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-primary to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
               <h6 className="flex justify-between items-center antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                  Orders
               </h6>
            </div>
            <div className="p-6 px-0 pt-0 pb-2">
               <Table
                  className='w-full'
                  columns={OrderTableColumns}
                  dataSource={orders || []}
                  loading={orders === null}
                  rowKey="id"
                  pagination={{
                     pageSize: 7,
                     showSizeChanger: false,
                     position: ["bottomCenter"],
                  }}
                  scroll={{
                     x: 500,
                  }}
               />
            </div>
         </div>

         {
            ordersModalChild && orderModalChildren[ordersModalChild] &&
            <CustomModal
               closable={true}
               open={ordersModalVisibility}
               onCancel={onCloseModal}
            >
               {
                  orderModalChildren[ordersModalChild]
               }
            </CustomModal>
         }
      </div>
   )
};

export default Orders;

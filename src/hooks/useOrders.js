import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../redux/slices/ordersSlice";
import GetOrderDetails from "../utils/GetOrderDetails";
import OrderData from "../constants/OrderData";


const useOrders = () => {
   const { products } = useSelector((state) => state.productsReducer);
   const dispatch = useDispatch();

   const fetchOrderDetails = (orderData = [], products = []) => {
      const orderDetails = GetOrderDetails(orderData, products);
      dispatch(setOrders(orderDetails));
   }

   useEffect(() => {

      if (OrderData && products) {
         fetchOrderDetails(OrderData, products);
      }

   }, [OrderData, products])
};

export default useOrders;

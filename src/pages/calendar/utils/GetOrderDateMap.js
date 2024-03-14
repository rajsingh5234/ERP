const GetOrderDateMap = (orderData) => {
   let map = {};

   if (!orderData) {
      return map;
   }

   orderData?.forEach((order) => {
      if (order.status !== "Delivered") {
         let date = new Date(order.date).toLocaleDateString();
         if (!map[date]) {
            map[date] = [order];
         }
         else {
            let prev = map[date];
            map[date] = [...prev, order];
         }
      }
   })

   return map;
}

export default GetOrderDateMap;
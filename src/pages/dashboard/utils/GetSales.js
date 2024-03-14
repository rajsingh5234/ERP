const GetSales = (orders) => {
   if (!orders) 0;

   let totalSale = 0;

   orders?.forEach((order) => {
      totalSale += order.total_price;
   })

   return totalSale;
}

export default GetSales;
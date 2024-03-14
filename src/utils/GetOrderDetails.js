const GetOrderDetails = (orderData = [], products = []) => {
   let productsMap = {};

   products.forEach((product) => {
      productsMap[product.id] = product;
   })

   const orderDetails = orderData.map((order, i) => {
      let items = order.items;
      let total_price = 0;
      items = items.map((item) => {
         const productDetail = productsMap[item.product_id];
         let quantity = item.quantity;
         let price = productDetail.price;
         total_price += (quantity * price);

         return { ...item, productDetail }
      })

      return { ...order, items, total_price }
   })

   return orderDetails;
}

export default GetOrderDetails;
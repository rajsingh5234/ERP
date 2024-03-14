const GetUsers = (orders) => {
   if (!orders) return [];

   const users = new Set();

   orders?.forEach((order) => {
      users.add(order.customer_name);
   })

   return [...users];
}

export default GetUsers;
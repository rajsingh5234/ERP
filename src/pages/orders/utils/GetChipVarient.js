const GetChipVarient = (orderStatus) => {
   let varient = "green";

   if (!orderStatus) return varient

   if (orderStatus === "Shipped") {
      varient = "yellow";
   }
   else if (orderStatus === "Processing") {
      varient = "gray";
   }
   else {
      varient = "green";
   }

   return varient;
}

export default GetChipVarient;
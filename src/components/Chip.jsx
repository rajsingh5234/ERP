
const Chip = ({ text, varient = "green" }) => {

   const chipVarients = {
      green: "from-green-600 to-green-400",
      yellow: "from-yellow-600 to-yellow-400",
      gray: "from-gray-600 to-gray-400"
   }

   return (
      <div
         className={`grid place-items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr ${chipVarients[varient]} text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit`}
      >
         <span>{text}</span>
      </div>
   )
};

export default Chip;

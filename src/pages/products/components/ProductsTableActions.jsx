import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const ProductsTableActions = ({ onView = () => { }, onEdit = () => { }, onDelete = () => { } }) => {

   return (
      <div className="flex justify-center items-center gap-4">
         <button onClick={onView}>
            <EyeOutlined className='text-xl text-secondaryLite' />
         </button>
         <button onClick={onEdit}>
            <EditOutlined className='text-xl text-secondaryLite' />
         </button>
         <button onClick={onDelete}>
            <DeleteOutlined className='text-xl text-secondaryLite' />
         </button>
      </div>
   )
};

export default ProductsTableActions;

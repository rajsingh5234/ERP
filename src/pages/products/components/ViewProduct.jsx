import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const ViewProduct = ({ product = null, onEdit = () => { }, onDelete = () => { } }) => {

   return (
      <section className="bg-white py-10 px-2 sm:px-6 w-[90vw] max-h-[90vh] overflow-auto sm:max-w-[800px] rounded-lg flex flex-col md:flex-row items-center gap-4">
         <div className='max-w-[350px]'>
            <img className='object-cover rounded-lg' src={product.thumbnail} alt={product.title} />
         </div>
         <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl"
            >
               {product?.title || "-"}
            </h2>
            <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl">
               {product?.price ? `$${product.price}` : "-"}
            </p>
            <dl>
               <dt className="mb-2 font-semibold leading-none text-gray-900">Description</dt>
               <dd className="mb-4 text-[#607D8B] sm:mb-5">
                  {product?.description || "-"}
               </dd>
            </dl>
            <dl className="flex items-center space-x-6">
               <div>
                  <dt className="mb-2 font-semibold leading-none text-gray-900">Category</dt>
                  <dd className="mb-4 text-[#607D8B] sm:mb-5">{product?.category || "-"}</dd>
               </div>
               <div>
                  <dt className="mb-2 font-semibold leading-none text-gray-900">Stock</dt>
                  <dd className="mb-4 text-[#607D8B] sm:mb-5">{product?.stock || "-"}</dd>
               </div>
            </dl>
            <div className="flex items-center space-x-4">
               <button
                  type="button"
                  className="text-white inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary hover:bg-primary/90"
                  onClick={onEdit}
               >
                  <EditOutlined className='text-xl text-white' />
                  Edit
               </button>
               <button
                  type="button"
                  className="inline-flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => onDelete(product?.id)}
               >
                  <DeleteOutlined className='text-xl text-white' />
                  Delete
               </button>
            </div>
         </div>
      </section>
   )
};

export default ViewProduct;

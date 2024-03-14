import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, editProduct, setProductModalChild, setProductsModalVisibility, setSelectedProduct } from "../../redux/slices/productsSlice";
import CustomModal from "../../components/CustomModal";
import ProductsTableActions from "./components/ProductsTableActions";
import EditProduct from "./components/EditProduct";
import ViewProduct from "./components/ViewProduct";
import Table from "antd/lib/table";
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';

const Products = () => {
   const { products, productsModalVisibility, productModalChild, selectedProduct } = useSelector((state) => state.productsReducer);

   const dispatch = useDispatch();

   const onOpenModal = (modalChild, product) => {
      dispatch(setProductModalChild(modalChild));
      dispatch(setSelectedProduct(product));
      dispatch(setProductsModalVisibility(true));
   }

   const onCloseModal = () => {
      dispatch(setSelectedProduct(null));
      dispatch(setProductsModalVisibility(false));
   }

   const onAddProduct = (newProduct) => {
      dispatch(addProduct(newProduct));
      onCloseModal();
   }

   const onEditProduct = (updatedProduct) => {
      dispatch(editProduct(updatedProduct));
      onCloseModal();
   }

   const onDeleteProduct = (productId) => {
      if (productId === undefined || productId === null) return
      dispatch(deleteProduct(productId));
      onCloseModal();
   }

   const productModalChildren = {
      viewProduct: <ViewProduct
         product={selectedProduct}
         onEdit={() => onOpenModal("editProduct", selectedProduct)}
         onDelete={(productId) => onDeleteProduct(productId)}
      />,
      addProduct: <EditProduct onSubmit={onAddProduct} />,
      editProduct: <EditProduct product={selectedProduct} onSubmit={onEditProduct} />,
   }

   const ProductTableColumns = [
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Image</p>,
         width: 100,
         dataIndex: "title",
         key: "title",
         align: "center",
         ellipsis: true,
         render: (_, record) => (
            <div className="w-full grid place-items-center">
               <img
                  className="w-full sm:w-[114px] sm:h-[114px] object-cover"
                  src={record.thumbnail}
                  alt={record.title}
               />
            </div>
         ),
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Title</p>,
         width: 150,
         dataIndex: "title",
         key: "title",
         align: "left",
         ellipsis: true,
         render: (_, record) => (
            <span>
               <p className="text-[#263238] font-semibold">{record.title}</p>
               <span className="text-[#607D8B] text-sm font-semibold">{record.description}</span>
            </span>
         ),
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Brand</p>,
         width: 100,
         dataIndex: "brand",
         key: "brand",
         align: "center",
         ellipsis: true,
         sorter: (a, b) => a?.brand?.localeCompare(b?.brand),
         render: (text) => <span className="text-secondaryLite font-medium">{text}</span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Category</p>,
         width: 100,
         dataIndex: "category",
         key: "category",
         align: "center",
         ellipsis: true,
         sorter: (a, b) => a?.category?.localeCompare(b?.category),
         render: (text) => <span className="text-secondaryLite font-medium capitalize">{text}</span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Price</p>,
         dataIndex: "price",
         key: "price",
         width: 100,
         align: "center",
         ellipsis: true,
         sorter: (a, b) => a.price - b.price,
         render: (text) => <span className="text-secondaryLite font-medium">{text}</span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Stock</p>,
         dataIndex: "stock",
         key: "stock",
         width: 80,
         align: "center",
         ellipsis: true,
         render: (text) => <span className="text-secondaryLite font-medium">{text}</span>,
      },
      {
         title: <p className="text-secondary text-sm sm:text-[1rem] font-semibold">Actions</p>,
         dataIndex: "actions",
         key: "actions",
         width: 100,
         align: "center",
         ellipsis: true,
         render: (_, record) => <ProductsTableActions
            onView={() => onOpenModal("viewProduct", record)}
            onEdit={() => onOpenModal("editProduct", record)}
            onDelete={() => onDeleteProduct(record.id)}
         />,
      },
   ]

   return (
      <div className="mt-8 mb-8 flex flex-col gap-12">
         <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-primary to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
               <h6 className="flex justify-between items-center antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                  <span>Products</span>
                  <PlusCircleOutlined
                     className="text-xl text-white"
                     onClick={() => onOpenModal("addProduct", null)}
                  />
               </h6>
            </div>
            <div className="p-6 px-0 pt-0 pb-2">
               <Table
                  className='w-full'
                  columns={ProductTableColumns}
                  dataSource={products || []}
                  loading={products === null}
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
            productModalChild && productModalChildren[productModalChild] &&
            <CustomModal
               closable={true}
               open={productsModalVisibility}
               onCancel={onCloseModal}
            >
               {
                  productModalChildren[productModalChild]
               }
            </CustomModal>
         }
      </div>
   );
};

export default Products;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProductCategories from '../../../constants/ProductCategories';

const ProductSchema = Yup.object().shape({
   title: Yup.string().required('Required'),
   brand: Yup.string().required('Required'),
   description: Yup.string()
      .min(2, 'Too Short! - should be 2 chars minimum')
      .max(100, 'Too Long! - should be 100 chars maximum')
      .required('Required'),
   category: Yup.string().required('Required'),
   thumbnail: Yup.string().required('Required'),
   stock: Yup.number().required('Required'),
   price: Yup.number().required('Required'),
});

const EditProduct = ({ product = null, onSubmit = () => { } }) => {

   const initialState = {
      title: product?.title || "",
      brand: product?.brand || "",
      description: product?.description || "",
      category: product?.category || "",
      thumbnail: product?.thumbnail || "",
      stock: product?.stock || "",
      price: product?.price || "",
   }

   return (
      <section className="bg-white w-[90vw] h-[90vh] overflow-auto sm:max-w-[800px] rounded-lg">
         <div className="py-4 px-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">{product ? "Edit product" : "Add a new product"}</h2>

            <Formik
               enableReinitialize={true}
               initialValues={initialState}
               validationSchema={ProductSchema}
               onSubmit={(values) => onSubmit(values)}
            >

               {({ setFieldValue, values }) => (
                  <Form>
                     <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                           <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                           <Field
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              type="text"
                              name="title"
                              id="title"
                              placeholder="Type product name"
                           />
                           <ErrorMessage name="title" component="div" className="text-red-500" />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                           <label className="block text-sm font-medium text-gray-900">Product Image</label>
                           {values?.thumbnail && <img className="h-auto max-h-[200px]" src={values.thumbnail} alt={values.title} />}
                           <Field>
                              {() => (
                                 <input
                                    type="file"
                                    name="thumbnail"
                                    onChange={(event) => {
                                       setFieldValue("thumbnail", URL.createObjectURL(event.currentTarget.files[0]));
                                       event.currentTarget.value = ''
                                    }}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                 />
                              )}
                           </Field>
                           <ErrorMessage name="thumbnail" component="div" className="text-red-500" />
                        </div>

                        <div className="w-full">
                           <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                           <Field
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              type="text"
                              name="brand"
                              id="brand"
                              placeholder="Product brand"
                           />
                           <ErrorMessage name="brand" component="div" className="text-red-500" />
                        </div>
                        <div className="w-full">
                           <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                           <Field
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              type="number"
                              name="price"
                              id="price"
                              placeholder="$"
                           />
                           <ErrorMessage name="price" component="div" className="text-red-500" />
                        </div>
                        <div>
                           <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                           <Field as="select" name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                              <option value="">Select category</option>
                              {ProductCategories.map((category) => (
                                 <option key={category} value={category}>{category}</option>
                              ))}
                           </Field>
                           <ErrorMessage name="category" component="div" className="text-red-500" />
                        </div>
                        <div>
                           <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stocks</label>
                           <Field
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              type="number"
                              name="stock"
                              id="stock"
                              placeholder={12}
                           />
                           <ErrorMessage name="stock" component="div" className="text-red-500" />
                        </div>
                        <div className="sm:col-span-2">
                           <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                           <Field
                              as="textarea"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 resize-none"
                              name="description"
                              id="description"
                              rows={8}
                              placeholder="Product description here"
                           />
                           <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                     </div>
                     <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-primary hover:bg-primary/90"
                     >
                        {product ? "Edit" : "Add"}
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      </section>
   )
};

export default EditProduct;

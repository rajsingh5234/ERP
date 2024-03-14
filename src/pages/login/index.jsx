import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TOKEN, setLocalStorageItem } from "../../utils/LocalStroageManager";

const LoginSchema = Yup.object().shape({
   username: Yup.string().required('Required'),
   password: Yup.string().required('No password provided.')
});

const Login = () => {

   const initialValues = {
      username: 'Admin',
      password: '123',
   }

   const navigate = useNavigate();

   const onSubmitHandler = (values) => {
      setLocalStorageItem(TOKEN, "admin");
      navigate("/");
   }

   return (
      <div className="w-screen h-screen flex justify-center items-center p-2 bg-slate-100">
         <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onSubmitHandler}
         >
            {() => (
               <Form className="w-full sm:w-[500px] sm:max-w-[500px]">
                  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                     <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                           <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              Login
                           </p>
                           <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900">
                                 Your username
                              </label>
                              <Field
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                 placeholder="Admin"
                                 type="text"
                                 name="username"
                                 id="username"
                              />
                              <ErrorMessage name="username" component="div" className="text-red-500" />
                           </div>
                           <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900">
                                 Password
                              </label>
                              <Field
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                 placeholder="••••••••"
                                 type="password"
                                 name="password"
                                 id="password"
                              />
                              <ErrorMessage name="password" component="div" className="text-red-500" />
                           </div>
                           <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                              Login
                           </button>
                        </div>
                     </div>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   )
};

export default Login;

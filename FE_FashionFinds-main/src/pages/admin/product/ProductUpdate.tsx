
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../interface/Product";
import { ICategory } from "../../../interface/Category";

import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getAllCategory } from "../../../actions/category";
import { getProductById, updateProduct } from "../../../actions/product";

const ProductUpdate = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state: any) => state.categories);
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IProduct>();
  const { products } = useAppSelector((state) => state.products)
  const { id } = useParams<{ id: any }>()
  const navigate = useNavigate()
  const { product } = products;

  useEffect(() => {
    dispatch(getAllCategory());
  }, [])
  useEffect(() => {
    dispatch(getProductById(id)).unwrap().then((data) => reset(data.product));
  }, []);

  const onSubmit = async (values: IProduct) => {
    const productUpdate = {
      _id: id,
      ...values,
    };
    try {
      dispatch(updateProduct(productUpdate)).unwrap();
      navigate('/admin/products')
    } catch (error: any) {
      console.log(error.message);

    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit as any)} >
      <div className="relative overflow-x-auto sm:rounded-lg mb-5">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="category" className="font-bold text-19">
              Danh mục
            </label>{" "}
            <br />
            <select {...register("categoryId", { required: "Danh mục Không được bỏ trống" })} defaultValue={product?.categoryId} className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16">
              {categories?.docs?.map((category: ICategory) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                )
              })}

            </select>
            <div className="text-red-500">{errors.categoryId?.message}</div>
          </div>
          <div>
            <label htmlFor="product_name" className="font-bold text-19">
              Tên sản phẩm
            </label>{" "}
            <br />
            <input
              defaultValue={product?.product_name}
              type="text"
              {...register("product_name", { required: "Tên sản phẩm không được bỏ Trống", minLength: { value: 5, message: "Tối thiểu 5 kí tự" } })}
              id="product_name"
              placeholder="Tên sản phẩm ..."
              className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            />
            <div className="text-red-500">{errors.product_name && errors.product_name.message}</div>
          </div>
          <div>
            <label htmlFor="product_images" className="font-bold text-19">
              Ảnh
            </label>{" "}
            <br />
            <input
              type="text"
              {...register("product_images", { required: "Images Không được bỏ trống" })}
              defaultValue={product?.product_images}
              className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            />
            <div className="text-red-500">{errors.product_images?.message}</div>
          </div>
          <div>
            <label htmlFor="product_price" className="font-bold text-19">
              Giá
            </label>{" "}
            <br />
            <input
              type="number"
              defaultValue={product?.product_price}
              {...register("product_price", { required: "Giá không được bỏ trống " })}
              className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            />
            <div className="text-red-500">{errors.product_price?.message}</div>
          </div>
         
         
 
          <div>
            <label htmlFor="product_description" className="font-bold text-19">
              Mô tả
            </label>{" "}
            <br />
            <textarea
              defaultValue={product?.product_description_long}
              {...register("product_description", { required: "Mô tả Không được bỏ trống ", minLength: { value: 6, message: "Tối thiểu 6 kí tự" } })}
              cols={30}
              rows={10}
              placeholder="Mô tả..."
              className="col-span-2 shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16"
            ></textarea>
            <div className="text-red-500">{errors.product_description && errors.product_description.message}</div>
          </div>
        </div>
      </div>
      <div className="mb-4">
      <Link to="/admin/products" className="bg-blue-500 px-2 py-2 duration-200 hover:bg-blue-700 cursor-pointer rounded-md text-white">
          DANH SÁCH SẢN PHẨM
        </Link>
        <button
          type="submit"
          className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white"
        >
          Update
        </button>
      </div>
    </form >
  );
};

export default ProductUpdate;

import { useForm } from "react-hook-form";
import { IPost } from "../../../interface/Post";

import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from "../../../store/hook";
import { addPost } from "../../../actions/post";  // Đảm bảo import action tương ứng
import { useNavigate } from "react-router-dom";

const PostAdd = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<IPost>();
    const navigate = useNavigate();

    const onHandleSubmit = async (post: IPost) => {
        try {
            await dispatch(addPost(post)).unwrap();
            navigate("/admin/posts");
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="relative overflow-x-auto sm:rounded-lg mb-5">
                    <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="" className="font-bold text-[19px]">Post name</label> <br />
                            <input
                                type="text"
                                {...register("post_name", { required: "Tiêu đề không được bỏ trống", minLength: { value: 6, message: "Tối thiểu 6 kí tự" } })}
                                placeholder="Title ..."
                                className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-[16px]"
                            />
                            <div className="text-red-500">{errors.post_name && errors.post_name?.message}</div>
                        </div>
                        <div>
                            <label htmlFor="" className="font-bold text-[19px]">Ảnh</label> <br />
                            <input type="text"  {...register("post_images", { required: "Image không được bỏ trống" })}
                                className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]" />
                            <div className="text-red-500">{errors.post_images?.message}</div>
                        </div>
                        <div>
                            <label htmlFor="" className="font-bold text-[19px]">Nội dung bài viết</label> <br />
                            <textarea
                                {...register("post_content", { required: "Nội dung không được bỏ trống", minLength: { value: 10, message: "Tối thiểu 10 kí tự" } })}
                                placeholder="Content ..."
                                className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-[16px] resize-none"
                            />
                            <div className="text-red-500">{errors.post_content && errors.post_content?.message}</div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <a
                        className="bg-blue-500 px-2 py-2 duration-200 hover:bg-blue-700 cursor-pointer rounded-md text-white"
                    >
                        DANH SÁCH BÀI VIẾT
                    </a>
                    <button
                        type="submit"
                        className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white"
                    >
                        THÊM
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostAdd;

import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { deletePost, getAllPosts } from "../../../actions/post";
import { toast } from "react-toastify";

const PostList = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state: any) => state.posts);
  const [totalItems, setTotalItem] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllPosts());
    setCurrentPage(posts?.totalPages);
    setTotalItem(posts?.totalDocs);
    console.log(posts);
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (_id: string) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa?");
    if (confirm) {
      try {
        await dispatch(deletePost(_id));
        toast.success("Xóa bài viết thành công!");
      } catch (error) {
        toast.error("Xóa bài viết thất bại!");
      }
    }
  };

  return (
    <div>
      <Link
        to="/admin/posts/add"
        className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700 duration-200"
      >
        THÊM BÀI VIẾT
      </Link>
      <h1 className="text-center text-[24px]">Danh sách bài viết</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="max-w-[30px] py-3">
                Id
              </th>
              <th scope="col" className="max-w-[30px] py-3">
                Tiêu đề
              </th>
              <th scope="col" className="max-w-[80px] py-3">
                Ảnh
              </th>
              <th scope="col" className="max-w-[30px] py-3">
                Ngày tạo
              </th>
              <th scope="col" className="max-w-[30px] py-3">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            {posts?.docs?.map((item: any, index: string) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index}
                </td>
                <td className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.post_title}
                </td>
                <td className="py-4 max-w-[100px] max-h-[100px] text-center">
                  <Image width={80} height={100} src={item?.post_images} />
                </td>

                <td
                  scope="row"
                  className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.createdAt}
                </td>
                <td className="max-w-[30px] py-4">
                  <Link to={`/admin/posts/${item._id}`} className="text-black">
                    <i className="fa-regular fa-eye"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="font-medium px-2 text-red-400 text-[20px] duration-100 hover:text-red-600 hover:underline"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link
                    to={`/admin/posts/${item._id}/update`}
                    className="font-medium text-yellow-400 text-[20px] duration-100 hover:text-yellow-600 hover:underline"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current={currentPage}
          total={totalItems}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PostList;

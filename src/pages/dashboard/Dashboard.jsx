import React, { Suspense, useEffect, useState } from "react";
import add from "../../assets/img/add.svg";
import deleteImg from "../../assets/img/delete.svg";
import edit from "../../assets/img/edit-02.svg";
import x_close from "../../assets/img/x-close.svg";
import "./style.css";
import AllOrders from "../../components/allOrders";
import { useForm } from "react-hook-form";
import { Dropdown, Modal, Spin } from "antd";
import axiosT from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [users, setUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axiosT.get("/api/users?page=2").then(({ data }) => {
      console.log(data.data);
      setUsers(data.data);
    });
  }, []);

  const { confirm } = Modal;
  const showConfirm = (id) => {
    console.log(id);
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk() {
        axiosT.delete("/api/login", id).then((data) => {
          console.log(data);
          toast.info(
            `Foydalanuvchi muvaffaqqiyatli o'chirildi. Status: ${data.status}`
          );
        });
      },
      onCancel() {
        // setOpen(false);
      },
    });
  };
  const addUserFunction = (user) => {
    console.log(user);
    axiosT
      .post("/api/users", user)
      .then((data) => {
        console.log(data);
        setIsModalOpen(false);
        reset();
        toast.success(
          `Yangi foydalanuvchi muvaffaqqiyatli qo'shildi. Status: ${data.status}. Foydalanuvchi ID si: ${data.data.id}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editUserFunction = (user) => {
    console.log(user, editId);
    axiosT.put(`/api/users/${editId}`, user).then((data) => {
      console.log(data);
      setIsModalEditOpen(false);
      reset();
      toast.success(
        `Foydalanuvchi muvaffaqqiyatli o'zgartirildi. Status: ${data.status}.`
      );
    }).catch((error) => {console.log(error)});
  };
  return (
    <>
      <div className="flex gap-0">
        <ToastContainer />
        <AllOrders />
        <div className="w-[80vw] border h-[100dvh]">
          <div className="flex justify-between items-center h-[70px] px-[20px] border-b-[1px]">
            <h3 className="font-medium text-xl">Все водители</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 flex items-center gap-1 px-3 py-2 rounded-lg text-white"
            >
              <img src={add} alt="" />
              Добавить
            </button>
          </div>
          <div className="custom_height p-5">
            <div fallback={<Spin />} className="custom_height-1 p-4 rounded">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 border text-center">
                      №
                    </th>
                    <th scope="col" className="px-6 py-3 border">
                      ID водителя
                    </th>
                    <th scope="col" className="px-6 py-3 border">
                      First_name водителя
                    </th>
                    <th scope="col" className="px-6 py-3 border">
                      Last_name водителя
                    </th>
                    <th scope="col" className="px-6 py-3 border">
                      Email водителя
                    </th>
                    <th scope="col" className="px-6 py-3 border">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => {
                    return (
                      <tr
                        key={user.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="text-center px-6 py-4 font-normal text-gray-700 whitespace-nowrap dark:text-white border"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4 border font-normal text-gray-700">
                          {user?.id}
                        </td>
                        <td className="px-6 py-4 border font-normal text-gray-700">
                          {user?.first_name}
                        </td>
                        <td className="px-6 py-4 border font-normal text-gray-700">
                          {user?.last_name}
                        </td>
                        <td className="px-6 py-4 border font-normal text-gray-700">
                          {user?.email}
                        </td>
                        <td className="px-6 py-4 border">
                          <Dropdown
                            className="col-span-1 justify-self-end"
                            menu={{
                              items: [
                                {
                                  label: (
                                    <button
                                      className="flex items-center gap-2 border-b-[1px] pb-3"
                                      onClick={() => {
                                        setEditId(user?.id);
                                        setIsModalEditOpen(true);
                                      }}
                                    >
                                      <div className="p-2 bg-green-100 rounded flex items-center justify-center">
                                        <img src={edit} alt="" />
                                      </div>
                                      Редактировать
                                    </button>
                                  ),
                                  key: "0",
                                },
                                {
                                  label: (
                                    <button
                                      className="flex items-center gap-2"
                                      onClick={showConfirm.bind(null, user.id)}
                                    >
                                      <div className="p-2 bg-red-100 rounded flex items-center justify-center">
                                        <img src={x_close} alt="" />
                                      </div>
                                      Удалить
                                    </button>
                                  ),
                                  key: "1",
                                },
                              ],
                            }}
                            placement="bottomRight"
                          >
                            <div className="flex justify-center items-center w-[30px] h-[30px] border rounded bg-white">
                              <img
                                style={{ cursor: "pointer" }}
                                src={deleteImg}
                                className="w-[]"
                                alt=""
                              />
                            </div>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Все водители"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(addUserFunction)}>
          <div className="flex flex-col mb-4">
            <label className="text-xs font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Введите города"
              className="border w-[100%] p-3 rounded"
              {...register("name", { required: true })}
              id="name"
            />
            {errors.name && <p className="text-[red]">This is required.</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-xs font-medium mb-2" htmlFor="job">
              Job
            </label>
            <input
              placeholder="Введите сумма вне города"
              className="border w-[100%] p-3 rounded"
              {...register("job", { required: true })}
              id="job"
            />
            {errors.name && <p className="text-[red]">This is required.</p>}
          </div>
          <button
            type="submit"
            className="bg-green-600 w-[100px] ml-auto flex items-center justify-center px-3 py-2 rounded-lg text-white"
          >
            Add user
          </button>
        </form>
      </Modal>
      <Modal
        title="Edit Modal"
        open={isModalEditOpen}
        onOk={() => {
          setIsModalEditOpen(false);
        }}
        onCancel={() => {
          setIsModalEditOpen(false);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(editUserFunction)}>
          <div className="flex flex-col mb-4">
            <label className="text-xs font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Введите города"
              className="border w-[100%] p-3 rounded"
              {...register("name", { required: true })}
              id="name"
            />
            {errors.name && <p className="text-[red]">This is required.</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-xs font-medium mb-2" htmlFor="job">
              Job
            </label>
            <input
              placeholder="Введите сумма вне города"
              className="border w-[100%] p-3 rounded"
              {...register("job", { required: true })}
              id="job"
            />
            {errors.name && <p className="text-[red]">This is required.</p>}
          </div>
          <button
            type="submit"
            className="bg-green-600 w-[100px] ml-auto flex items-center justify-center px-3 py-2 rounded-lg text-white"
          >
            Edit user
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;

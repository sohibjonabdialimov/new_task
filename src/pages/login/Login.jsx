import React from "react";
import { useForm } from "react-hook-form";
import login from "../../assets/img/login.jpg";
import "./login.css";
import axiosT from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axiosT.post("/api/login", data).then(({ data }) => {
      if (data.token) {
        localStorage.setItem("access_token", data.token);
        reset();
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="flex w-100 h-100">
      <img
        className="w-1/2 h-[100dvh] object-cover"
        src={login}
        alt="login image"
      />
      <form
        className="w-1/2 flex h-[100dvh] items-center flex-col content-between justify-between py-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-4xl">Вход в систему</h2>
        <div className="w-3/4">
          <div className="flex flex-col mb-4">
            <label className="text-xl font-medium mb-2" htmlFor="email">
              Логин
            </label>
            <input
              placeholder="Введите логин"
              className="border w-[100%] p-3 rounded"
              {...register("email", { required: true })}
              id="email"
            />
            {errors.email && <p className="text-[red]">Email is required.</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="Пароль" className="text-xl font-medium mb-2">
              Пароль
            </label>
            <input
              id="Пароль"
              placeholder="Введите пароль"
              className="border w-[100%] p-3 rounded"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-[red]">Password is required</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-3/4 bg-green-600 text-white p-3 rounded"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;

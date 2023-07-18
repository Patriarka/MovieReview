import React, { useEffect, useState } from "react";

// import api from "../../api.js";

import { Form, message } from "antd";

import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { StyledButton, StyledInput } from "../../styles/pages/LoginStyles.js";

import { useNavigate } from "react-router-dom";

// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch } from "react-redux";
import { login } from "../../authActions.js";

const Login = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    setLoading(true);

    const { error } = await dispatch(login(data));

    setLoading(false);

    if (error) {
      console.log("Erro:", error);
      message.error("Falha no Login, tente novamente.");
    } else {
      console.log("Login bem-sucedido");
      navigate(`/`);
    }
  };

  return (
    <div className="container max-w-[1580px] mx-auto h-screen flex">
      <div className="w-1/2 hidden sm:block">
        <img
          src="https://www.themoviedb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full sm:w-1/2 flex justify-center items-center h-screen">
        <Form form={form} onFinish={handleLogin} className="w-full p-4 sm:p-16">
          <div className="mb-12">
            <h1 className="text-2xl font-bold ml-2">Realizar Login</h1>
          </div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Digite seu email" }]}
          >
            <StyledInput prefix={<MailOutlined />} placeholder={"Email"} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <StyledInput.Password
              prefix={<LockOutlined />}
              placeholder={"Senha"}
            />
          </Form.Item>
          <Form.Item>
            <StyledButton loading={loading} type="primary" htmlType="submit">
              Entrar
            </StyledButton>
          </Form.Item>
          <div className="flex gap-2">
            <p className="text-gray-500">Não tem uma conta?</p>
            <a className="text-blue-500" href="/signup">
              Registre-se
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

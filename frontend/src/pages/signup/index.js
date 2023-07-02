import React, { useState } from "react";

import api from "../../api.js";

import { Form, DatePicker, message } from "antd";

import locale from "antd/es/date-picker/locale/pt_BR";

import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

import { StyledButton, StyledInput } from "../../styles/pages/SignUpStyles.js";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (values) => {
    setLoading(true);

    const data = {
      full_name: values.fullName,
      nickname: values.username,
      bio_text: values.bioText,
      birth_date: values.birthDate.format("DD-MM-YYYY"),
      email: values.email,
      password: values.password,
    };

    try {
      await api.post("/usuarios/", data);

      setLoading(false);

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        message.error("O e-mail informado já está cadastrado.");
      } else {
        message.error("Falha no cadastro, tente novamente.");
      }
      
      setLoading(false);
    }
  };

  const validationRules = {
    fullName: [{ required: true, message: "Nome Completo é obrigatório" }],
    username: [{ required: true, message: "Nome de Usuário é obrigatório" }],
    bioText: [{ required: true, message: "Texto da bio é obrigatório" }],
    email: [
      { required: true, message: "Email é obrigatório" },
      { type: "email", message: "Email inválido" },
    ],
    birthDate: [
      { required: true, message: "Data de Nascimento é obrigatória" },
    ],
    password: [{ required: true, message: "Senha é obrigatória" }],
    confirmPassword: [
      { required: true, message: "Confirmar Senha é obrigatório" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("As senhas não coincidem");
        },
      }),
    ],
  };

  const disabledDate = (current) => {
    const currentDate = new Date();

    return current && current > currentDate;
  };

  return (
    <div className="container max-w-[1580px] mx-auto h-screen flex">
      <div className="w-1/2 hidden sm:block">
        <img
          src="https://www.themoviedb.org/t/p/original/f2ral8b5FoWsXyFbQ7928ZPjUm3.jpg"
          alt="Imagem"
          class="object-cover w-full h-full"
        />
      </div>
      <div className="w-full sm:w-1/2 flex justify-center items-center h-max">
        <Form form={form} onFinish={handleSignup} className="w-full p-4 sm:p-16">
          <div className="mb-12">
            <h1 className="text-2xl font-bold ml-2">Realizar Cadastro</h1>
          </div>
          <Form.Item name="fullName" rules={validationRules.fullName}>
            <StyledInput
              prefix={<UserOutlined />}
              placeholder={"Nome Completo"}
            />
          </Form.Item>
          <Form.Item name="username" rules={validationRules.username}>
            <StyledInput
              prefix={<UserOutlined />}
              placeholder={"Nome de Usuário"}
            />
          </Form.Item>
          <Form.Item name="bioText" rules={validationRules.bioText}>
            <StyledInput prefix={<UserOutlined />} placeholder={"Bio"} />
          </Form.Item>
          <Form.Item name="email" rules={validationRules.email}>
            <StyledInput prefix={<MailOutlined />} placeholder={"Email"} />
          </Form.Item>
          <Form.Item name="birthDate" rules={validationRules.birthDate}>
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              locale={locale}
              placeholder={"Data de Nascimento"}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item name="password" rules={validationRules.password}>
            <StyledInput.Password
              prefix={<LockOutlined />}
              placeholder={"Senha"}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={validationRules.confirmPassword}
          >
            <StyledInput.Password
              prefix={<LockOutlined />}
              placeholder={"Confirmar Senha"}
            />
          </Form.Item>
          <Form.Item>
            <StyledButton loading={loading} type="primary" htmlType="submit">
              Registrar
            </StyledButton>
          </Form.Item>
          <div className="flex gap-2">
            <p className="text-gray-500">Já tem uma conta?</p>
            <a className="text-blue-500" href="/login">Entrar</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

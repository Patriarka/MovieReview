import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";

import { Modal, Form, Input } from "antd";

import api from "../../api";

import { useSelector } from "react-redux";

import { UserOutlined } from "@ant-design/icons";

import {
  StyledButton,
  StyledInput,
  StyledSecondaryButton,
} from "../../styles/pages/EditProfileStyles.js";

import { AiOutlineFileText } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();

  const navigate = useNavigate();

  const userId = useSelector((state) => state.userId);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    nickname: "",
    bioText: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `/usuarios/${userId}/`;
        const response = await api.get(url);
        const { full_name, nickname, bio_text, email } = response.data;

        setUser({
          fullname: full_name,
          nickname,
          email,
          bioText: bio_text,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfile = async (values) => {
    const formData = new FormData();

    formData.append("full_name", values.fullname);
    formData.append("nickname", values.username);
    formData.append("bio_text", values.bioText);

    setLoading(true);

    try {
      const url = `/usuarios/${userId}/`;
      api.patch(url, formData);

      setLoading(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"2"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <Form
            form={form}
            onFinish={handleEditProfile}
            className="max-w-[80%] mx-auto pt-8"
            layout="vertical"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Editar Perfil</h1>
            </div>

            {user.fullname && (
              <Form.Item
                name="fullname"
                label="Nome completo"
                initialValue={user?.fullname}
              >
                <StyledInput prefix={<UserOutlined />} />
              </Form.Item>
            )}

            {user?.nickname && (
              <Form.Item
                name="username"
                label="Nome de Usuário"
                initialValue={user?.nickname}
              >
                <StyledInput prefix={<UserOutlined />} />
              </Form.Item>
            )}

            {user.bioText && (
              <Form.Item 
                name="bioText" 
                label="Bio" 
                initialValue={user.bioText}
              >
                <StyledInput prefix={<AiOutlineFileText />} />
              </Form.Item>
            )}

            <div className="w-full flex justify-between">
              <StyledSecondaryButton onClick={showModal}>
                Alterar Senha
              </StyledSecondaryButton>

              <StyledButton loading={loading} type="primary" htmlType="submit">
                Salvar Alterações
              </StyledButton>
            </div>
          </Form>

          <Modal
            title="Alterar Senha"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <StyledSecondaryButton key="cancel" onClick={handleCancel}>
                Cancelar
              </StyledSecondaryButton>,
              <StyledButton
                key="submit"
                loading={loading}
                type="primary"
                form="passwordForm"
                htmlType="submit"
              >
                Salvar Senha
              </StyledButton>,
            ]}
          >
            <Form form={passwordForm} id="passwordForm" layout="vertical">
              <Form.Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira sua senha atual",
                  },
                ]}
              >
                <Input.Password placeholder="Senha Atual" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a nova senha",
                  },
                ]}
              >
                <Input.Password placeholder="Nova Senha" />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Por favor, confirme a nova senha",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("As senhas não conferem")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirma Senha" />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default EditProfile;

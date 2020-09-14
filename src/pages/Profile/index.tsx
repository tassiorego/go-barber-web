/* eslint-disable react/jsx-one-expression-per-line */
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];

        if (file) {
          const data = new FormData();
          data.append('avatar', file);

          api.patch('/users/avatar', data).then(response => {
            addToast({
              type: 'success',
              title: 'Foto atualizada com sucesso',
            });
            updateUser(response.data);
          });
        }
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: value => !!value,
            then: Yup.string().required(
              'Para mudar a senha nova senha deve ser informada',
            ),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: value => !!value,
            then: Yup.string()
              .required('Para mudar a senha nova senha deve ser informada')
              .oneOf([Yup.ref('password'), null], 'As senha não confere '),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const FormData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/users/profile', FormData);

        updateUser(response.data);

        addToast({
          title: 'Perfil atualizado',
          description: 'Suas informações do pefilforam atualizadas com sucesso',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao tentar atualizar seu perfil, verifique os campos e tente novamente',
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
            old_password: '',
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu Perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            autoComplete="off"
            icon={FiLock}
            placeholder="Senha Atual"
          />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            autoComplete="off"
            placeholder="Nova Senha"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            autoComplete="off"
            placeholder="Confirmar Senha"
          />
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;

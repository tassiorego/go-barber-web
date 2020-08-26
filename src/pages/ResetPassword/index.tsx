import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import { Container, Background, Content } from './styles';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senha não confere ',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        const { password, password_confirmation } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Envie um novo e-mail para resetar sua senha ou contate o suporte',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Compre Local" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="Confirmação de senha"
          />
          <Button type="submit">Alterar senha</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;

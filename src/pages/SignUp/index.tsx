/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiLogOut } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { Container, Background, Content } from './styles';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(8, 'São necessários 8 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        addToast({
          title: 'Sucesso!',
          description: 'Agora você pode receber seus agendamentos',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: err.message,
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Compre Local" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <p>
            Criar uma conta significa que você concorda com nossos{' '}
            <a href="/terms-of-service">Termos de Serviço</a> e{' '}
            <a href="/privacity-politcs">políticas de privacidade</a>.
          </p>
        </Form>
        <Link to="/">
          <FiLogOut />
          Já tenho conta
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;

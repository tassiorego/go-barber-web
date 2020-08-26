import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Background, Content } from './styles';

import logo from '../../assets/logo.svg';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, confira sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de erros',
          description: 'Ocorreu um erro ao recuperar sua senha',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Compre Local" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Button loading={loading} type="submit">
            Recuperar
          </Button>
        </Form>
        <Link to="/">
          <FiLogIn />
          Voltar ao login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;

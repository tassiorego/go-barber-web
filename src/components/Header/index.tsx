import React from 'react';
import { FiPower } from 'react-icons/fi';
import logImage from '../../assets/logo.svg';

import { Container, HeaderContent, Profile } from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <HeaderContent>
        <img src={logImage} alt="Logo" />
        <Profile>
          <img src={user.avatar_url} alt={user.name} />
          <div>
            <span>Bem-vindo,</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>
        <button onClick={() => signOut()} type="button">
          <FiPower />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;

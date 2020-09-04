import React from 'react';

import { FiClock } from 'react-icons/fi';
import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/16306897?s=460&u=85bef6fdb9597a9762d8463aee130366024bb032&v=4"
                alt="Tássio Rego"
              />
              <strong>Tássio Rego</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/16306897?s=460&u=85bef6fdb9597a9762d8463aee130366024bb032&v=4"
                  alt="Tássio Rego"
                />
                <strong>Tássio Rego</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/16306897?s=460&u=85bef6fdb9597a9762d8463aee130366024bb032&v=4"
                  alt="Tássio Rego"
                />
                <strong>Tássio Rego</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/16306897?s=460&u=85bef6fdb9597a9762d8463aee130366024bb032&v=4"
                  alt="Tássio Rego"
                />
                <strong>Tássio Rego</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/16306897?s=460&u=85bef6fdb9597a9762d8463aee130366024bb032&v=4"
                  alt="Tássio Rego"
                />
                <strong>Tássio Rego</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;

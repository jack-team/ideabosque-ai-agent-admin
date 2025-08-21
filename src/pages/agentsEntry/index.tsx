import { type FC } from 'react';
import Agents from '../agents';
import Coordinations from '../coordinations';

const AgentsEntry: FC = () => {
  return (
    <div>
      <Agents />
      <Coordinations />
    </div>
  );
}

export default AgentsEntry;
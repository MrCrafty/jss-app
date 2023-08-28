import { Default } from './About';
import { data } from './About.mock';

const meta = {
  title: 'About',
  component: Default,
  tags: ['autodocs'],
};

export const Home = () => <Default {...data} />;

export default meta;

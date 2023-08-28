import { About } from './About';
import { data } from './About.mock';

const meta = {
  title: 'About',
  component: About,
  tags: ['autodocs'],
};

export const Default = () => <About {...data} />;

export default meta;

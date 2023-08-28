import { Default } from './Header';
import { data } from './Header.mock';

const meta = {
  Title: 'Feature/Breadcrumb',
  component: Default,
};

export const Home = () => <Default {...data} />;

export default meta;

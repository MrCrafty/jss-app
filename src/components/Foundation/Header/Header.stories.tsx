import { Header } from './Header';
import { data } from './Header.mock';

const meta = {
  Title: 'Feature/Breadcrumb',
  component: Header,
};

export const Default = () => <Header {...data} />;

export default meta;

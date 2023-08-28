import { Breadcrumb } from './Breadcrumb';
import { data } from './Breadcrumb.mock';

const meta = {
  Title: 'Breadcrumb',
  component: Breadcrumb,
};

export const Default = () => <Breadcrumb {...data} />;

export default meta;

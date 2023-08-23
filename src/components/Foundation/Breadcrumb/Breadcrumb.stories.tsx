import { Default } from './Breadcrumb';
import { data } from './Breadcrumb.mock';

const meta = {
  Title: 'Breadcrumb',
  component: Default,
};

export const Page = () => <Default {...data} />;

export default meta;

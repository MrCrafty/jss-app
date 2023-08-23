import { Default } from './Banner';
import { data } from './Banner.mock';

const meta = {
  Title: 'Breadcrumb',
  component: Default,
};

export const Page = () => <Default {...data} />;

export default meta;

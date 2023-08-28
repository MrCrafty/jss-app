import { Banner } from './Banner';
import { data } from './Banner.mock';

const meta = {
  Title: 'Breadcrumb',
  component: Banner,
};

export const Default = () => <Banner {...data} />;

export default meta;

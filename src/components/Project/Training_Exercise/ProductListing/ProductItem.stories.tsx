import { ProductItem } from './ProductItem';
import { data } from './ProductItem.mock';

const meta = {
  title: 'ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
};

export const Default = () => (
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-14">
    <ProductItem {...data} />
  </div>
);

export default meta;

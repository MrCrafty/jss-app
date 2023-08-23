import { BreadcrumbProps } from './Breadcrumb';

export const data: BreadcrumbProps = {
  fields: {
    data: {
      item: {
        field: {
          Title: {
            value: 'Products',
          },
        },
        path: '/sitecore/content/training-exercise/training-exercise/Home/Categories/Products',
        ancestors: [
          {
            field: {
              Title: {
                value: 'Categories',
              },
            },
            path: '#',
          },
          {
            field: {
              Title: {
                value: 'Home',
              },
            },
            path: '#',
          },
        ],
      },
      rootPath: {
        siteInfo: {
          rootPath: '/sitecore/content/training-exercise/training-exercise',
        },
      },
    },
  },
};

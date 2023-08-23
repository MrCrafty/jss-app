import { HeaderProps } from './Header';

export const data: HeaderProps = {
  fields: {
    Logo: {
      value: { src: 'https://www.dummyimage.com/150x70' },
    },
    NavigationLinks: [
      {
        displayName: 'Home',
        id: '1',
        name: 'Home',
        url: '/',
        fields: {
          Title: { value: 'Home' },
        },
      },
      {
        displayName: 'About',
        id: '1',
        name: 'About',
        url: '/',
        fields: {
          Title: { value: 'About' },
        },
      },
    ],
  },
};

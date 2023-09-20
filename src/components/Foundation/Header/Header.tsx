import React, { useEffect, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageField,
  ImageFieldValue,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserAccountButtons from './UserAccountButtons';
import { FaXmark } from 'react-icons/fa6';
import CartProductItem from './CartProductItem';

interface Fields {
  Title: Field<string>;
}

export interface Links {
  displayName: string;
  id: string;
  name: string;
  url: string;
  fields: Fields;
}

export interface HeaderProps {
  rendering?: ComponentRendering & { params: ComponentParams };
  params?: ComponentParams;
  fields: {
    Logo: ImageField;
    NavigationLinks: Links[];
  };
}
interface ProductsProps {
  data: {
    item: {
      children: {
        results: {
          ProductId: {
            value: string;
          };
          Title: {
            value: string;
          };
          Price: {
            value: string;
          };
          Image: {
            jsonValue: Field<ImageFieldValue>;
          };
        }[];
      };
    };
  };
}

export const Default = ({ fields }: HeaderProps): JSX.Element => {
  const router = useRouter();
  const currentPage = router.asPath;
  const [IsLogin, setIsLogin] = useState<boolean>(true);
  const [SideBarOpen, setSideBarOpen] = useState(false);
  const [Cart, setCart] = useState<Object>({});
  const [Products, setProducts] = useState<ProductsProps>();
  const [TotalCost, setTotalCost] = useState(0);

  const bodyScrollLock = () => {
    document.body.style.height = '100%';
    document.body.style.overflowY = 'scroll';
  };
  const bodyScrollUnlock = () => {
    document.body.style.removeProperty('height');
    document.body.style.removeProperty('overflow');
  };

  useEffect(() => {
    SideBarOpen ? bodyScrollLock() : bodyScrollUnlock();
  }, [SideBarOpen]);

  useEffect(() => {
    axios.get('/api/auth/IsLogin').then((data) => {
      setIsLogin(data.data.IsLogin);
    });
    axios.get('/api/data/getProducts').then((data) => {
      setProducts(data.data);
    });
    axios.get('/api/cart/getcart').then((data) => {
      if (typeof data.data.data == 'object') {
        setCart(data.data.data);
      }
    });
  }, []);
  const handleLogout = () => {
    axios.post('/api/auth/logout').then(() => {
      ('');
    });
    window.location.href = '/login';
  };
  const imageURL = String(fields?.Logo?.value?.src)?.replace(
    'https://sc-jss-playgroundsc.dev.local/',
    'https://square-termite-set.ngrok-free.app/'
  );
  let imageField = { ...fields?.Logo?.value, src: imageURL };
  return (
    <div className="relative font-Poppins">
      <div className="main-nav relative z-10 bg-zinc-50">
        <nav className="container  mx-auto flex justify-between bg-zinc-50 py-5">
          <div className="my-auto w-auto">
            <Link href={'/'}>
              <Image field={imageField} className="w-full" />
            </Link>
          </div>
          <ul className="flex flex-row items-center gap-5 font-Poppins text-2xl">
            {fields?.NavigationLinks?.map((element, index) => {
              return (
                <li className="nav-item" key={index}>
                  {
                    <Link
                      href={element.url}
                      className={` text-black transition-all ${
                        element.url == currentPage
                          ? 'cursor-default text-4xl font-extrabold hover:text-black'
                          : 'hover:text-blue-500'
                      }`}
                    >
                      <Text field={element.fields.Title} />
                    </Link>
                  }
                </li>
              );
            })}
            {
              <UserAccountButtons
                handleLogout={handleLogout}
                IsLogin={IsLogin}
                currentPage={currentPage}
                SideBarOpen={SideBarOpen}
                setSideBarOpen={setSideBarOpen}
              />
            }
          </ul>
        </nav>
      </div>
      {/*==============================Sidebar Cart==============================*/}
      <div
        onClick={() => {
          setSideBarOpen(!SideBarOpen);
        }}
        className={`sidebar fixed left-0 top-0 z-20 ${
          SideBarOpen ? 'w-full' : 'hidden'
        } h-screen bg-black opacity-60`}
      ></div>
      <div
        className={`sidebar fixed right-0 top-0 z-20 overflow-hidden  transition-all ${
          SideBarOpen ? 'w-3/12 ' : 'w-0'
        } h-screen bg-black`}
      >
        <div className="mx-auto w-10/12">
          <div className="sidebar-head mt-10 flex justify-end">
            <FaXmark
              className="cursor-pointer text-5xl text-white"
              onClick={() => {
                setSideBarOpen(false);
              }}
            />
          </div>
          <div className="sidebar-body text-white">
            <h3 className="border-b-[1px] pb-3 text-6xl">Cart</h3>
          </div>
          <div className="text-white">
            {Object.keys(Cart).length != 0 ? (
              Products?.data?.item?.children?.results?.map((item, index) => {
                return Cart && String(Object.keys(Cart)).includes(item?.ProductId?.value) ? (
                  <CartProductItem
                    key={index}
                    productId={item?.ProductId?.value}
                    title={item?.Title?.value}
                    handleDelete={() => {
                      axios.post('/api/cart/deleteall', {
                        productId: item?.ProductId?.value,
                      });
                      axios.get('/api/cart/getcart').then((data) => {
                        if (typeof data.data.data == 'object') {
                          setCart(data.data.data);
                        }
                      });
                    }}
                    image={item?.Image?.jsonValue}
                    price={item?.Price?.value}
                    setCart={setCart}
                    //@ts-ignore
                    quantity={Cart[item?.ProductId?.value]}
                  />
                ) : (
                  ''
                );
              })
            ) : (
              <p className="my-20 text-4xl">No products in Cart.</p>
            )}
          </div>
          {Object.keys(Cart).length != 0 ? (
            <div className="sidebar-body flex items-center justify-between border-t-[1px] text-white">
              <h3 className="pt-3 text-6xl">Total</h3>
              <h3 className="align-baseline text-4xl">${TotalCost}</h3>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

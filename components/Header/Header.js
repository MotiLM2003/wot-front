import React, { useEffect } from 'react';
import Image from 'next/image';
import logo from '../../images/logo.svg';
import search from '../../images/icons/search.svg';
import account from '../../images/icons/account.svg';
import downArrow from '../../images/icons/down-arrow.svg';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import Link from 'next/link';
const Header = () => {
  const { menuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {}, []);
  return (
    <header className='p-3 flex default-container align-center  justify-between md:justify-center '>
      <div className='md:px-8'>
        <Image src={logo} width='238' height='43' alt='logo image' />
      </div>
      <div className='hidden   md:flex grow justify-center items-center header-menu'>
        <ul className='flex    md:gap-12'>
          <MenuItem text='Main' path='/' itemId={0} menuId={menuId} />
          <MenuItem
            text='About us'
            path='/about-us/'
            itemId={1}
            menuId={menuId}
            isHasSubMenu={true}
            isClickable={false}
          />

          <MenuItem
            text='Campaigns'
            path='/campaigns/'
            itemId={2}
            menuId={menuId}
          />

          <MenuItem
            text='Our Service'
            path='/our-services/'
            itemId={3}
            menuId={menuId}
          />

          <MenuItem
            text='Get Started'
            path='/get-started/'
            itemId={4}
            menuId={menuId}
          />
          <MenuItem
            text='Contact Us'
            path='/contact-us/'
            itemId={5}
            menuId={menuId}
          />
        </ul>
      </div>
      <div className='flex items-center gap-4'>
        <div className='bg-primary text-white text-xs flex justify-center items-center p-1 px-3 rounded  gap-3  cursor-pointer'>
          <span>English</span>
          <Image src={downArrow} width='12' height='12' alt='search icon' />
        </div>
        <Image
          src={search}
          width='19'
          height='19'
          alt='search icon'
          className='cursor-pointer'
        />
        <Link href='/login/'>
          <Image
            src={account}
            width='19'
            height='19'
            alt='account icon'
            className='cursor-pointer'
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;

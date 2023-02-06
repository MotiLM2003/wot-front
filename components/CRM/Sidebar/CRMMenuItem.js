import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { setCRMId } from '../../../store/menuSlice';
const CRMMenuItem = ({ icon, text, id, menuId, path = '/' }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setCRMId(id));
  // }, []);
  const isSelected = id === menuId;

  return (
    <div>
      <Link href={path}>
        <div
          className={` ${
            isSelected ? 'selected' : ''
          } flex pl-4 transition duration-500 text-white items-center  text-xs gap-4 cursor-pointer p-1 border hover:border-primary border-t-0 border-l-0 border-r-0 hover:bg-shades-400  hover:border-r-[6px] h-[50px] border-b-0 
            `}
        >
          <Image src={icon} className='pointer' />{' '}
          <label className='cursor-pointer'>{text}</label>
        </div>
      </Link>
    </div>
  );
};

export default CRMMenuItem;

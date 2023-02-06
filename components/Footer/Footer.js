import React from 'react';
import Image from 'next/image';

import logo2 from '../../images/logo-2.svg';
import global from '../../images/icons/world.svg';
import address from '../../images/icons/address.svg';
import mobile from '../../images/icons/phone.svg';
import email from '../../images/icons/email.svg';
const Footer = () => {
  return (
    <footer className=' text-white text-sm  mt-10   '>
      <div className='bg-shades-400 px-5 pb-5  '>
        <div className='default-container flex flex-col gap-[5rem] md:gap-0 md:flex-row justify-between items-center '>
          <div>
            <div>
              <Image src={logo2} width='320' height='60' alt='logo icon' />
            </div>
            <p className='text-white max-w-[400px]'>
              ‘World Of Tzedaka’, formerly ’Tomchei Tzedaka Corp’, changed its
              name as per the guidance of Lakewood’s Posek, Rabbi Yaakov
              Forchheimer shlit”a, to avoid confusion with similarly-named
              organizations.     </p>
          </div>
          <div className='max-w-[300px]'>
            Tomchei Tzedaka corp. DBA
            <br />
            World Of Tzedaka has 501(c)
            <br /> 3 accreditation, Tax ID
            <br /> 81-4838703
          </div>
          <div>
            <h1 className='mb-2'>Contact Us</h1>
            <div className='flex flex-col gap-2 justify-center items-start'>
              <div className='flex gap-1 items-start'>
                <Image src={global} width='20' height='20' alt='logo icon' />
                <div>
                  Mail: Po Box 1003,
                  <br /> Lakewood NJ 08701
                </div>
              </div>
              <div className='flex gap-1 items-start'>
                <Image src={address} width='20' height='20' alt='logo icon' />
                <div>
                  Address: 16 Bridgewood Ave,
                  <br /> Lakewood NJ 08701
                </div>
              </div>
              <div className='flex gap-1 items-start'>
                <Image src={mobile} width='20' height='20' alt='logo icon' />
                <div>
                  Call or Text: 732-307-8182
                  <br /> Whatsapp: Click Here
                </div>
              </div>
              <div className='flex gap-1 items-start mt-4'>
                <Image src={email} width='20' height='20' alt='logo icon' />
                <div>Email: info@tomcheitzedaka.org</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary h-[4rem] flex justify-center items-center'>
        All rights reserved This site was built by sheltzer net.
      </div>
    </footer>
  );
};

export default Footer;

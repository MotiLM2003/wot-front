import Layout from 'pages/shared/Layout';
import React from 'react';
import global from '../../images/icons/world.svg';
import address from '../../images/icons/address.svg';
import mobile from '../../images/icons/phone.svg';
import email from '../../images/icons/email.svg';
import Image from 'next/image';
import account from '../../images/icons/account2.svg';
import email2 from '../../images/icons/email-2.svg';
import tel from '../../images/icons/tel.svg';
import Input from '@components/Input/Input';
const ContactUs = () => {
  return (
    <Layout>
      <div className='default-container mt-10 flex flex-col  '>
        <h1 className='flex justify-center'>Contact Us</h1>
        <div className='flex flex-col md:flex-row items-center gap-2  mt-14 md:justify-around '>
          <div className='flex gap-1 items-start'>
            <Image src={global} width='20' height='20' alt='logo icon' />
            <div className='text-xs'>
              Mail: Po Box 1003,
              <br /> Lakewood NJ 08701
            </div>
          </div>
          <div className='flex gap-1 items-start'>
            <Image src={address} width='20' height='20' alt='logo icon' />
            <div className='text-xs'>
              Address: 16 Bridgewood Ave,
              <br /> Lakewood NJ 08701
            </div>
          </div>
          <div className='flex gap-1 items-start'>
            <Image src={mobile} width='20' height='20' alt='logo icon' />
            <div className='text-xs'>
              Call or Text: 732-307-8182
              <br /> Whatsapp: Click Here
            </div>
          </div>
          <div className='flex gap-1 items-start mt-4'>
            <Image src={email} width='20' height='20' alt='logo icon' />
            <div className='text-xs'>Email: info@tomcheitzedaka.org</div>
          </div>
        </div>
      </div>
      <div className='mt-10 default-container flex  p-4 md:pl-[80px] flex-col '>
        <h2>Send Us A Message</h2>
        <div className='flex flex-col md:flex-row gap-5'>
          <div>
            <Input type='text' placeholder='First name' icon={account} />
          </div>
          <div>
            <Input type='text' placeholder='E-mail' icon={email2} />
          </div>
          <div>
            <Input type='text' placeholder='Tel' icon={tel} />
          </div>
        </div>
        <div className='bg-white mb-4 grow'>
          <textarea
            placeholder='message'
            className='bg-white outline-none w-300px border min-h-[200px] border-shades-300 pl-4 rounded mt-4 w-[80%]'
          ></textarea>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;

import Image from 'next/image';
import React from 'react';
import Layout from '../shared/Layout';
import funding from '../../images/funding.svg';
import mailService from '../../images/mail-service.svg';
import mail from '../../images/mail.svg';
import mail2 from '../../images/mail-2.svg';
import telephonyService from '../../images/telephony-service.svg';

const ourServices = () => {
  return (
    <Layout>
      <div className='default-container p-[2rem]  flex  flex-col items-center bg-shades-50'>
        <h1>Our Service</h1>
        <div className='mb-5 md:mb-0'>
          <div className='  flex flex-col md:flex-row p-1 md:p-10 gap-8 items-center justify-center text-center md:text-left  '>
            <div className='bg-white p-6 shadow rounded-xl'>
              <Image src={funding} width={131} height={131} layout='fixed' />
            </div>
            <div className='max-w-[660px]'>
              <h2 className='mb-2'>Campaign Building</h2>
              We will build a campaign that will help you get closer to your
              goal you are looking to raise. We offer everything you need to
              build your campaign from A-Z. This means you don’t need to worry
              about anything. We put together a campaign for you including
              articles, videos, photos, flyers, and more. We will set up your
              campaign on our platform and/or on The Chessed Fund platform if
              needed. We will then advertise your campaign via email and text
              blasts, and on many quality social media platforms.{' '}
            </div>
          </div>
        </div>
        <div className='mb-5 md:mb-0'>
          <div className='flex   flex-col   p-1 md:p-10 gap-8 items-center md:flex-row-reverse text-center md:text-right'>
            <div className='bg-white p-6 shadow rounded-xl'>
              <Image
                src={mailService}
                width={131}
                height={131}
                layout='fixed'
              />
            </div>
            <div className='max-w-[660px]'>
              <h2 className='mb-2'>Media Marketing</h2>
              The only way to succeed with a campaign is to advertise it well
              and to do that in the right places. We work with all email and
              text blasts, social media platforms, and other advertising
              options. We will follow the campaign progress and decide where to
              post and when accordingly. All marketing and advertising costs are
              not required upfront! The total will be deducted at the first
              attempt of cashing out.
            </div>
          </div>
        </div>
        <div className='mb-5 md:mb-0'>
          <div className='flex flex-col md:flex-row  p-1 md:p-10 gap-8 items-center text-center md:text-left '>
            <div className='bg-white p-6 shadow rounded-xl'>
              <Image src={mail} width={131} height={131} layout='fixed' />
            </div>
            <div className='max-w-[660px]'>
              <h2 className='mb-2'>Mailing Service</h2>
              We create an eye-catching flyer presenting your cause. With text,
              photos, and all the possible donation methods. We send out your
              campaign flyer to the thousands of addresses. This is a great way
              to reach out to donors who are not on social media, or those who
              would like to see an actual flyer and send in a check.
            </div>
          </div>
        </div>
        <div className='mb-5 md:mb-0'>
          <div className='flex flex-col   p-1 md:p-100 gap-8 items-center r md:flex-row-reverse text-center md:text-right'>
            <div className='bg-white p-6 shadow rounded-xl'>
              <Image
                src={telephonyService}
                width={131}
                height={131}
                layout='fixed'
              />
            </div>
            <div className='max-w-[660px]'>
              <h2 className='mb-2'>Telemarketing</h2>
              We create an eye-catching flyer presenting your cause. With text,
              photos, and all the possible donation methods. We send out your
              campaign flyer to the thousands of addresses. This is a great way
              to reach out to donors who are not on social media, or those who
              would like to see an actual flyer and send in a check.
            </div>
          </div>
        </div>
        <div className='mb-5 md:mb-0'>
          <div className='flex flex-col md:flex-row  p-2 md:p-10 gap-8 items-center text-center md:text-left'>
            <div className='bg-white p-6 shadow rounded-xl'>
              <Image src={mail2} width={131} height={131} layout='fixed' />
            </div>
            <div className='max-w-[660px]'>
              <h2 className='mb-2 '>Signs And Flyers</h2>
              We create an eye-catching flyer presenting your cause. With text,
              photos, and all the possible donation methods. We send out your
              campaign flyer to the thousands of addresses. This is a great way
              to reach out to donors who are not on social media, or those who
              would like to see an actual flyer and send in a check.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ourServices;

import Image from 'next/image';
import Layout from 'pages/shared/Layout';
import React from 'react';
import ok from '../../images/ok.svg';
const WhyUs = () => {
  return (
    <Layout>
      <div className='min-h-[80vh] default-container flex flex-col items-center'>
        <h1 className='mb-10'>Why Us?</h1>

        <h2>The mission</h2>
        <p className='font-bold mt-5 text-xl'>
          Our mission is to make the entire fundraising process easy and
          available to everyone.
        </p>

        <p className='text-center max-w-[830px] mt-5 text-paragraph'>
          If you are looking to campaign for an individual or an organization,
          no matter its size, we offer everything you need. If you are
          fundraising for individuals who only need a non-profit platform to
          process donations, or for organizations who only need a link to accept
          donations, this will be included in your ‘World of Tzedaka’
          membership. If you require a full campaign with articles, videos,
          graphics, design, and advertising, we have you covered with the
          services we offer through our partners at ‘TIG Solutions.’
        </p>

        <h2 className='mt-12'>THE ‘WORLD OF TZEDAKA’ PLATFORM:</h2>

        <p className='text-xl font-bold mt-5'>
          ‘World of Tzedaka’ is a non-profit organization, making all the
          donations on our platform tax-deductible.
        </p>

        <p className='text-center max-w-[830px] mt-5 text-paragraph'>
          ‘World of Tzedaka’ does not take a percentage of any campaign
          donations except the basic credit card processing fees. The minimal
          fee for being a member is $28/mo on a month-to-month basis which will
          grant you an account with ‘World of Tzedaka’ and the ability to create
          campaigns.
        </p>

        <h2 className='mt-4'>The benefits of becoming a member:</h2>
        <div className='pl-10  flex flex-col gap-3 justify-start items-start'>
          <div className='flex gap-4'>
            <div className='min-w-[30px]'>
              <Image src={ok} />
            </div>
            <p className='text-p'>
              By becoming a member of ‘World of Tzedaka’,{' '}
              <span className='font-bold'>
                you will have access to our non-profit platform for your
                campaign with personal links.
              </span>
            </p>
          </div>
          <div className='flex gap-4'>
            <div className='min-w-[30px]'>
              <Image src={ok} />
            </div>
            <p className='text-p'>
              You will have the ability to accept tax-deductible donations, set
              goals and deadlines, and create fundraising teams.
            </p>
          </div>
          <div className='flex gap-4'>
            <div className='min-w-[30px]'>
              <Image src={ok} />
            </div>
            <p className='text-p'>
              With your ‘World of Tzedaka’ account, you will have the ability{' '}
              <span className='font-bold'>
                to create campaigns and manage them with full access and
                transparency of all the financial details.
              </span>
              <br />
              <span className='font-bold'> This includes:</span>
              <br />
              - Viewing full details of current donations and future recurring
              donations.
              <br />
              - Details of donation processing fees. <br />- Total pending&nbsp;
              <span className='font-bold'>
                to create campaigns and manage them with full access and
                transparency of all the financial details.
              </span>
              <br />
              <span className='font-bold'> This includes:</span>
              <br />
              - Viewing full details of current donations and future recurring
              donations.
              <br />
              - Details of donation processing fees. <br />- Total pending funds
              and available funds for withdrawal.
              <br /> - And more.
            </p>
          </div>
          <div className='flex gap-4'>
            <div className='min-w-[30px]'>
              <Image src={ok} />
            </div>
            <p>
              You will also have the ability to accept donations in dollars or
              euros and see the exchange rate details in your account, transfer
              your available funds to an Israeli account (3% processing fee),
              manage your campaign advertising, and much more.
            </p>
          </div>
        </div>

        <h2 className='mt-8'>On the donors end</h2>
        <p>
          On the donors end: Donors have the option to donate via credit card,
          ACH, PayPal, Zelle, and check
        </p>
        <p>
          Donations can be made in dollars or euros. The donor can choose to
          cover the credit card processing fee, remain anonymous, and set
          recurring donations.
        </p>
      </div>
    </Layout>
  );
};

export default WhyUs;

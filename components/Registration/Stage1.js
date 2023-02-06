import React, { useState, useEffect } from 'react';
import email from '../../images/icons/email-2.svg';
import Input from '@components/Input/Input';
import account from '../../images/icons/account2.svg';
import shield from '../../images/icons/dark/shield.svg';
import mobile from '../../images/icons/dark/mobile.svg';
import globe from '../../images/icons/dark/globe.svg';
import id from '../../images/icons/dark/id.svg';

import cloud from '../../images/icons/dark/cloud.svg';
import country from '../../images/icons/dark/country.svg';
import city from '../../images/icons/dark/city.svg';
import location from '../../images/icons/dark/location.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { motion, AnimatePresence } from 'framer-motion';
const Stage1 = ({ onSetStage, data, onChange, birthDate, setBirthDate }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='mt-4 md:px-[4rem]'
    >
      <div className='flex flex-col gap-2'>
        <h4>Account Information:</h4>
        <div>
          <Input
            icon={email}
            name='email'
            value={data.email}
            type='text'
            placeholder='E-Mail'
            onChange={onChange}
          />
          <div className='flex gap-3 mt-4 '>
            <div>
              <Input
                icon={shield}
                type='password'
                value={data.password}
                name='password'
                placeholder='Password'
                onChange={onChange}
              />
            </div>{' '}
            <div>
              <Input
                icon={shield}
                value={data.rePassword}
                type='password'
                name='rePassword'
                placeholder='E-Re Password'
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <h4>Personal Details:</h4>
        <div className='flex gap-3 '>
          <div>
            <Input
              icon={account}
              type='text'
              value={data.firstName}
              name='firstName'
              placeholder='First Name'
              onChange={onChange}
            />
          </div>{' '}
          <div>
            <Input
              icon={account}
              type='text'
              value={data.lastName}
              name='lastName'
              placeholder='Last name'
              onChange={onChange}
            />
          </div>
        </div>
        {/*  */}
        <div className='flex gap-3 '>
          <div>
            <Input
              icon={mobile}
              type='text'
              name='phone'
              value={data.phone}
              placeholder='Phone number'
              onChange={onChange}
            />
          </div>{' '}
          <div>
            <Input
              icon={globe}
              type='text'
              placeholder='Select Default language'
            />
          </div>
        </div>
        <div className='flex gap-3 '>
          <div className='basis-[50%] relative'>
            <div>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
              />
              <div className='absolute top-[-10px] left-[0] text-xs font-bold text-primary bg-white p-1 rounded border border-primary '>
                Date of birth
              </div>
            </div>
          </div>
          <div>
            <Input
              icon={id}
              type='number'
              placeholder='ID Number'
              onChange={onChange}
              name='idNumber'
              value={data.idNumber}
            />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <div className='flex gap-3  justify-between  '>
          <h4 className='basis-1/2'>Your ID</h4>
          <h4 className='basis-1/2'>
            Profile picture{' '}
            <span className='text-sm font-normal'>(optional)</span>
          </h4>
        </div>
      </div>
      <div className='mt-4 location'>
        <div className='flex gap-3  justify-between'>
          <Input icon={cloud} type='text' placeholder='attach file' />
          <Input icon={cloud} type='text' placeholder='Upload photo' />
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <div className='flex gap-3  justify-between'>
          <h4>Your address</h4>
        </div>
        <div className='flex gap-3  justify-between'>
          <Input
            icon={country}
            onChange={onChange}
            name='country'
            value={data.country}
            type='text'
            placeholder='Country'
          />
          <Input
            icon={city}
            type='text'
            onChange={onChange}
            name='city'
            value={data.city}
            placeholder='City / Area'
          />
        </div>
        <div className='flex gap-3  justify-between'>
          <Input
            icon={location}
            type='text'
            onChange={onChange}
            name='street'
            value={data.street}
            placeholder='Street'
          />
          <Input
            icon={location}
            type='text'
            onChange={onChange}
            name='zipCode'
            value={data.zipCode}
            placeholder='Street'
          />
        </div>
      </div>
      <div className='mt-2 md:mt-[3rem] flex justify-center'>
        <button
          class='bg-red duration-500  transition-all text-white p-2 rounded min-w-[200px] font-bold text-xl hover:bg-red-h'
          value=''
          onClick={() => {
            onSetStage(1);
          }}
        >
          Next &gt;&gt;
        </button>
      </div>
    </motion.div>
  );
};

export default Stage1;

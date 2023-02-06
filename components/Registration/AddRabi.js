import Input from '@components/Input/Input';
import React, { useState } from 'react';
import account from '../../images/icons/account2.svg';
import mobile from '../../images/icons/dark/mobile.svg';
import location from '../../images/icons/dark/location.svg';
import Plus from '../../images/plus.svg';
import minues from '../../images/minus.svg';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const AddRabi = ({ initialRabi, onAdd, onRemove, WithPlus, withMinus }) => {
  const [rabi, setRabi] = useState(initialRabi);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRabi({ ...rabi, [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className='flex gap-4'
    >
      <div>
        <Input
          placeholder='Name'
          name='name'
          onChange={onChange}
          icon={account}
          value={rabi.name}
        />
      </div>
      <div>
        <Input
          placeholder='Phone'
          name='phone'
          onChange={onChange}
          icon={mobile}
          value={rabi.phone}
        />
      </div>
      <div>
        <Input
          placeholder='Address'
          name='address'
          onChange={onChange}
          icon={location}
          value={rabi.address}
        />
      </div>
      {WithPlus && (
        <div
          className='flex  w-[16px] cursor-pointer'
          onClick={() => {
            onAdd(rabi);
            setRabi({ ...initialRabi });
          }}
        >
          <Image src={Plus} height={64} width={64} />
        </div>
      )}
      {withMinus && (
        <div
          className='flex  w-[16px] cursor-pointer'
          onClick={() => {
            onRemove(rabi);
            setRabi({ ...initialRabi });
          }}
        >
          <Image src={minues} height={64} width={64} />
        </div>
      )}
    </motion.div>
  );
};

export default AddRabi;

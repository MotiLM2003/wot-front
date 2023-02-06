import React from 'react';
import { Spinner } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
const Loader = ({ text = 'Loading...', isLoading }) => {
  return (
    <div>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence>
            <div class='wof-loader'>
              <div className='loader-bg'></div>
              <div className='wof-loader-content'>
                <div className='flex items-center  flex-col gap-0 justify-center'>
                  <div>
                    <Spinner
                      color='white'
                      emptyColor='gray.300'
                      size='xl'
                      thickness='15px'
                      speed='1.5s'
                    />
                  </div>
                  <div>{text}</div>
                </div>
              </div>
            </div>
          </AnimatePresence>
        </motion.div>
      )}
      ;
    </div>
  );
};

export default Loader;

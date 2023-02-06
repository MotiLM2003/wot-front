import React from 'react';
import Layout from '../shared/Layout';

const getStarted = () => {
  return (
    <Layout>
      <div className='p-[10rem] flex justify-center items-center'>
        <div className='p-4 flex flex-col md:flex-row'>
          <div>1</div>
          <div>2</div>
        </div>
      </div>
    </Layout>
  );
};

export default getStarted;

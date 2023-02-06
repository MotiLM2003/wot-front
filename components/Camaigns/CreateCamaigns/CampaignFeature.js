import React from 'react';
import { Switch, box, FormControlLabel } from '@chakra-ui/react';
const CampaignFeature = ({
  text,
  toggleFeatures,
  name,
  campaign,
  color = 'red',
}) => {
  return (
    <div className='flex gap-2 items-center border border-primary p-2 rounded bg-white'>
      <div>{text}</div>
      <div>
        <Switch
          checked={campaign[name]}
          onChange={toggleFeatures}
          name={name}
          colorScheme={color}
        />
      </div>
    </div>
  );
};

export default CampaignFeature;

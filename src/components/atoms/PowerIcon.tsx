import React, { FC } from 'react';

import { blue } from '@material-ui/core/colors';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const PowerIcon: FC = () => {
  return <PowerSettingsNewIcon style={{ color: blue[200] }} fontSize="large" />;
};

export default PowerIcon;

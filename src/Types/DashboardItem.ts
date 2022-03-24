import { SvgIconProps } from '@mui/material';
import { ReactElement } from 'react';

export type DashboardItemType = {
  name: string;
  icon: ReactElement<SvgIconProps>;
  link: string;
  hash: string;
};

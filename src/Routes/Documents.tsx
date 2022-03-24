import {
  CalculateOutlined,
  FolderSharedOutlined,
  MapsHomeWorkOutlined,
  SchoolSharp,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';

import DocumentsItems from '../Components/Documents/DocumentsItems';

const categories = [
  <BottomNavigationAction
    label="Identification"
    key="Identification"
    value="identificationDocs"
    disableRipple={true}
    icon={<FolderSharedOutlined />}
  />,

  <BottomNavigationAction
    label="Property"
    key="Property"
    value="propertyDocs"
    disableRipple={true}
    icon={<MapsHomeWorkOutlined />}
  />,
  <BottomNavigationAction
    label="Finance"
    key="Finance"
    value="financeDocs"
    disableRipple={true}
    icon={<CalculateOutlined />}
  />,

  <BottomNavigationAction
    label="Education"
    key="Education"
    value="educationDocs"
    disableRipple={true}
    icon={<SchoolSharp />}
  />,
];

const Documents = () => {
  const [value, setValue] = useState('identificationDocs');

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Container
        sx={{
          height: 'calc(100% - 66px)',
          justifyContent: 'center',
          maxWidth: '90vw',
          padding: '0',
          paddingTop: '5%',
        }}
      >
        <DocumentsItems category={value} />
      </Container>
      <BottomNavigation
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: '0',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        value={value}
        onChange={handleChange}
      >
        {categories.map((item) => {
          return item;
        })}
      </BottomNavigation>
    </>
  );
};

export default Documents;

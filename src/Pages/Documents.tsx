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
    value="identificationDocs"
    disableRipple={true}
    icon={<FolderSharedOutlined />}
  />,

  <BottomNavigationAction
    label="Property"
    value="propertyDocs"
    disableRipple={true}
    icon={<MapsHomeWorkOutlined />}
  />,
  <BottomNavigationAction
    label="Finance"
    value="financeDocs"
    disableRipple={true}
    icon={<CalculateOutlined />}
  />,

  <BottomNavigationAction
    label="Education"
    value="educationDocs"
    disableRipple={true}
    icon={<SchoolSharp />}
  />,
];

const Documents = () => {
  const [value, setValue] = useState('');

  // Change bottom menu active item
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
        <DocumentsItems dbKey={value} />
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

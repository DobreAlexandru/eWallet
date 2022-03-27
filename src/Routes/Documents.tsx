import {
  CalculateOutlined,
  FolderSharedOutlined,
  LocalHospitalOutlined,
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
    label="Health"
    key="health"
    value="healthDocs"
    disableRipple={true}
    icon={<LocalHospitalOutlined />}
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
          paddingBottom: '30px',
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

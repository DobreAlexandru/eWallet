import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import useDoc from '../../Hooks/useDoc';
import { DocumentsItem } from '../../Types/DocumentsItem';
import PdfModal from './PdfModal';
import UploadButton from './UploadButton';

const DocumentsItems = ({ category }: { category: string }) => {
  const { user } = useAuth() as AuthType;
  const data = useDoc(category);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    download: '',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <UploadButton category={category} />
      {data && (
        <Grid container sx={{ display: 'flex', textAlign: 'center' }}>
          {data
            .slice(0)
            .reverse()
            .map((item: DocumentsItem) => {
              if (item.download)
                return (
                  <Grid
                    item
                    xs={4}
                    md={3}
                    key={item.download}
                    component={motion.div}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <IconButton
                      aria-label="item"
                      size="small"
                      onClick={() => {
                        setOpen(true);
                        setCurrentItem(item);
                      }}
                    >
                      <PictureAsPdfIcon
                        sx={{
                          fontSize: 50,
                          color: '#F1DAC4',
                          marginRight: '-10px',
                        }}
                      />
                    </IconButton>
                    <Typography variant="body1">
                      {item.name.length > 8
                        ? `${item.name.slice(0, 8)}...`
                        : item.name}
                    </Typography>
                    <IconButton
                      aria-label="options"
                      size="small"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        setAnchorEl(event.currentTarget);
                        setCurrentItem(item);
                      }}
                    >
                      <MoreHorizIcon
                        sx={{
                          fontSize: 20,
                          color: '#F1DAC4',
                        }}
                      />
                    </IconButton>
                    <Popover
                      id={id}
                      open={openPopover}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                    >
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            window.open(currentItem.download);
                            handleClose();
                          }}
                        >
                          <ListItemIcon>
                            <FileDownloadOutlinedIcon
                              fontSize="small"
                              sx={{ color: '#F1DAC4' }}
                            />
                          </ListItemIcon>
                          <ListItemText>Save</ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigator.share({
                              title: 'MDN',
                              text: currentItem.name,
                              url: currentItem.download,
                            });
                            handleClose();
                          }}
                        >
                          <ListItemIcon>
                            <IosShareIcon
                              fontSize="small"
                              sx={{ color: '#F1DAC4' }}
                            />
                          </ListItemIcon>
                          <ListItemText>Share</ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            const docRef = doc(db, 'users', user!.uid);
                            updateDoc(docRef, {
                              [category]: arrayRemove(currentItem),
                            });

                            handleClose();
                          }}
                        >
                          <ListItemIcon>
                            <DeleteIcon
                              fontSize="small"
                              sx={{ color: '#F1DAC4' }}
                            />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </MenuList>
                    </Popover>
                    {currentItem && (
                      <PdfModal
                        currentItem={currentItem}
                        open={open}
                        setOpen={setOpen}
                      />
                    )}
                  </Grid>
                );
            })}
        </Grid>
      )}
    </>
  );
};

export default DocumentsItems;

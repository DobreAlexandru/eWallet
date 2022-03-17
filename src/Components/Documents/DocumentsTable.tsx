import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Modal,
  Popover,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ChangeEvent, useEffect, useState } from 'react';

import { db } from '../../Firebase/config';
import { AuthType, useAuth } from '../Contexts/AuthContext';

const Input = styled('input')({
  display: 'none',
});

const DocumentsTable = ({ dbKey }: { dbKey: string }) => {
  const { user } = useAuth() as AuthType;
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState({ name: '', download: '' });
  const [open, setOpen] = useState(false);
  const storage = getStorage();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const metadata = {
    contentType: 'application/pdf',
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];
    const storageRef = ref(storage, `documents/${user.uid}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    const docRef = doc(db, 'users', user.uid);

    if (file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log('Upload is ' + percentage + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(docRef, {
              [dbKey]: arrayUnion({
                name: file.name.slice(0, -4),
                download: downloadURL,
              }),
            });
            getDB();
          });
        },
      );
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getDB = async () => {
    const docRef = doc(db, 'users', user.uid);
    await getDoc(docRef).then((doc: DocumentSnapshot) => {
      setData(doc.data()![dbKey]);
    });
  };

  useEffect(() => {
    getDB();
    setData([]);
    setCurrentItem({ name: '', download: '' });
  }, [dbKey]);

  return (
    <>
      {dbKey && (
        <>
          <label
            htmlFor="contained-button-file"
            style={{ position: 'absolute', bottom: '10%', right: '10%' }}
          >
            <Input
              accept="application/pdf"
              id="contained-button-file"
              multiple
              type="file"
              onChange={uploadFile}
            />
            <IconButton
              color="primary"
              aria-label="upload"
              component="span"
              disableRipple={true}
            >
              <UploadFileIcon sx={{ fontSize: 50, color: '#F1DAC4' }} />
            </IconButton>
          </label>

          {data && (
            <Grid container sx={{ display: 'flex', textAlign: 'center' }}>
              {data.map((item: any) => {
                if (item.download)
                  return (
                    <>
                      <Grid item xs={4} md={3} key={item.download}>
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
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>,
                          ) => {
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
                      </Grid>
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
                              const docRef = doc(db, 'users', user.uid);
                              updateDoc(docRef, {
                                [dbKey]: arrayRemove(currentItem),
                              });

                              getDB();
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
                    </>
                  );
              })}
            </Grid>
          )}
          {currentItem && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                outline: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80vh',
                  width: '80vw',
                  maxWidth: '80vh',
                  outline: 'none',
                }}
              >
                <Viewer fileUrl={currentItem.download} />
              </div>
            </Modal>
          )}
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js"></Worker>
        </>
      )}
    </>
  );
};

export default DocumentsTable;

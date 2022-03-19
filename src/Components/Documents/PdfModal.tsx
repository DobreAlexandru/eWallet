import { Modal } from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Dispatch, SetStateAction } from 'react';

import { DocumentsItemType } from './DocumentsItems';

const PdfModal = ({
  currentItem,
  open,
  setOpen,
}: {
  currentItem: DocumentsItemType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
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
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js"></Worker>
    </>
  );
};

export default PdfModal;

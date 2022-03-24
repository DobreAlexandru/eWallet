import { CircularProgress, Container } from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import CardBack from '../Components/Identification/CardBack';
import CardFront from '../Components/Identification/CardFront';
import useDoc from '../Hooks/useDoc';
import { IdentificationData } from '../Types/IdentificationData';

const Identification = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const data = useDoc('id') as IdentificationData;

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container
      sx={{
        height: 'calc(100% - 66px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        padding: '0',
      }}
    >
      {data.code ? (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <CardFront data={data} flip={flip} />
          <CardBack data={data} flip={flip} />
        </ReactCardFlip>
      ) : (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </Container>
  );
};

export default Identification;

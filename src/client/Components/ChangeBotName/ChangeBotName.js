import React, {useState} from 'react';
import '../GlobalCss/Modals.css';
import './ChangeBotName.css';
import {Button, Dialog, DialogActions, DialogContent, TextField} from '@mui/material';

const ChangeBotName = ({setBotName}) => {
  const [showModal, setShowModal] = useState(false);
  const [newBotName, setNewBotName] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const save = () => {
    fetch('http://localhost:5000/api/botname', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: newBotName})
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating bot name');
        }
        return response.json();
      })
      .then((data) => {
        setBotName(data.bot.name);
      })
      .catch((error) => {
        console.error('Error updating botname:', error);
      })
      .finally(() => {
        setNewBotName('');
        setShowModal(false);
      });
  };

  return (
    <>
      <Button onClick={openModal} color={'inherit'}>
        שנה שם
      </Button>
      <Dialog open={showModal} onClose={closeModal} dir={'rtl'}>
        <DialogContent>
          <TextField autoFocus label={'שנה שם בוט'}
                     onChange={e => setNewBotName(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} sx={{margin: 0.5}} onClick={closeModal}>ביטול</Button>
          <Button variant={'contained'} onClick={save}>שמור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeBotName;
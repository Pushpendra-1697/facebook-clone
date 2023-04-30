import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
  const [email, setEmail] = useState('')
  const [room, setRome] = useState('');
  const socket = useSocket();
  const naviagte = useNavigate();


  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', { email, room });
  }, [email, room]);

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    naviagte(`/room/${room}`);
  }, [naviagte]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    }
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor='email'>Email ID</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} w='300px' type='email' id='email'></Input>
        <br />
        <label htmlFor='room'>Room Number</label>
        <Input value={room} onChange={(e) => setRome(e.target.value)} w='300px' type='text' id='room'></Input>
        <br />
        <Button type='submit'>Join</Button>
      </form>
    </div>
  );
}

export default Lobby;
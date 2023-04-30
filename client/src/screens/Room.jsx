import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider';
import { Button } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import peer from '../service/Peer';

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState();


    const handleUserJoined = useCallback(({ email, id }) => {
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        const offer = await peer.getOffer();
        socket.emit('user:call', { to: remoteSocketId, offer })
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans });
    }, [socket]);

    const sendStream = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(async ({ from, ans }) => {
        peer.setLocalDescription(ans);
        sendStream();
    }, [sendStream]);

    const handleNagoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNagoNeeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNagoNeeded);
        };
    }, [handleNagoNeeded]);

    const handleNagoNeedIncomming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to: from, ans });
    }, [socket]);

    const handleNagoNeedFinal = useCallback(async ({ from, ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener('track', async (ev) => {
            const remoteStream = ev.streams;
            console.log('GOT TRACKS!!');
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incomming:call', handleIncommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNagoNeedIncomming);
        socket.on('peer:nego:final', handleNagoNeedFinal);

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incomming:call', handleIncommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNagoNeedIncomming);
            socket.off('peer:nego:final', handleNagoNeedFinal);
        };
    }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNagoNeedIncomming, handleNagoNeedFinal]);

    return (
        <div>
            <h1>Room Page</h1>
            <h4>{remoteSocketId ? "Connected" : "No One in Room"}</h4>
            {myStream && <Button onClick={sendStream}>Send Stream</Button>}
            {remoteSocketId && <Button onClick={handleCallUser}>Call </Button>}
            {myStream && <>
                <h1>My Stream</h1>
                <ReactPlayer playing muted height={"100px"} width={"200px"} url={myStream} />
            </>}
            {remoteStream && <>
                <h1>Remote Stream</h1>
                <ReactPlayer playing muted height={"100px"} width={"200px"} url={remoteStream} />
            </>}
        </div>
    );
}

export default Room;
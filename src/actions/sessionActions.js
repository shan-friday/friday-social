import axios from 'axios';

import { SET_SESSION_ID, REMOVE_SESSION_ID, EXTENSION_NOT_INSTALLED, EXTENSION_INSTALLED, JOIN_SESSION_ID } from './types';

export const createSession = userData => dispatch => {
    axios.get('/api/parties/createParty')
        .then(res => {
            // const sessId = res.data;
            const payload = {
                user: userData,
                sessionId: res.data
            }
            dispatch(setSessionId(payload));
        }).catch(err => console.log(err));
}

export const joinSession = (userData, sessionId) => dispatch => {
    axios.get('/api/parties/joinParty', { params: { sessionId } })
        .then(res => {
            const payload = {
                user: userData,
                sessionId
            }
            dispatch(setSessionId(payload));
        }).catch(err => console.log(err));
}

export const disconnectSession = () => dispatch => {
    dispatch(removeSessionId());
}

export const setSessionId = payload => {
    console.log(payload);
    return {
        type: SET_SESSION_ID,
        payload
    };
}

export const joinSessionId = payload => {
    console.log('Join Session', payload);
    return {
        type: JOIN_SESSION_ID,
        payload
    }
}

export const removeSessionId = () => {
    return {
        type: REMOVE_SESSION_ID
    };
}

export const extensionInstalled = () => {
    console.log('extensionInstalled');
    return {
        type: EXTENSION_INSTALLED
    }
}

export const extensionNotInstalled = () => {
    return {
        type: EXTENSION_NOT_INSTALLED
    }
}
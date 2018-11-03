// @flow

export const CONNECT_HEADSET = 'CONNECT_HEADSET';
export const DISCONNECT_HEADSET = 'DISCONNECT_HEADSET';

export function connect(){
    console.log("connect -- connect.js")
    return {
        type: CONNECT_HEADSET
    };
}

export function disconnect(){
    console.log("disconnect -- connect.js")
    return {
        type: DISCONNECT_HEADSET
    };
}
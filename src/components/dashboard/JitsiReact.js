import React, { useState } from 'react'

import { Jutsu } from 'react-jutsu'

const JitsiApp = () => {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')

  const handleClick = event => {
    event.preventDefault()
    if (room && name) setCall(true)
  }

  return call ? (
    <Jutsu
      roomName={room}
      displayName={name}
      password={password}
      loadingComponent={<p>loading ...</p>} />
  ) : (
    <form>
      <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
      <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input id='password' type='text' placeholder='Password (optional)' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleClick} type='submit'>
        Start / Join
      </button>
    </form>
  )
}

// import React, { useEffect } from 'react';
// import { useJitsi } from 'react-jutsu';
// // import * as a from '../../lib/jitsi-external-api';

// const JitsiApp = () => {
//   const roomName = 'konoha'
//   const parentNode = 'friday-iframe-main'
//   const jitsi = useJitsi({ roomName, parentNode })

//   useEffect(() => {
//     if (jitsi) {
//       jitsi.addEventListener('videoConferenceJoined', () => {
//         jitsi.executeCommand('displayName', 'Naruto Uzumaki')
//         jitsi.executeCommand('password', 'dattebayo')
//         jitsi.executeCommand('subject', 'fan')
//       })
//     }
//     return () => jitsi && jitsi.dispose()
//   }, [jitsi])

//   return <div id={parentNode} />
// }

export default JitsiApp
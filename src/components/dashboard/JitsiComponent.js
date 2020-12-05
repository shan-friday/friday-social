/*global chrome*/
import React from 'react';
import './Dashboard.css';
import { LocalTracks } from './LocalTracks'
// import { LocalSpeaker } from './LocalSpeaker'
import _ from 'lodash'
import { RemoteTrack } from './RemoteTrack';
import { v4 as uuidv4 } from 'uuid';
import { faPhoneAlt, faPhoneSlash, faSyncAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '../../actions/authActions';
import { createSession, disconnectSession } from '../../actions/sessionActions';
import { connect } from "react-redux";


class JitsiComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      serverURL: 'meet.friday.social',
      // serverURL: 'beta.meet.jit.si',
      roomId: '',
      selectedSpeakerDeviceId: '',
      defaultMicId: '',
      defaultVideoId: '',
      defaultSpeakerId: '',
      deviceList: [],
      status: 'closed',
      lastError: '',
      remoteTrackIds: [],
      loaded: false,
      activeRoomId: null,
      platform: '',
      syncStatus: false
    }
    window.friday = {}
    window.friday.remoteTracks = []
    window.friday.activeConnection = null
    window.friday.activeRoom = null
    this.partyRef = React.createRef();
  }

  componentDidMount() {
    window.JitsiMeetJS.mediaDevices.enumerateDevices((devices) => {
      let newDeviceList = []
      for (let device of devices) {
        // if (device.deviceId !== 'default' && device.deviceId !== 'communications') {
        newDeviceList.push({ name: device.label, id: device.deviceId, type: device.kind })
        // }
      }
      let micId = (_.find(newDeviceList, { type: 'audioinput' }) || {}).id || 'none'
      let videoId = (_.find(newDeviceList, { type: 'videoinput' }) || {}).id || 'none'
      let speakerId = (_.find(newDeviceList, { type: 'audiooutput' }) || {}).id || 'none'
      this.setState({
        deviceList: newDeviceList,
        defaultMicId: micId,
        defaultVideoId: videoId,
        defaultSpeakerId: speakerId,
        loaded: true
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('In Component Did Update', this.props.session.sessionId, prevProps.session.sessionId, ' room id ', this.state.roomId);
    if (this.props.session.sessionId !== prevProps.session.sessionId) {
      if (this.props.session.isInSession) {
        this.setState({
          roomId: this.props.session.sessionId
        })
        console.log('In Co D Up', this.state.roomId, this.props.session.sessionId);
        return;
        // this.onConnect();
      } else {
        this.setState({
          roomId: ''
        })
        return;
        // this.onDisconnect();
      }
    } else {
      if (this.props.session.isInSession && this.state.roomId === '') {
        this.setState({
          roomId: this.props.session.sessionId
        })
        console.log('In Co D Up', this.state.roomId, this.props.session.sessionId);
        return;
      }
    }

    if (this.state.roomId !== prevState.roomId) {
      if (this.state.roomId !== '') {
        this.onConnect();
        this.sendStartSessionEvent();
      } else {
        this.onDisconnect();
        this.sendEndSessionEvent();
      }
    }

    // if (this.state.roomId !== '')
    //   this.onConnect();
    // else
    //   this.onDisconnect();
  }

  onSpeakerChanged = (newSpeaker) => {
    this.setState({
      selectedSpeakerDeviceId: newSpeaker.id
    })
  }

  onServerChanged = (event) => {
    this.setState({
      serverURL: event.target.value
    })
  }

  onRoomChanged = (event) => {
    this.setState({
      roomId: event.target.value
    })
  }

  onRoomTrackAdded = (track) => {
    if (track.isLocal() === true) {
      return
    }
    let newTrackId = track.getId()
    console.log('Track Object', track);
    console.log(`Track Added: ${newTrackId}`)
    let matchTrack = _.find(this.remoteTracks, { id: newTrackId })
    if (matchTrack) {
      return
    }
    let trackInfo = {
      id: newTrackId,
      participantId: track.getParticipantId(),
      type: track.getType(),
      track: track
    }
    window.friday.remoteTracks.push(trackInfo)
    this.setState({
      remoteTrackIds: _.map(window.friday.remoteTracks, (rt) => { return { id: rt.id, participantId: rt.participantId } })
    })
  }

  onRoomTrackRemoved = (track) => {
    if (track.isLocal() === true) {
      return
    }
    let trackId = track.getId()
    window.friday.remoteTracks = _.reject(window.friday.remoteTracks, { id: trackId })
    this.setState({
      remoteTrackIds: _.map(window.friday.remoteTracks, (rt) => { return { id: rt.id, participantId: rt.participantId } })
    })

  }

  onConnectionSuccess = () => {
    const { roomId } = this.state
    try {
      window.friday.activeRoom = window.friday.activeConnection.initJitsiConference(roomId, {
        openBridgeChannel: true,
        // statisticsDisplayName: this.props.auth.user.email
      })
      window.friday.activeRoom.addEventListener(window.JitsiMeetJS.events.conference.TRACK_ADDED, this.onRoomTrackAdded)
      window.friday.activeRoom.addEventListener(window.JitsiMeetJS.events.conference.TRACK_REMOVED, this.onRoomTrackRemoved)
      window.friday.activeRoom.setDisplayName(this.props.auth.user.email);

      window.friday.activeRoom.join()
      this.setState({
        status: 'open',
        lastError: '',
        activeRoomId: uuidv4()
      })
    } catch (error) {
      this.setState({
        status: 'closed',
        lastError: error.message
      })
    }
  }

  onConnectionFailed = (a, b, c, d) => {
    this.setState({
      status: 'closed',
      lastError: a,
      activeRoomId: null
    })
  }

  onConnectionDisconnect = () => {
    window.friday.activeConnection.removeEventListener(window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, this.onConnectionSuccess)
    window.friday.activeConnection.removeEventListener(window.JitsiMeetJS.events.connection.CONNECTION_FAILED, this.onConnectionFailed)
    window.friday.activeConnection.removeEventListener(window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, this.onConnectionDisconnect)
    window.friday.activeRoom.removeEventListener(window.JitsiMeetJS.events.conference.TRACK_ADDED, this.onRoomTrackAdded)
    window.friday.activeRoom.removeEventListener(window.JitsiMeetJS.events.conference.TRACK_REMOVED, this.onRoomTrackRemoved)
  }

  onCreateSession = () => {
    console.log('In Create Session');
    this.props.createSession(this.props.auth.user);
  }

  onDisconnectSession = () => {
    this.props.disconnectSession();
  }

  onConnect = () => {
    let { roomId, serverURL } = this.state;
    // const str = 'asdfw-asfaw-fawer';
    // console.log(str.replace('-', ''));
    // const neroomId = roomId.replaceAll("-", "");
    // const serverURL = 'beta.meet.jit.si';
    console.log('In On Connect', roomId, serverURL, this.props.session.sessionId);
    this.setState({
      status: 'Joining...'
    })
    console.log('In On Connect', this.state.status);
    window.friday.activeConnection = new window.JitsiMeetJS.JitsiConnection(null, null, {
      hosts: {
        domain: serverURL,
        muc: `conference.${serverURL}` // FIXME: use XEP-0030
      },
      // serviceUrl: `wss://${serverURL}/xmpp-websocket?room=${roomId}`,
      serviceUrl: `https://${serverURL}/http-bind?room=${roomId}`,
      // bosh: `https://${serverURL}/http-bind?room=${roomId}`,
      clientNode: `http://${serverURL}`
    })

    window.friday.activeConnection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, this.onConnectionSuccess)
    window.friday.activeConnection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_FAILED, this.onConnectionFailed)
    window.friday.activeConnection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, this.onConnectionDisconnect)
    window.friday.activeConnection.connect();
    // this.sendStartSessionEvent();
  }

  onDisconnect = () => {
    if (window.friday.activeRoom) {
      this.setState({
        status: 'Leaving...'
      })
      try {
        window.friday.activeRoom.leave().then(() => {
          if (window.friday.activeConnection) {
            window.friday.activeConnection.disconnect()
          }
          this.setState({
            status: 'closed',
            remoteTracks: [],
            activeRoomId: null
          })
        })
      } catch (error) {
        this.setState({
          status: 'closed',
          lastError: error.message
        })
      }
    }
  }

  renderRemoteTracks = (trackGroups = {}, selectedSpeakerDeviceId) => {
    let ret = []

    let participantIds = _.keys(trackGroups)

    if (participantIds.length === 0) {
      return null
    }
    for (let participantId of participantIds) {
      ret.push(<div key={participantId} className="video-container">
        <RemoteTrack trackIds={trackGroups[participantId]} selectedSpeakerDeviceId={selectedSpeakerDeviceId} />
      </div>)
    }

    return ret
  }

  // handleOpenPlatformWindow = (evt) => {
  //   this.setState({ platform: evt.target.value });
  //   console.log(evt.target.value);
  //   chrome.runtime.sendMessage('mgpfdacjfehdlbeghaeijiecoeflopaf', { "message": "open_platform_window", "platform": evt.target.value });
  // }

  sendStartSessionEvent = () => {
    // if (this.state.status === 'open') {
    console.log('Trigger Start Session from Friday', this.state.roomId, this.props.auth.user);
    chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { message: "startSession", userData: this.props.auth.user, sessionId: this.state.roomId });
    // }
  }

  sendEndSessionEvent = () => {
    // if (this.state.status === 'open') {
    console.log('Trigger End Session from Friday', this.state.roomId, this.props.auth.user);
    chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { message: "endSession", userData: this.props.auth.user, sessionId: this.state.roomId });
    // }
  }

  sendSyncEvent = () => {
    if (this.state.status === 'open' && !this.state.syncStatus) {
      console.log('Trigger Sync from Friday');
      chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { message: "startSync", userData: this.props.auth.user, sessionId: this.state.roomId });
    }
  }

  copyText = (e) => {
    const node = this.partyRef.current;
    // node.select();
    // document.execCommand('copy');
    console.log(node);
    e.target.focus();
    navigator.clipboard.writeText(node.value);
    // this.setState({ btnText: 'Copied!' });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { selectedSpeakerDeviceId, serverURL, roomId, status, lastError, defaultMicId, defaultVideoId, defaultSpeakerId, deviceList, loaded = false, remoteTrackIds = [], activeRoomId } = this.state
    console.log(serverURL, roomId, defaultSpeakerId);
    if (loaded === false) {
      return (
        <div className='App'>
          <div className='AppLoading'>
            <h3>Loading...</h3>
          </div>
        </div>
      )
    }

    let remoteTrackGroups = _.groupBy(remoteTrackIds, (rt) => { return rt.participantId })

    return (
      <div className="dark container-fullpage-h d-flex flex-column">
        <div className="p-2 d-flex justify-content-between">
          {/* <div>Server: <input readOnly={status !== 'closed'} type='text' onChange={(event) => { this.setState({ serverURL: event.target.value })}}  value={serverURL} /></div>
          <div>Room: <input readOnly={status !== 'closed'} type='text' onChange={(event) => { this.setState({ roomId: event.target.value })}} value={roomId} /></div> */}
          <div id="select-theatre"></div>
          <div className="d-flex justify-content-end align-items-center">
            <button className="dark btn" onClick={this.onLogoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
            {/* <button className={`dark btn ${this.state.syncStatus && 'opacity-50 rotate'}`} title='Sign Out' onClick={(e) => {
              e.target.style.transform = 'rotate(90deg)';
              // this.setState({ syncStatus: !this.state.syncStatus })
              this.sendSyncEvent();
            }}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </button> */}
            <button className="dark btn btn-sync" onClick={(e) => this.sendSyncEvent()}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
            <div className="">
              {status === 'closed'
                ? <button className="dark btn" onClick={this.onCreateSession}>
                  {/* <img src={callIcon} className="w-full" /> */}
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </button>
                : status === 'open'
                  ? <button className="dark btn" onClick={this.onDisconnectSession}>
                    {/* <img src={callendIcon} className="w-full" /> */}
                    <FontAwesomeIcon icon={faPhoneSlash} rotation="90" />
                  </button>
                  : <p className="m-0">{status}</p>
              }
            </div>
          </div>
        </div>
        <div>{lastError}</div>
        {/* <LocalSpeaker deviceList={deviceList} key='LocalSpeaker' defaultSpeakerId={defaultSpeakerId} onSpeakerChanged={this.onSpeakerChanged} /> */}
        <div className="main-conatiner">
          <LocalTracks activeRoomId={activeRoomId} deviceList={deviceList} defaultMicId={defaultMicId} defaultVideoId={defaultVideoId} key='localTracks' />
          {this.renderRemoteTracks(remoteTrackGroups, selectedSpeakerDeviceId)}
        </div>
        <div id='friday-emoji' className=""></div>
        <div>
          {/* <input disabled='true' value={location.origin + 'joinParty' + roomId} /> */}
          {status === 'open'
            ?
            <div>
              <input ref={this.partyRef} hidden='true' value={window.location.origin + '/landingParty/' + roomId} />
              <button className="btn btn-info btn-block btn-secondary rounded-0" onClick={this.copyText}> Copy Invite </button>
            </div>
            : <div></div> //<input hidden='true' />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  session: state.sessions,
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { createSession, disconnectSession, logoutUser }
)(JitsiComponent);
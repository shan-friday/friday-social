import React from 'react';
import _ from 'lodash'
import { componentGetCompareProps } from './Shared'
import './LocalTracks.css';
import { faMicrophoneAlt, faMicrophoneAltSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';

export class LocalTracks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedMicDeviceId: 'none',
      selectedVideoDeviceId: 'none',
      loaded: false,
      reload: false,
      micMenuOpen: false,
      videoMenuOpen: false
    };
    this.videoRef = React.createRef();
    this.micRef = React.createRef();
    this.trackList = [];
    this.isAudioMuted = false;
    this.isVideoMuted = false;
  }

  componentDidMount() {
    const { deviceList = [], defaultMicId, defaultVideoId, activeRoomId } = this.props

    window.JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] })
      .then((tracks) => {
        let deviceIds = _.map(deviceList, (nd) => nd.id)
        for (let track of tracks) {
          if (_.indexOf(deviceIds, track.deviceId) !== -1) {
            this.trackList.push(track)
          }
        }
        this.setState({
          loaded: true,
          deviceList: deviceList,
          selectedMicDeviceId: defaultMicId,
          selectedVideoDeviceId: defaultVideoId,
        }, () => {
          this.updateLocalTrack(defaultMicId, 'set')
          this.updateLocalTrack(defaultVideoId, 'set')

          if (activeRoomId && window.friday.activeRoom) {
            let videoTrack = _.find(this.trackList, (t) => { return t.deviceId === defaultVideoId })
            let micTrack = _.find(this.trackList, (t) => { return t.deviceId === defaultMicId })
            if (videoTrack) {
              window.friday.activeRoom.addTrack(videoTrack)
            }
            if (micTrack) {
              window.friday.activeRoom.addTrack(micTrack)
            }
          }
        })
      })
  }

  onTrackStoppedEvent = (event) => {
    console.log(`Track Stopped`)
  }

  onTrackAudioOutputChangedEvent = (deviceId) => {
    console.log(`Track ${deviceId} audio output changed`)
  }

  updateLocalTrack = (deviceId, action = 'clear') => {
    if (action === 'clear') {
      let clearTrack = _.find(this.trackList, { deviceId: deviceId })
      if (clearTrack) {
        // eslint-disable-next-line default-case
        switch (clearTrack.getType()) {
          case 'audio':
            if (this.micRef.current) {
              clearTrack.detach(this.micRef.current)
              clearTrack.removeEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, this.onTrackStoppedEvent);
              clearTrack.removeEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, this.onTrackAudioOutputChangedEvent);
              clearTrack.dispose()
            }
            break
          case 'video':
            if (this.videoRef.current) {
              clearTrack.detach(this.videoRef.current)
              clearTrack.dispose()
            }
            break
        }
      }
    } else if (action === 'set') {
      let setTrack = _.find(this.trackList, (t) => { return t.deviceId === deviceId })
      if (setTrack) {
        // eslint-disable-next-line default-case
        switch (setTrack.getType()) {
          case 'audio':
            if (this.micRef.current) {
              setTrack.attach(this.micRef.current)
              setTrack.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, this.onTrackStoppedEvent);
              setTrack.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, this.onTrackAudioOutputChangedEvent);
              setTrack.mute()
            }
            break
          case 'video':
            if (setTrack && this.videoRef.current) {
              setTrack.attach(this.videoRef.current)
            }
            break
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const selectedVideoDeviceId = componentGetCompareProps('selectedVideoDeviceId', this.state, prevState, '')

    if (selectedVideoDeviceId.HasChanged) {
      if (selectedVideoDeviceId.Previous !== '') {
        this.updateLocalTrack(selectedVideoDeviceId.Previous, 'clear')
      }
      if (selectedVideoDeviceId.Current !== '') {
        this.updateLocalTrack(selectedVideoDeviceId.Current, 'set')
      }
    }

    const selectedMicDeviceId = componentGetCompareProps('selectedMicDeviceId', this.state, prevState, '')

    if (selectedMicDeviceId.HasChanged) {
      if (selectedMicDeviceId.Previous !== '') {
        this.updateLocalTrack(selectedMicDeviceId.Previous, 'clear')
      }
      if (selectedMicDeviceId.Current !== '') {
        this.updateLocalTrack(selectedMicDeviceId.Current, 'set')
      }
    }

    const activeRoomId = componentGetCompareProps('activeRoomId', this.props, prevProps, '')

    if (activeRoomId.HasChanged) {
      if (activeRoomId.Current && window.friday.activeRoom) {
        const { selectedMicDeviceId, selectedVideoDeviceId } = this.state
        let videoTrack = _.find(this.trackList, (t) => { return t.deviceId === selectedVideoDeviceId })
        let micTrack = _.find(this.trackList, (t) => { return t.deviceId === selectedMicDeviceId })
        if (videoTrack) {
          window.friday.activeRoom.addTrack(videoTrack)
        }
        if (micTrack) {
          window.friday.activeRoom.addTrack(micTrack)
        }
      }
    }
  }

  componentWillUnmount() {
    const { selectedMicDeviceId, selectedVideoDeviceId } = this.state

    this.updateLocalTrack(selectedMicDeviceId, 'clear')
    this.updateLocalTrack(selectedVideoDeviceId, 'clear')
  }

  onCameraChange = (optionId) => {
    this.setState({ selectedVideoDeviceId: optionId });
  }

  onMicrophoneChange = (optionId) => {
    this.setState({ selectedMicDeviceId: optionId });
  }

  toggleAudio = () => {
    console.log('Toggle Audio Called');
    let audioTrack = _.find(this.trackList, { deviceId: this.state.selectedMicDeviceId })
    if (!this.isAudioMuted) {
      audioTrack.mute();
      this.isAudioMuted = true;
    } else {
      audioTrack.unmute();
      this.isAudioMuted = false;
    }
    this.setState({ reload: true });
  }

  toggleVideo = () => {
    console.log('Toggle Video Called');
    let videoTrack = _.find(this.trackList, { deviceId: this.state.selectedVideoDeviceId })
    if (!this.isVideoMuted) {
      videoTrack.mute();
      document.querySelector('#trackAvatar').style.display = 'flex';
      document.querySelector('#localVideoTrack').style.display = 'none';
      this.isVideoMuted = true;
    } else {
      videoTrack.unmute();
      document.querySelector('#trackAvatar').style.display = 'none';
      document.querySelector('#localVideoTrack').style.display = 'flex';
      this.isVideoMuted = false;
    }
    this.setState({ reload: true });
  }

  toggleMicMenuOpen = () => {
    this.setState((state) => ({ micMenuOpen: !state.micMenuOpen }))
  }

  toggleVideoMenuOpen = () => {
    this.setState((state) => ({ videoMenuOpen: !state.videoMenuOpen }))
  }

  drawCircle = (text, size = 20, color) => {
    var textSize = Math.ceil(size / 2.5);
    var font = 'Proxima Nova, proxima-nova, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif';
    var colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];
    var colorIndex = Math.floor((text.charCodeAt(0) - 65) % colors.length);
    // var finalColor = color || colors[colorIndex];

    // var template = [
    //   '<svg height="' + size + '" width="' + size + '" style="background: ' + finalColor + '">',
    //   '<text text-anchor="middle" x="50%" y="50%" dy="0.35em" fill="white" font-size="' + textSize + '" font-family="' + font + '">' + text.toUpperCase() + '</text>',
    //   '</svg>'
    // ];

    // return template.join('');
    return (
      <svg height={size} width={size} style={{ background: 'red' }}>
        <text text-anchor="middle" x="50%" y="50%" dy="0.35em" fill='white' font-size={textSize} font-family={font}> {text.toUpperCase()} </text>
      </svg>
    )
  }

  render() {
    const { deviceList = [] } = this.state

    return (
      <div className="video-container">
        <video autoPlay='1' id='localVideoTrack' ref={this.videoRef} style={{ objectFit: 'contain', display: 'flex' }} width="100%" playsInline='true' />
        <div id='trackAvatar' style={{ display: 'none', height: 'fit-content', objectFit:'contain'}} width="100%" > {this.drawCircle('A', 50, '#300f')}</div>
        <div className="video-menu">
          <ButtonGroup>
            <ButtonDropdown isOpen={this.state.micMenuOpen} toggle={this.toggleMicMenuOpen}>
              <Button id="caret" size="sm" color="primary" onClick={this.toggleAudio}>{this.isAudioMuted ? <FontAwesomeIcon icon={faMicrophoneAltSlash} className="p-0" /> : <FontAwesomeIcon icon={faMicrophoneAlt} className="p-0" />}</Button>
              <DropdownToggle split color="primary" />
              <DropdownMenu>
                <DropdownItem header>Microphone options</DropdownItem>
                {_.map(_.filter(deviceList, { type: 'audioinput' }), (d) => {
                  return <DropdownItem data-id={d.id} onClick={() => this.onMicrophoneChange(d.id)} key={d.id}>{d.name}</DropdownItem>
                })}
              </DropdownMenu>
            </ButtonDropdown>
            <ButtonDropdown isOpen={this.state.videoMenuOpen} toggle={this.toggleVideoMenuOpen}>
              <Button id="caret" size="sm" color="primary" onClick={this.toggleVideo}>{this.isVideoMuted ? <FontAwesomeIcon icon={faVideoSlash} /> : <FontAwesomeIcon icon={faVideo} />}</Button>
              <DropdownToggle split color="primary" />
              <DropdownMenu>
                <DropdownItem header>Video options</DropdownItem>
                {_.map(_.concat([{ name: 'none', id: 'none', type: 'none' }], _.filter(deviceList, { type: 'videoinput' })), (d) => {
                  return <DropdownItem data-id={d.id} onClick={() => this.onCameraChange(d.id)} key={d.id}>{d.name}</DropdownItem>
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        </div>
        {/* <div class='local_track'>
          <div class='local_track_controls'>
            <span>Camera</span>
            <select value={selectedVideoDeviceId} onChange={(e) => this.onCameraChange(e.target.value)}>
              {_.map(_.concat([{ name: 'none', id: 'none', type: 'none' }], _.filter(deviceList, { type: 'videoinput' })), (d) => {
                return <option value={d.id}>{d.name}</option>
              })}
            </select>
            <span>Microphone</span>
            <select value={selectedMicDeviceId} onChange={(e) => this.onMicrophoneChange(e.target.value)}>
              {_.map(_.filter(deviceList, { type: 'audioinput' }), (d) => {
                return <option value={d.id}>{d.name}</option>
              })}
            </select>
          </div>
        </div> */}
      </div >
    );

  }
}
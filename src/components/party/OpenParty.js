// /* global chrome */
import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { joinSession } from '../../actions/sessionActions';
import { useDispatch, useSelector } from 'react-redux';

const OpenParty = (props) => {
    const { partyId } = useParams();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
  
    // const regex = /[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-[0-9A-Za-z]{4}-[0-9A-Za-z]{4}-[0-9A-Za-z]{12}/;
    const regex = /[0-9A-Za-z]{21}/;

    console.log('Party Id', partyId, regex.test(partyId));

    useEffect(() => {
        console.log('Party Id',partyId);
        if (partyId && regex.test(partyId)) {
            dispatch(joinSession(auth.user, partyId));
            // chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { action: 'startSession', message: 'startSession', userData: auth.user });
            props.history.push('/jitsiComponent');
        } else
            props.history.push('/');
    })

    // if (partyId && regex.matches(partyId)) {
    //     props.history.push('/joinParty');
    // } else
    //     props.history.push('/dashboard');
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <p>Some thing as a place holder</p>
        </div>
    );
}

export default OpenParty;

// class LandingParty extends Component {
//         const { partyId } = useParams();
//     const regex = /\d{8}-\d{4}-\d{4}-\d{12}/;

//     // componentDidMount = () => {
//         useEffect(() => {
//             console.log('Party Id', partyId);
//             if (partyId && regex.matches(partyId)) {
//                 props.history.push('/joinParty');
//             } else
//                 props.history.push('/dashboard');
//         })
//     // }

//     joinParty = () => {
//         console.log('Join Party Event');
//         chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { message: 'open_app_external', message: 'open_app_external' })
//     }
//     render() {
//         // const { user } = this.props.auth;
//         return (
//             <div style={{ height: "75vh" }} className="container valign-wrapper">
//                 <p>Some thing as a place holder</p>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth,
//     session: state.sessions
// });

// export default connect(mapStateToProps)(LandingParty);
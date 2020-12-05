/* global chrome */
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

class JoinParty extends Component {
    joinParty = () => {
        console.log('Join Party Event');
        chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { action: 'open_app_external', message: 'open_app_external' })
    }
    render() {
        // const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
                            <p className="flow-text grey-text text-darken-1">
                                Join the party
                                {/* <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏 */}
              </p>
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.joinParty}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Join
            </button>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state, ownProps) => ({
//     auth: state.auth,
//     cookies : ownProps.cookies
// });

export default JoinParty;
/* global chrome */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button } from 'reactstrap';
// import { JitsiComponent } from "./JitsiComponent";

class Dashboard extends Component {

    joinParty = () => {
        console.log('Join Party Event');
        chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { action: 'open_app_external', message: 'open_app_external' })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into a full-stack{" "}
                                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
                        </h4>
                        <Button onClick={this.joinParty}>
                            Host a Party
                        </Button>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
            </button>
                    </div>
                </div>
                {/* <JitsiComponent /> */}
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    cookies: ownProps.cookies
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
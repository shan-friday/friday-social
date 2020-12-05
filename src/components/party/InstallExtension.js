import React, { Component } from "react";
import { connect } from "react-redux";

class InstallExtension extends Component {
    componentDidUpdate = () =>{
        if(this.props.auth.isExtensionInstalled)
        this.props.history.push('/jitsiComponent')
    }

    render() {
        console.log(this.props.auth.isExtensionInstalled);
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
                            <p className="flow-text grey-text text-darken-1">
                                Please Install the
                                <span style={{ fontFamily: "monospace" }}>FRIDAY.SOCIAL</span> extension from the chrome webstore
              </p>
                        </h4>
                        <a
                            href='https://chrome.google.com/webstore/category/extensions'
                            target="_blank" rel="noreferrer"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Go to Chrome Web Store
            </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    cookies : ownProps.cookies
});

export default connect(
    mapStateToProps
)(InstallExtension);
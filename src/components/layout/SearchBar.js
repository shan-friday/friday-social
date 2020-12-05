import React, { Component } from 'react';
import { connect } from 'react-redux';
import friday from '../assets/img/friday-logo.png';
// import { bindActionCreators } from 'redux';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    document.querySelector('title').textContent='Friday Theater';
    this.state = { url: '' };
  }

  changeUrl = (props) => {
    this.setState({ url: document.getElementById('netflix').value })
  }

  render() {
    return (
      <div className="container-fullpage-h dark d-flex justify-content-center align-items-center">
        <div>
          <img src={friday} alt='This is the FRIDAY LOGO'></img>
          <div className="logo-text">friday.</div>
        </div>
    {/* <iframe
                width="80%"
                height="100%"
                src={this.state.url}
                target="_parent"
                title='search-explorer'
            >
                Please select a website to navigate to
            </iframe>
            <div className="col s12">
                <button
                    style={{
                        width: "420px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                    }}
                    id='prime'
                    onClick={this.changeUrl}//('https://www.primevideo.com/')}
                    className="btn btn-large btn-flat waves-effect black white-text"
                    value='https://www.primevideo.com/'
                >
                    Prime Video
          </button>
            </div>
            <br></br>
            <div className="col s12">
                <button
                    style={{
                        width: "420px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                    }}
                    onClick={this.changeUrl}//('https://www.netflix.com/browse')}
                    id='netflix'
                    className="btn btn-large btn-flat waves-effect red black-text"
                    value='https://www.netflix.com/browse'
                >
                    Netflix
          </button>
            </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  url: state.url
})

export default connect(null, mapStateToProps)(SearchBar);
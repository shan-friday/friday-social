/* global chrome */
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FullPage, Slide } from 'react-full-page';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import './LandingPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import FridayLogo from '../assets/img/friday-logo.png';
import { homepage } from '../../utils/constants';
import zee5Logo from '../assets/img/brands/zee5_logo.jpg';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isOpen: false,
      slide: true,
      lastScrollY: 0
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  joinParty = (e) => {
    e.preventDefault();
    console.log('Join Party Event');
    chrome.runtime.sendMessage('jjpkejikllkphemiloeipdmbaonlpfnm', { action: 'open_app_external', message: 'open_app_external' })
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  // handleScroll(e) {
  //   const { lastScrollY } = this.state;
  //   const currentScrollY = window.scrollY;

  //   if (currentScrollY > lastScrollY) {
  //     this.setState({ slide: false });
  //   } else {
  //     this.setState({ slide: true });
  //   }
  //   this.setState({ lastScrollY: currentScrollY });
  // }

  render() {
    return (
      <div>
        <FullPage>
          <Slide>
            <div className={`hide-custom-flex font-weight-bold smart-scroll bg-transparent justify-content-between align-items-center p-2 text-primary`}>
              <div href="/" className="d-flex justify-content-center align-items-center">
                <img src={FridayLogo} className="logo" alt="logo" />
                <span className="p-2 font-weight-bold text-uppercase hide-custom">friday.social</span>
              </div>
              <div className="nav-md-menu">
                <NavLink to="/components/">Features</NavLink>
                <NavLink to="/components/">Team</NavLink>
                <div className="pr-md-3 pl-md-5">
                  <NavLink to="/login" onClick={this.joinParty} >Login</NavLink>
                  {/* <Button onClick={this.joinParty}>
                    <span className="pr-1">Login</span> 
                  </Button> */}
                </div>
              </div>
              <Button
                tag="a"
                color="primary"
                href="http://google.com"
                target="_blank"
                className="rounded-pill"
              >
                <span className="pr-1">Get Started</span> <FontAwesomeIcon size="xs" icon={faArrowRight} />
              </Button>
            </div>
            {/* SM Navigation */}
            <div className="show-custom-flex smart-scroll bg-transparent justify-content-between align-items-center p-2">
              <div>
                <button className="btn btn-link p-0" onClick={this.toggle}>
                  {this.state.isOpen ?
                    <FontAwesomeIcon size="2x" color="#FFF" icon={faWindowClose} />
                    : <img src={FridayLogo} className="logo" alt="logo" />
                  }
                </button>
              </div>
              {this.state.isOpen &&
                <div className="nav-sm-menu-container">
                  <div className="nav-sm-menu">
                    <NavLink to="/components/">Features</NavLink>
                    <NavLink to="/components/">Team</NavLink>
                    <NavLink to="/login">Login</NavLink>
                  </div>
                  <div className="nav-sm-ellipse"></div>
                </div>
              }
              <Button
                tag="a"
                color="primary"
                href="http://google.com"
                target="_blank"
                className="rounded-pill"
              >
                <span className="pr-1">Get Started</span> <FontAwesomeIcon size="xs" icon={faArrowRight} />
              </Button>
            </div>
            {/* Screen one */}
            <div className={`m-0 screen-one ${this.state.isOpen ? 'screen-one-menu-open' : undefined}`}>
              <div className="text-main-one main-center-text">
                <div>{homepage.main_text_sub_1}</div>
                <div>{homepage.main_text_sub_2}</div>
                <div>{homepage.main_text_sub_3}</div>
              </div>
              <div className="ellipse-svg">
              </div>
              <div className="text-main-one ellipse-text">
                <div>{homepage.main_text_two_sub_1}</div>
                <div>{homepage.main_text_two_sub_2}</div>
              </div>
              {/* <img className="ellipse-svg" src={Ellipse} /> */}
            </div>
          </Slide>
          <Slide>
            <Jumbotron fluid className="dark lg-border-jumbo m-0 h-100 pt-1 pb-3 d-flex align-items-center">
              <Container>
                <Row className="p-2 p-md-0">
                  <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }} className="d-flex justify-content-center flex-column pt-5 pr-md-5">
                    <p className="text-main-two">{homepage.screen_one_main}</p>
                    <p className="text-uppercase">{homepage.screen_one_secondary}</p>
                  </Col>
                  <Col xs={{ size: 12, order: 1 }} md={{ size: 6, order: 2 }}>
                    {/* <img src="https://via.placeholder.com/600x350" className="img-fluid" alt="Responsive pic1" /> */}
                    <div style={{ width: "100%", height: 0, paddingBottom: "56%", position: "relative" }}><iframe src="https://giphy.com/embed/U4LdTYium63olrJM0N" width="100%" height="100%" style={{ position: "absolute" }} frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/travisgreene-U4LdTYium63olrJM0N">via GIPHY</a></p>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </Slide>
          <Slide>
            <Jumbotron fluid className="light lg-border-jumbo m-0 h-100 d-flex align-items-center">
              <Container>
                <Row className="p-2 p-md-0">
                  <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 2 }} className="d-flex justify-content-center flex-column pr-md-5 pt-5">
                    <p className="text-main-two">{homepage.screen_two_main}</p>
                    <p className="text-uppercase">{homepage.screen_two_secondary}</p>
                  </Col>
                  <Col xs={{ size: 12, order: 1 }} md={{ size: 6, order: 1 }}>
                    {/* <img src="https://via.placeholder.com/600x350" className="img-fluid" alt="Responsive pic2" />
                     */}
                    <div style={{ width: "100%", height: 0, paddingBottom: '48%', position: 'relative' }}><iframe src="https://giphy.com/embed/TyzAr325x29eo" width="100%" height="100%" style={{ position: "absolute" }} frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/guitar-bass-TyzAr325x29eo">via GIPHY</a></p>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </Slide>
          <Slide>
            <Jumbotron fluid className="dark lg-border-jumbo m-0 h-100 d-flex align-items-center">
              <Container>
                <Row className="p-2 p-md-0">
                  <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }} className="d-flex justify-content-center flex-column pr-md-5 pt-5">
                    <p className="text-main-two">{homepage.screen_third_main}</p>
                    <p className="text-uppercase">{homepage.screen_third_secondary}</p>
                  </Col>
                  <Col xs={{ size: 12, order: 1 }} md={{ size: 6, order: 2 }}>
                    <img src="https://via.placeholder.com/600x350" className="img-fluid" alt="Responsive pic3" />
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </Slide>
          <Slide>
            <div className="light h-100 d-flex flex-column justify-content-between m-0 p-0">
              <div className="d-flex justify-content-center flex-column align-items-center m-auto">
                <p className="text-uppercase font-weight-bold h5 text-center">{homepage.ott_platform}</p>
                <ul className="image-grid">
                  <li><img src={zee5Logo} alt="Zee 5" className="img-fluid" /></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <footer className="dark footer-landing">
                <div className="d-flex justify-content-around align-items-center">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <p className="text-main-five text-center">need help?</p>
                    <Button
                      tag="a"
                      color="secondary"
                      size="sm"
                      href="http://reactstrap.github.io"
                      target="_blank"
                      className="rounded-pill uppercase"
                    >
                      <span className="text-uppercase font-weight-bold">visit faq</span>
                    </Button>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <p className="text-main-five text-center">have suggestions?</p>
                    <Button
                      tag="a"
                      color="secondary"
                      size="sm"
                      href="http://reactstrap.github.io"
                      target="_blank"
                      className="rounded-pill uppercase"
                    >
                      <span className="text-uppercase font-weight-bold">join beta</span>
                    </Button>
                  </div>
                </div>
              </footer>
            </div>
          </Slide>
        </FullPage>
      </div>
    );
  }
}

export default LandingPage;
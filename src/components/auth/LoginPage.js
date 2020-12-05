import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import classnames from "classnames";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkUserFlow, registerUser } from "../../actions/authActions";
import './LoginPage.scss';
import { faLock, faSignInAlt, faUser, faLongArrowAltLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { joinSession } from '../../actions/sessionActions';
// import { session } from 'passport';
import CustomPopOver from '../common/CustomPopOver.js';

const Login = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errorsReceived = useSelector(state => state.errors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const sessions = useSelector(state => state.sessions);

  console.log(props, useSelector(state => state.sessions));
  document.querySelector('title').textContent='Friday Login';

  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log(sessions, auth);
      if (!sessions.isInSession ) if(sessions.sessionId) dispatch(joinSession(auth.userData, sessions.sessionId))
      props.history.push('/jitsiComponent');
    };
    if (errorsReceived) {
      setErrors(errorsReceived);
    }
  },  [auth.isAuthenticated, auth, errorsReceived, sessions, dispatch, props.history]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (auth.info !== 'set') {
      const userData = {
        email: email,
        password: password
      };
      dispatch(loginUser(userData));
    } else {
      const userData = {
        email: email,
        password: password,
        name: email,
        password2: password
      };
      dispatch(registerUser(userData, props.history));
    }
  }

  const emailOnBlur = (eve) => {
    dispatch(checkUserFlow(eve.target.value));
  }

  return (
    <div className="dark d-flex justify-content-center align-items-center container-fullpage-h">
      {/* <div className="backdrop"> */}
      <section className="d-flex flex-column">
        <div className="">
          <div className={classnames("d-flex position-relative", {
            invalid: errors.email || errors.emailnotfound
          })}>
            <div className="input-icon">
              {/* <EmailIcon /> */}
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              placeholder="email"
              className={"logo-line-one"}
              value={email}
              error={errors.email}
              onChange={(evt) => setEmail(evt.target.value)}
              onBlur={emailOnBlur}
            />
            {errors.email ? <div className="error-arrow"><FontAwesomeIcon color="black" size="lg" icon={faLongArrowAltLeft} /></div> : errors.emailnotfound ? <div className="error-arrow"><FontAwesomeIcon color="black" size="lg" icon={faTimes} /></div>: null}
          </div>
          {/* <div className="error-msg"><span>{errors.email}{errors.emailnotfound}</span></div> */}
        </div>
        <div className="mt-3 position-relative">
          <div className="info-msg"><span>{auth.info}</span></div>
          <div className="d-flex">
            <div className="input-icon">
              {/* <LockIcon /> */}
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              placeholder="password"
              className="logo-line-two"
              value={password}
              error={errors.password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            {errors.password ? <div className="error-arrow"><FontAwesomeIcon size="lg" icon={faLongArrowAltLeft} /></div> : errors.passwordincorrect ? <div className="error-arrow"><FontAwesomeIcon size="lg" icon={faTimes} /></div> : null}
            {/* {errors.passwordincorrect ? <div className="error-arrow"><FontAwesomeIcon size="lg" icon={faLongArrowAltLeft} /></div> : null} */}
          </div>
          {/* <div className="error-msg"><span>{errors.password}{errors.passwordincorrect}</span></div> */}
        </div>
        <div className="mt-3 position-relative">
          <div className="info-msg"><span>{auth.info && 'to'}</span></div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="input-icon">
                <FontAwesomeIcon icon={faSignInAlt} />
                {/* <LoginIcon /> */}
              </div>
              <button
                onClick={onSubmit}
                className="logo-line-three"
              >
                {auth.info === 'set' ? 'Sign Up' : auth.info === 'enter' ? 'Sign In' : 'Sign In/Up'}
              </button>
            </div>
            <CustomPopOver buttonText="?" styles="btn-help">
              <button className="btn btn-link">forgot password?</button>
            </CustomPopOver>
            {/* <Link to="/register">*/}
            {/* <button onClick={() => dispatch(errorsCleanup())} className="btn-help">?</button> */}
            {/*</Link> */}
            {/* <div class="cart">
              <button onMouseOver={() => console.log('adfasdf')} className="btn-help">?</button>
              <div id="sidebar">some thing</div>
            </div> */}
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   // errors: PropTypes.object.isRequired
// }

export default Login;
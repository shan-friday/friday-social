import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { errorsCleanup, registerUser } from "../../actions/authActions";
import LockIcon from '../common/icons/LockIcon';
import UserIcon from '../common/icons/UserIcon';
import ArrowRightIcon from '../common/icons/ArrowRightIcon';
import EmailIcon from '../common/icons/EmailIcon';

const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const errorsReceived = useSelector(state => state.errors);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPwd, setConfirmPwd] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/jitsiComponent');
    };
    if (errorsReceived) {
      setErrors(errorsReceived);
    }
  }, [auth.isAuthenticated, errorsReceived, props.history]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newUser = {
      email: email,
      name: username,
      password: password,
      password2: password
    };
    dispatch(registerUser(newUser, history));
  }

  return (
    <div className="form-white form-container">
      <div className="backdrop">
        <div className="relative bottom-0-5">Sign up</div>
        <section className="flex flex-col">
          <div className="mb-6">
            <div className="flex">
              <div className="w-6 input-icon">
                <EmailIcon />
              </div>
              <input
                type="email"
                placeholder="email"
                className={classnames("rounded-br-2xl outline-none w-full", {
                  invalid: errors.email
                })}
                value={email}
                error={errors.email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>
            <div className="text-red-700 text-left absolute text-xs"><span>{errors.email}</span></div>
          </div>
          <div className="mb-6">
            <div className="flex">
              <div className="w-6 input-icon">
                <UserIcon />
              </div>
              <input
                type="text"
                placeholder="username"
                className="rounded-br-2xl w-9/12 outline-none"
                value={username}
                error={errors.name}
                onChange={(evt) => setUsername(evt.target.value)}
              />
            </div>
            <div className="text-red-700 text-left absolute text-xs"><span>{errors.name}</span></div>
          </div>
          <div className="">
            <div className="flex flex-row justify-between">
              <div className="flex w-4/6 ">
                <div className="w-6 input-icon">
                  <LockIcon />
                </div>
                <input
                  type="password"
                  placeholder="password"
                  className="rounded-br-2xl w-9/12 outline-none"
                  value={password}
                  error={errors.password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <button onClick={onSubmit} className="btn-submit w-6 p-1 rounded-3xl focus:outline-none"><ArrowRightIcon /></button>
            </div>
            <div className="text-red-700 text-left absolute text-xs"><span>{errors.password}</span></div>
          </div>
          <div className="relative top-1-5"><button className="focus:outline-none">forgot password?</button></div>
          <div className="relative top-1-5"><Link to="/login"><button onClick={() => dispatch(errorsCleanup())} className="focus:outline-none">Login</button></Link></div>
        </section>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default Register;
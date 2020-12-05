import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { joinSessionId } from '../../actions/sessionActions';
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const activity = useSelector(state => state.activity);

  return <Route
    {...rest}
    render={props => {
      console.log(activity, auth, props);
      if (props.match.params.partyId)
        dispatch(joinSessionId({ sessionId: props.match.params.partyId }));
      // if (!activity.isExtensionInstalled) {
      //   return <Redirect to="/installExtension" />;
      // } else 
      if (auth.isAuthenticated) {
        return <Component {...props} />;
      } else
        return <Redirect to={{
          pathname: '/login',
          state: { partyId: props.match.params.partyId }
        }} />;
    }

      // auth.isExtensionInstalled !== true ? (
      //   <Redirect to="/installExtension" />
      // ) : (auth.isAuthenticated ? (
      //   <Component {...props} />
      // ) : (
      //     <Redirect to="/login" />
      //   ))
    }
  />
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  activity: state.activity
});

export default connect(mapStateToProps)(PrivateRoute);
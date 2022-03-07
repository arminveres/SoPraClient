import { Redirect, Route } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import Profile from 'components/views/Profile';
import PropTypes from 'prop-types';

const ProfileRouter = (props) => {
  return (
    <BaseContainer>
      <Route exact path={`${props.base}/:id`} component={Profile} />
      <Route exact path={`${props.base}`}>
        <Redirect to='/login'/>
      </Route>
    </BaseContainer>
  );
};

ProfileRouter.propTypes = {
  base: PropTypes.string,
};

export default ProfileRouter;

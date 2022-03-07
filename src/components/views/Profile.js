import { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { useHistory, useLocation } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
// import 'styles/views/Profile.scss';
import PropTypes from 'prop-types';
import { Button } from 'components/ui/Button';

const FormField = (props) => {
  return (
    <div className='register field'>
      <label className='register label'>{props.label}</label>
      <input
        className='register input'
        placeholder='enter here..'
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Profile = (props) => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const location = useLocation();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const doUpdate = async () => {
    try {
      const id = localStorage.getItem('id');
      const requestBody = JSON.stringify({
        username,
        birthday,
        id,
      });
      const response = await api.put('/users/' + id, requestBody);
      if (response.status == 204) {
        setIsEditable(false);
      }
      // window.location.reload(false);
      history.push(`/profile/` + id);
    } catch (error) {
      alert(
        `Something went wrong during the update of user data: \n${handleError(
          error
        )}`
      );
    }
  };

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const userId = location.pathname.match(/\d+$/);
        const response = await api.get('/users/' + userId);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUser(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error('Details:', error);
        alert(
          'Something went wrong while fetching the users! See the console for details.'
        );
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;
  let addEditButton = '';
  let edit;

  // just one user needs to be able to edit
  const id = localStorage.getItem('id');
  // const id = localStorage.getItem('userId');
  const userId = location.pathname.match(/\d+$/);

  edit = (
    <div>
      <FormField
        label='Change Username'
        value={username}
        onChange={(un) => setUsername(un)}
      />
      <FormField
        label='Change Birthday'
        value={birthday}
        onChange={(b) => setBirthday(b)}
      />
      <Button
        width='100%'
        // close edit window
        onClick={() => [setIsEditable(false), doUpdate()]}
      >
        Change
      </Button>
    </div>
  );

  if (String(id) === String(userId)) {
    // to be done
    addEditButton = (
      <Button
        width='20%'
        // open edit window
        onClick={() => setIsEditable(true)}
      >
        Edit
      </Button>
    );
  }

  if (user) {
    content = (
      <div>
        <div>Username</div>
        <div className='player container'>{user.username}</div>
        <div>Status</div>
        <div className='player container'>{user.status}</div>
        <div>Creation Date</div>
        <div className='player container'>{user.creationdate}</div>
        <div>Birthday</div>
        <div className='player container'>
          {user.birthday ? user.birthday : 'YYYY-MM-DD'}
        </div>
        {addEditButton}
      </div>
    );
  }

  return (
    <BaseContainer>
      <h2>Profile</h2>
      <p className='profile paragraph'>
        Profile:
        {isEditable ? edit : content}
      </p>
    </BaseContainer>
  );
};

export default Profile;

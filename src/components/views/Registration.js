import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = props => {
  return (
    <div className="registration field">
      <label className="registration label">
        {props.label}
      </label>
      <input
        className="registration input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Registration = props => {
  const history = useHistory();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const doRegistration = async() => {
    try {
      const requestBody = JSON.stringify({
        name,
        username,
        password
      });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token, the username,id, token and name into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.username);
      localStorage.setItem('name',user.name);

      // Registration successfully worked --> navigate to the route /game in the GameRouter
      history.push('/game');
    } catch (error) {
      history.push('/registration')
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="registration container">
        <div className="registration form">
          <FormField
            label="Name"
            value={name}
            onChange={un => setName(un)}
          />
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={n => setPassword(n)}
          />
          <div className="registration button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doRegistration()}
            >
              Registration
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Registration;

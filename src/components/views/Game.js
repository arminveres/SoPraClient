import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import BaseContainer from 'components/ui/BaseContainer';
import {useHistory} from 'react-router-dom';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import PropTypes from 'prop-types';
import 'styles/views/Game.scss';
import {Popup} from 'components/ui/Popup'
import {getDomain} from "../../helpers/getDomain";
// import Profile from './Profile';
// import {over} from 'stompjs';

var stompClient = null;

const Game = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    //Websocket Userdata for Invitation
    const [userData, setUserData] = useState({
        from: localStorage.getItem('username'),
        connected: false
    });

    const Player = ({user}) => (
        <div className='player container'>
            {/* <div className='player username'>{user.username} </div> */}
            <button onClick={() => toProfile(user.id)}>{user.username}</button>
            {/* <div className='secondary-button' onClick={() => toProfile(user.id)}>{user.username}</div> */}
            <div className='player name'>{user.name}</div>
            <div className='player id'>id: {user.id}</div>
            <Button width='60%' onClick={() => sendInvite()}>
                Invite
            </Button>
            {/* <Button onClick={() => toProfile(user.id)}>view Profile</Button> */}
        </div>
    );
    Player.propTypes = {
        user: PropTypes.object,
    };
    const toProfile = (id) => {
        let url = "/profile/"
        history.push(url.concat(id));
    };

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    const [popupFlag, setPopupFlag] = useState(null);

    const closePopup = () => {
        setPopupFlag(false);
    }

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    const sendInvite = () => {
        stompClient.send("/app/hello", {}, JSON.stringify("hello"));
    };

    const onInviteReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        // console.log(payloadData);
        setPopupFlag(true);
    }

//connect user to Websocket for invitation
    const connect = () => {
        const socket = new SockJS(`${getDomain()}/websocket`);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
        console.log("just got connected " + userData.from);
    }

    const onError = (err) => {
        const onError = (err) => {
            console.log(err);
        }
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/topic/greetings', function (payload) {
            onInviteReceived(payload)
        });
        //stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
    }
    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users');

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUsers(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
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

            connect();

        }

        fetchData();
    }, []);

    let content = <Spinner/>;

    if (users) {
        content = (
            <div className='game'>
                <ul className='game user-list'>
                    {users.map((user) => (
                        <Player user={user} key={user.id}/>
                    ))}
                </ul>
                <Button width='100%' onClick={() => logout()}>
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <BaseContainer className='game container'>
            <h2>Happy Coding!</h2>
            <p className='game paragraph'>Get all users from secure endpoint:</p>
            <div>
                {popupFlag && <Popup
                    content={<>
                        <b>You have received an Invitation</b>
                    </>}
                    handleClose={closePopup}
                />}
            </div>
            {content}
        </BaseContainer>
    );
};

export default Game;

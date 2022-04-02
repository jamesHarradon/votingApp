import React, { useEffect, useCallback, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logoutUser } from '../../userSlice';
import moment from 'moment';

// user is logged out automatically after 2 mins of inactivity - a countdown is started with 1 min remaining to display to user.
// this is reset if user moves mouse. 

// How it works;

// On each render/when user changes - useCallback function is called, creating a new timestamp in sesson storage.
//                                  - useEffect adds a mousemove event listener and calls timeChecker

// in timeChecker, after a minute, the timestamp is retrieved from session storage and warningInactive is called
// inside warningInactive, setInterval is used to check the timestamp every second against the current time
// the difference is calculated and if there is 1 min remaining, the countdown is saved to state.
// if the time elapsed since last activity is 2 mins, the user is logged out. 
// useRef is used to reference the setTimeout and setInterval functions so they can be cleared.

export default function SessionTimeout() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // const [ second, setSecond ] = useState(0);

    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

    // start inactive check
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 60000);
    };

    // warning timer
    let warningInactive = (timeString) => {
        
        clearTimeout(startTimerInterval.current);
    
        warningInactiveInterval.current = setInterval(() => {
        const maxTime = 5; // Maximum mins given before logout 
        // const remainingTime = 1; // starts logout countdown at 1 min remaining.
    
        const diff = moment.duration(moment().diff(moment(timeString)));
        const minPast = diff.minutes();
        // const leftSecond = 60 - diff.seconds();
    
        // if (minPast === remainingTime) {
        //     // seconds remaining are saved in state ready to display to user
        //     setSecond(leftSecond);
        // }
    
        if (minPast === maxTime) {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
            dispatch(logoutUser()).then(() => navigate('/login'));
            }
        }, 1000);
    };

    let resetTimer = useCallback(() => {

        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);

        if (user) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timeStamp = moment();
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
        }
        timeChecker();
    }, [user]);

    

    // Life cycle hook
    useEffect(() => {
        
        window.addEventListener('mousemove', resetTimer);
        timeChecker();

        // runs when component unmounts
        return () => {
            clearTimeout(startTimerInterval.current);
        }

    }, [resetTimer, timeChecker]);

    return <Fragment />
}
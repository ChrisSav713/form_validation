import React, {useReducer} from 'react';

const ACTIONS = {
    SET_FIRSTNAME: 'set-firstname',
    SET_FIRSTNAME_ERROR: 'set-firstname-error',
    SET_LASTNAME: 'set-lastname',
    SET_LASTNAME_ERROR: 'set-lastname-error',
    SET_EMAIL: 'set-email',
    SET_EMAIL_ERROR: 'set-email-error',
    SET_BEEN_SUBMITTED: 'set-been-submitted'
}

const initialState = {
    firstName: {
        value: '',
        error: ''
    },
    lastName: {
        value: '',
        error: ''
    },
    email: {
        value: '',
        error: ''
    },
    beenSubmitted: false
}

const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SET_FIRSTNAME:
            return { ...state, firstName: { ...state.firstName, value: action.payload }}
        case ACTIONS.SET_FIRSTNAME_ERROR:
            return { ...state, firstName: { ...state.firstName, error: action.payload }}
        case ACTIONS.SET_LASTNAME:
            return { ...state, lastName: { ...state.lastName, value: action.payload }}
        case ACTIONS.SET_LASTNAME_ERROR:
            return { ...state, lastName: { ...state.lastName, error: action.payload }}
        case ACTIONS.SET_EMAIL:
            return { ...state, email: { ...state.email, value: action.payload }}
        case ACTIONS.SET_EMAIL_ERROR:
            return { ...state, email: { ...state.email, error: action.payload }}
        case ACTIONS.SET_BEEN_SUBMITTED:
            return { ...state, beenSubmitted: action.payload}
        default:
            return state
    }
}

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const submit = (e) => {
        e.preventDefault();

        if(!state.firstNameError && !state.lastNameError && !state.emailError)
        {
            dispatch({type: ACTIONS.SET_BEEN_SUBMITTED, payload: true});
        }
    };

    const validateFirstName = (e) => {
        dispatch({type: ACTIONS.SET_FIRSTNAME, payload: e.target.value});
        if(e.target.value.length < 2) {
            dispatch({type: ACTIONS.SET_FIRSTNAME_ERROR, payload: "First name must be at least 2 characters"});
        } else {
            dispatch({type: ACTIONS.SET_FIRSTNAME_ERROR, payload: ""});
        }
    };

    const validateLastName = (e) => {
        dispatch({type: ACTIONS.SET_LASTNAME, payload: e.target.value});
        if(e.target.value.length < 2) {
            dispatch({type: ACTIONS.SET_LASTNAME_ERROR, payload: "Last name must be at least 2 characters"});
        } else {
            dispatch({type: ACTIONS.SET_LASTNAME_ERROR, payload: ""});
        }
    };

    const validateEmail = (e) => {
        dispatch({type: ACTIONS.SET_EMAIL, payload: e.target.value});
        if(e.target.value.length < 5) {
            dispatch({type: ACTIONS.SET_EMAIL_ERROR, payload: "Email must be at least 5 characters"});
        } else {
            dispatch({type: ACTIONS.SET_EMAIL_ERROR, payload: ""});
        }
    };

    return(
        <div className="container w-25">
            <p>hi</p>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input className="form-control" type="text" name="first_name" onChange={validateFirstName}></input>
                    {
                        state.firstName.error ? 
                        <small className="form-text text-danger">{state.firstName.error}</small> :
                        <small className="form-text text-danger">&nbsp;</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input className="form-control" type="text" name="last_name" onChange={validateLastName}></input>
                    {
                        state.lastName.error ? 
                        <small className="form-text text-danger">{state.lastName.error}</small> :
                        <small className="form-text text-danger">&nbsp;</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" type="text" name="email" onChange={validateEmail}></input>
                    {
                        state.email.error ? 
                        <small className="form-text text-danger">{state.email.error}</small> :
                        <small className="form-text text-danger">&nbsp;</small>
                    }
                </div>
                {
                    !state.firstName.error && !state.lastName.error && !state.email.error ?
                        <input className="btn btn-primary mt-2" type="submit" value="Submit"/> : 
                        <input disabled className="btn btn-primary mt-2" type="submit" value="Submit"/>
                }
            </form>
            <hr></hr>
            <h5>User Form Data {state.beenSubmitted ? <span>Submitted</span> : <span>Unsubmitted</span>}</h5>
            <div className="container">
                <p>First Name: <span>{state.firstName.value}</span></p>
                <p>Last Name: <span>{state.lastName.value}</span></p>
                <p>Email: <span>{state.email.value}</span></p>
            </div>
        </div>
    )
}
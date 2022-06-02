import * as actiontypes from '../actionTypes'


const loginReducer = (state = { email: '', password: '' }, action) => {
    switch (action.type) {
        case actiontypes.LOGIN_ATTEMPT:
            return Object.assign({}, state, {
                email: action.email,
                password: action.password,
            });
        case actiontypes.LOGIN_FAILED:
            return {...state, errMess: action.payload };
    }

    return state;
}

export default loginReducer;
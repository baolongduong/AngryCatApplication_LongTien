import * as actiontypes from '../actionTypes'

export const loginAction = (email, password) => {
    return {
        type: actiontypes.LOGIN_ATTEMPT,
        payload: {
            email: email,
            password: password
        }
    }};

export const loginFailed = (errmess) => ({
    type: actiontypes.LOGIN_FAILED,
    payload: errmess
});
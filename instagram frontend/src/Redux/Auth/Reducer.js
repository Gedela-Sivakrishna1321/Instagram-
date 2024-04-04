import {SIGN_IN, SIGN_UP} from '../Auth/ActionType'

const initialValues = {
    signin : null,
    signup : null
}

export const AuthReducer = (store = initialValues, {type,payload}) => {

    if(type === SIGN_IN) {
        return {...store, signin:payload};
    } 
    else if (type === SIGN_UP) {
        return {...store, signup:payload}
    }

    return store;
}
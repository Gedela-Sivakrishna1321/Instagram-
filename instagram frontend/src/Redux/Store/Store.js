import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { AuthReducer } from "../Auth/Reducer";
import thunk from "redux-thunk";
import { userReducer } from "../User/Reducer";
import { PostReducer } from "../Post/Reducer";
import { CommentReducer } from "../Comment/Reducer";


const rootReducers = combineReducers({
    auth : AuthReducer,
    user : userReducer,
    post : PostReducer,
    comment : CommentReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
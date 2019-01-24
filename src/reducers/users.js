import { RECEIVE_USERS } from '../actions/users'
import {ADD_QUESTION, ADD_QUESTION_ANSWER} from '../actions/questions'
export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }
}
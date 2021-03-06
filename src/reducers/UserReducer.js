import { actionTypes } from '../config/actionTypes';

const initialState = {
    session: JSON.parse(localStorage.getItem('session')),
    unauthenticated: JSON.parse(localStorage.getItem('session')) ? false : true,
    loading: true,
    submitting: false,
    darkTheme: JSON.parse(localStorage.getItem('darkTheme')) || false
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SESSION:
            return { ...state, session: action.session }
        case actionTypes.SET_UNAUTHENTICATED:
            return { ...state, unauthenticated: action.unauthenticated }
        case actionTypes.SET_USER:
            return { ...state, user: action.user }
        case actionTypes.SET_USER_PROFILE:
            return { ...state, userProfile: action.userProfile }
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.loading }
        case actionTypes.SET_SUBMITTING:
            return { ...state, submitting: action.submitting }
        case actionTypes.SET_SUCCESS:
            return { ...state, success: action.success }
        case actionTypes.SET_ERROR:
            return { ...state, error: action.error }
        case actionTypes.SET_DARK_THEME:
            return { ...state, darkTheme: action.darkTheme }
        default:
            return state;
    }
};
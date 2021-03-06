import { call, put, takeLatest } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import CommentProvider from '../providers/CommentProvider';
import  { setOpinion, resetOpinionReducer } from '../../actions/opinions';
import { getSession, setSubmitting, setError } from '../../actions/users';
import { actionTypes } from '../../config/actionTypes';
import { parseCommentsDate } from '../../utils';

function* createCommentGenerator(action) {
    try {
        yield put(getSession);        
        const res = yield call(CommentProvider.createComment, action.data);        
        res.updatedOpinion.comments = parseCommentsDate(res.updatedOpinion.comments);
        yield put(resetOpinionReducer);
        yield put(setOpinion(res.updatedOpinion));        
        yield put(setSubmitting(false));        
    } catch (error) {
        yield put(setSubmitting(false));
        yield put(stopSubmit('CreateCommentForm', error.response.data.error));
        yield put(setError(error.response.data.error));
    }    
}

export function* commentSaga() {    
    yield takeLatest(actionTypes.CREATE_COMMENT, createCommentGenerator);
}
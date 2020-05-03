import { registration } from '../../api/api';
import { SET_AUTH_DATA_AC } from '../action-creators/action-creators';

export const registrationUser = (data) => dispatch => {
    registration(data);
    dispatch(SET_AUTH_DATA_AC({ isAuth: true }));
}
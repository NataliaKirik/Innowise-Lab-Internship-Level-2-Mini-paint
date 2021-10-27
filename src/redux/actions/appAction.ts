import { appActionTypes } from '../types/actionTypes';
import { createAction } from '@reduxjs/toolkit';
import { statusType } from '../types/types';

export const appStatus = createAction(appActionTypes.SET_STATUS, (status: statusType) => {
    return {
        payload: status,
    };
});

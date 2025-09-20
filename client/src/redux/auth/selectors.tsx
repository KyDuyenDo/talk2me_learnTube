import { createSelector } from 'reselect';
import type { AuthState } from './types';

const authSelect = (state: { auth: AuthState }) => state.auth;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectCurrentAdmin = createSelector([selectAuth], (auth) => auth.accessToken);

export const isLoggedIn = createSelector([selectAuth], (auth) => auth.loading);
export const selectUser = createSelector([selectAuth], (auth) => auth.user);
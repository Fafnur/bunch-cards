import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { AuthCredentials, AuthPasswordChange, AuthRegister, AuthResponse, AuthSecrets } from '@bunch/auth/common';

// init & restore
export const init = createAction('[Auth] Init');

export const restore = createAction('[Auth] Restore', props<{ token: string | null }>());

// Login
export const login = createAction('[Auth] Login', props<{ credentials: AuthCredentials }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ response: AuthResponse }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: HttpErrorResponse }>());

// Reset
export const reset = createAction('[Auth] Reset', props<{ secrets: AuthSecrets }>());

export const resetSuccess = createAction('[Auth] Reset Success');

export const resetFailure = createAction('[Auth] Reset Failure', props<{ error: HttpErrorResponse }>());

// Register
export const register = createAction('[Auth] Register', props<{ register: AuthRegister }>());

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: HttpErrorResponse }>());

// Change password
export const changePassword = createAction('[Auth] Change Password', props<{ passwordChange: AuthPasswordChange }>());

export const changePasswordSuccess = createAction('[Auth] Change Password Success', props<{ response: AuthResponse }>());

export const changePasswordFailure = createAction('[Auth] Change Password Failure', props<{ error: HttpErrorResponse }>());

// Logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Oauth

export const oauth = createAction('[Auth] Oauth', props<{ response: AuthResponse }>());

export const oauthSuccess = createAction('[Auth] Oauth Success', props<{ response: AuthResponse }>());

export const oauthFailure = createAction('[Auth] Oauth Failure', props<{ error: HttpErrorResponse }>());

// Confirm email
export const confirmEmail = createAction('[Auth] Confirm Email', props<{ token: string }>());

export const confirmEmailSuccess = createAction('[Auth] Confirm Email Success', props<{ response: AuthResponse }>());

export const confirmEmailFailure = createAction('[Auth] Confirm Email Failure', props<{ error: HttpErrorResponse }>());

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

export const registerSuccess = createAction('[Auth] Register Success', props<{ response: AuthResponse }>());

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: HttpErrorResponse }>());

// Change password
export const changePassword = createAction('[Auth] Change Password', props<{ passwordChange: AuthPasswordChange }>());

export const changePasswordSuccess = createAction('[Auth] Change Password Success');

export const changePasswordFailure = createAction('[Auth] Change Password Failure', props<{ error: HttpErrorResponse }>());

// Logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

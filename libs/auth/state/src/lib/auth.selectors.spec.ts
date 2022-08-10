import { AuthState, initialAuthState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  const getState = (data?: Partial<AuthState>) => ({ ...initialAuthState, ...data });
  let state: AuthState;

  it('selectLogged() should return logged', () => {
    state = getState({ logged: true });
    const results = AuthSelectors.selectLogged.projector(state);

    expect(results).toBeTruthy();
  });

  it('selectToken() should return token', () => {
    const token = '1234';
    state = getState({ token });
    const results = AuthSelectors.selectToken.projector(state);

    expect(results).toBe(token);
  });
});

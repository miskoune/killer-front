export function fakeLocalStorage(): Storage {
  const store: Record<string, string> = {
    // Persist user's authentication in the session
    token: 'user-token',
  };

  return {
    ...window.localStorage,
    getItem: (key: string) => store[key],
  };
}

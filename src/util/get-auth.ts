export const getAuth = () => {
  const session = localStorage.getItem('sb-ncdwlflcmlklzfsuijvj-auth-token');
  const parsedSession = session ? JSON.parse(session) : null;
  if (parsedSession) {
    return {
      accessToken: parsedSession.access_token,
      userId: parsedSession.user.id,
    };
  }
  return { accessToken: null, userId: null };
};

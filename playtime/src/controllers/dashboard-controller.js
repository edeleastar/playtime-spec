export const index = (request, h) => {
  const user = request.auth.credentials;
  const userName = user ? `${user.firstName} ${user.lastName}`.trim() : '';
  return h.view('dashboard-view', {
    title: 'Dashboard',
    menu: 'auth',
    user,
    userName,
  });
};

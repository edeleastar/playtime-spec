export const index = (request, h) =>
  h.view('dashboard-view', { title: 'Dashboard', menu: 'auth' });

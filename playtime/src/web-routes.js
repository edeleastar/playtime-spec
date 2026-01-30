const webRoutes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('welcome-view'),
  },
];

export default webRoutes;

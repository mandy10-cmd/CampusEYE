export async function fetchWithAuth(url, options = {}) {
  // 1 – attach access token
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  const cfg = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: access ? `Bearer ${access}` : '',
    },
  };

  // 2 – perform request
  let resp = await fetch(url, cfg);

  // 3 – if token expired → attempt refresh once
  if (resp.status === 401 && refresh) {
    const refreshResp = await fetch(
      'http://127.0.0.1:8000/api/user/token/refresh/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      },
    );

    if (refreshResp.ok) {
      const { access: newAccess } = await refreshResp.json();
      localStorage.setItem('access_token', newAccess);

      // retry original request with new token
      resp = await fetch(url, {
        ...cfg,
        headers: { ...(cfg.headers || {}), Authorization: `Bearer ${newAccess}` },
      });
    }
  }

  return resp;
}

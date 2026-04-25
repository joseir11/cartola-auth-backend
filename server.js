const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const CLIENT_ID = 'cartola-web@apps.globoid';
const AUTH_URL = 'https://goidc.globo.com/auth/realms/globo.com/protocol/openid-connect/auth';
const TOKEN_URL = 'https://goidc.globo.com/auth/realms/globo.com/protocol/openid-connect/token';
const REDIRECT_URI = 'https://SEU_APP_NO_RENDER.onrender.com/callback';  // 👈 Altere depois
const FRONTEND_URL = 'https://SEU_USUARIO.github.io/cartola-fc-app/'; // 👈 Altere depois

// Rota que inicia o login
app.get('/login', (req, res) => {
  // Gerar code_verifier e code_challenge
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');

  // Guardar verifier num cookie seguro na máquina do usuário
  res.cookie('pkce_verifier', verifier, {
    maxAge: 5 * 60 * 1000, // 5 minutos
    httpOnly: true,
    secure: true,
    sameSite: 'Lax'
  });

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    scope: 'openid profile glbid birthdate',
    redirect_uri: REDIRECT_URI,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state: crypto.randomUUID(),
    nonce: crypto.randomUUID()
  });

  res.redirect(`${AUTH_URL}?${params.toString()}`);
});

// Rota que a Globo chama de volta
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const verifier = req.cookies.pkce_verifier;

  if (!code || !verifier) {
    return res.status(400).send('Erro: parâmetros ausentes.');
  }

  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append('redirect_uri', REDIRECT_URI);
  body.append('client_id', CLIENT_ID);
  body.append('code_verifier', verifier);

  const tokenRes = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error('Erro ao trocar token:', err);
    return res.status(500).send('Falha na autenticação.');
  }

  const data = await tokenRes.json();
  // Redireciona de volta para o frontend com o token na URL
  res.redirect(`${FRONTEND_URL}?token=${data.access_token}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Backend rodando na porta ' + PORT));

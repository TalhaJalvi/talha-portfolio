import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';

type Bindings = {
  APP_ENV: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors({
  origin: ['https://talhajalvi.com', 'http://localhost:3000', 'http://localhost:8081'],
  allowHeaders: ['Authorization', 'Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.get('/health', (c) => c.json({ ok: true, service: 'talhajalvi-api', env: c.env.APP_ENV }));

app.get('/api/v1/challenges', async (c) => {
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);
  const { data, error } = await supabase
    .from('challenges')
    .select('id, slug, title, description, difficulty, scenario_config, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) return c.json({ error: 'Unable to load challenges' }, 500);
  return c.json({ data });
});

app.get('/api/v1/me/progress', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);

  const token = authHeader.slice(7);
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) return c.json({ error: 'Unauthorized' }, 401);

  const { data, error } = await supabase
    .from('progress')
    .select('challenge_id, completed, best_score, updated_at')
    .eq('user_id', userData.user.id);

  if (error) return c.json({ error: 'Unable to load progress' }, 500);
  return c.json({ data });
});

app.post('/api/v1/attempts', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);

  const token = authHeader.slice(7);
  const authClient = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);
  const { data: userData, error: userError } = await authClient.auth.getUser(token);
  if (userError || !userData.user) return c.json({ error: 'Unauthorized' }, 401);

  const body = await c.req.json<{
    challengeId: string;
    score: number;
    architecture: unknown;
    metrics: unknown;
  }>();

  if (!body.challengeId || !Number.isFinite(body.score) || body.score < 0 || body.score > 100) {
    return c.json({ error: 'Invalid attempt payload' }, 400);
  }

  const admin = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await admin
    .from('attempts')
    .insert({
      user_id: userData.user.id,
      challenge_id: body.challengeId,
      score: body.score,
      architecture_json: body.architecture,
      metrics_json: body.metrics
    })
    .select('id, score, created_at')
    .single();

  if (error) return c.json({ error: 'Unable to save attempt' }, 500);
  return c.json({ data }, 201);
});

export default app;

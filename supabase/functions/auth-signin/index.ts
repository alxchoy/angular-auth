import { Cookie, setCookie } from 'jsr:@std/http/cookie';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { email, password } = await req.json();
    const headers = new Headers({
      ...corsHeaders,
      'Content-Type': 'application/json',
    });

    const supabaseClient = createClient(
      Deno.env.get('PROJECT_URL') ?? '',
      Deno.env.get('API_KEY') ?? '',
    );
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const userData = {
      id: data.user.id,
      email: data.user.email,
      metadata: data.user.user_metadata,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at,
    };

    const cookie: Cookie = {
      name: 'access_token',
      value: data.session.access_token,
      secure: true,
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: data.session.expires_in,
    };

    setCookie(headers, cookie);

    return new Response(JSON.stringify(userData), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

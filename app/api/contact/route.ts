import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'studio@sqwr.be';

// ── Rate limiting — Upstash Redis (persistant) ou in-memory (fallback) ────────
let ratelimit: { limit: (id: string) => Promise<{ success: boolean }> } | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Ratelimit } = require('@upstash/ratelimit');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Redis } = require('@upstash/redis');
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '60 s'),
    analytics: false,
  });
}

// Fallback in-memory si Upstash non configuré
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX    = 3;
const rateMap = new Map<string, { count: number; resetAt: number }>();

async function isRateLimited(ip: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return !success;
  }
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez patienter avant de réessayer.' },
      { status: 429 }
    );
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, company, service, budget, message } = body;

    // Validation basique
    if (!name || !email || !message || !service) {
      return NextResponse.json(
        { error: 'Champs requis manquants.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    // Email interne à SQWR — notif complète
    await resend.emails.send({
      from: 'SQWR Studio <contact@sqwr.be>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[sqwr.be] Nouveau message — ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF8; padding: 40px;">
          <div style="border-left: 3px solid #E01919; padding-left: 24px; margin-bottom: 32px;">
            <p style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin: 0 0 8px;">Nouveau message via sqwr.be</p>
            <h1 style="font-size: 28px; font-weight: 400; color: #111; margin: 0; line-height: 1.1;">${name}</h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr style="border-bottom: 1px solid #E6E6E6;">
              <td style="padding: 12px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; width: 120px;">Email</td>
              <td style="padding: 12px 0; font-size: 15px; color: #111;"><a href="mailto:${email}" style="color: #E01919; text-decoration: none;">${email}</a></td>
            </tr>
            ${company ? `<tr style="border-bottom: 1px solid #E6E6E6;">
              <td style="padding: 12px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999;">Entreprise</td>
              <td style="padding: 12px 0; font-size: 15px; color: #111;">${company}</td>
            </tr>` : ''}
            <tr style="border-bottom: 1px solid #E6E6E6;">
              <td style="padding: 12px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999;">Service</td>
              <td style="padding: 12px 0; font-size: 15px; color: #111;">${service}</td>
            </tr>
            ${budget ? `<tr style="border-bottom: 1px solid #E6E6E6;">
              <td style="padding: 12px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999;">Budget</td>
              <td style="padding: 12px 0; font-size: 15px; color: #111;">${budget}</td>
            </tr>` : ''}
          </table>

          <div style="background: white; border: 1px solid #E6E6E6; padding: 24px; margin-bottom: 32px;">
            <p style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin: 0 0 12px;">Message</p>
            <p style="font-size: 16px; color: #333; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <a href="mailto:${email}?subject=Re: Votre demande chez SQWR Studio"
             style="display: inline-block; background: #E01919; color: white; padding: 14px 32px; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none;">
            Répondre à ${name}
          </a>

          <p style="margin-top: 40px; font-family: monospace; font-size: 10px; color: #bbb; text-transform: uppercase; letter-spacing: 0.1em;">
            SQWR Studio · sqwr.be · Bruxelles
          </p>
        </div>
      `,
    });

    // Email de confirmation automatique au client
    await resend.emails.send({
      from: 'SQWR Studio <contact@sqwr.be>',
      to: email,
      subject: 'Votre message a bien été reçu — SQWR Studio',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF8; padding: 40px;">
          <div style="border-left: 3px solid #E01919; padding-left: 24px; margin-bottom: 32px;">
            <p style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin: 0 0 8px;">SQWR Studio</p>
            <h1 style="font-size: 28px; font-weight: 400; color: #111; margin: 0; line-height: 1.1;">Message bien reçu,<br>${name}.</h1>
          </div>

          <p style="font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 16px;">
            Merci pour votre message. Nous l'avons bien reçu et vous répondrons dans les <strong style="color: #111; font-weight: 500;">meilleurs délais</strong> — généralement sous 24 à 48h ouvrables.
          </p>
          <p style="font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 32px;">
            En attendant, n'hésitez pas à consulter notre portfolio sur <a href="https://sqwr.be/portfolio" style="color: #E01919; text-decoration: none;">sqwr.be</a>.
          </p>

          <div style="border-top: 1px solid #E6E6E6; padding-top: 24px; display: flex; justify-content: space-between;">
            <p style="font-family: monospace; font-size: 10px; color: #bbb; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">
              SQWR Studio · Bruxelles
            </p>
            <a href="https://sqwr.be" style="font-family: monospace; font-size: 10px; color: #bbb; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;">
              sqwr.be
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

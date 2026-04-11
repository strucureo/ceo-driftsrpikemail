import nodemailer from 'nodemailer';
import NodeCache from 'node-cache';
import dns from 'dns';
import tls from 'tls';

// Set DNS to use Google's DNS servers for better resolution in serverless
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

// Patch TLS to allow small DH keys (Node 24 fix)
const _createSecureContext = tls.createSecureContext;
tls.createSecureContext = (options = {}) => {
  return _createSecureContext({
    ...options,
    ciphers: [
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES128-GCM-SHA256',
      'AES256-SHA256',
      'AES128-SHA256',
      'AES256-SHA',
      'AES128-SHA',
      'DES-CBC3-SHA',
      'RC4-SHA',
      'RC4-MD5',
      '@SECLEVEL=0'
    ].join(':'),
    minVersion: 'TLSv1'
  });
};

// Global connection pools
const smtpPool = new Map();
const cache = new NodeCache({ 
  stdTTL: 300,
  checkperiod: 60,
  useClones: false
});

// SMTP connection pooling with reuse
export function getSmtpTransporter(smtpConfig) {
  const key = `${smtpConfig.smtp_host}_${smtpConfig.smtp_port}_${smtpConfig.smtp_user}`;
  
  if (!smtpPool.has(key)) {
    const transporter = nodemailer.createTransport({
      host: smtpConfig.smtp_host?.trim(),
      port: Number(smtpConfig.smtp_port),
      secure: smtpConfig.smtp_secure === 'true' || smtpConfig.smtp_secure === true,
      auth: {
        user: smtpConfig.smtp_user?.trim(),
        pass: smtpConfig.smtp_pass?.trim()
      },
      pool: true,
      maxConnections: 10,
      maxMessages: 100,
      rateLimit: 50,
      rateDelta: 1000,
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1',
        ciphers: 'ALL:@SECLEVEL=0'
      }
    });
    
    smtpPool.set(key, transporter);
  }
  
  return smtpPool.get(key);
}

// Cache operations
export const cacheGet = (key) => cache.get(key);
export const cacheSet = (key, value, ttl = 300) => cache.set(key, value, ttl);
export const cacheDel = (key) => cache.del(key);

// Cleanup function for graceful shutdown
export function cleanup() {
  for (const [key, transporter] of smtpPool) {
    transporter.close();
  }
  smtpPool.clear();
  cache.flushAll();
}
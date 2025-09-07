import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Interfaces
export interface Subscriber {
  id: number;
  email: string;
  name?: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: string;
  service_id?: string;
  service_name?: string;
  tags?: string;
  preferences?: string;
  last_email_sent?: string;
  created_at: string;
  updated_at: string;
}

export interface NewSubscriber {
  email: string;
  name?: string;
  status?: 'active' | 'unsubscribed' | 'bounced';
  source?: string;
  service_id?: string;
  service_name?: string;
  tags?: string;
  preferences?: string;
}

export interface Campaign {
  id: number;
  name: string;
  subject: string;
  content: string;
  status: 'draft' | 'sent' | 'scheduled';
  sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailMetric {
  id: number;
  campaign_id: number;
  subscriber_id: number;
  event_type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed';
  event_time: string;
  metadata?: string;
}

// Configuración de la base de datos
const dbPath = path.join(process.cwd(), 'data', 'newsletter.db');
let db: Database.Database | null = null;

// Inicializar la base de datos
export function initializeDatabase(): Database.Database {
  if (!db) {
    // Crear directorio si no existe
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new Database(dbPath);
    
    // Crear tabla de suscriptores si no existe
    db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'active',
        source TEXT DEFAULT 'website',
        service_id TEXT,
        service_name TEXT,
        tags TEXT,
        preferences TEXT,
        last_email_sent DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de campañas/promociones
    db.exec(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        content TEXT NOT NULL,
        sent_at DATETIME,
        recipients_count INTEGER DEFAULT 0,
        opened_count INTEGER DEFAULT 0,
        clicked_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de métricas
    db.exec(`
      CREATE TABLE IF NOT EXISTS email_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subscriber_id INTEGER,
        campaign_id INTEGER,
        event_type TEXT, -- 'sent', 'opened', 'clicked', 'bounced', 'unsubscribed'
        event_data TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(subscriber_id) REFERENCES subscribers(id),
        FOREIGN KEY(campaign_id) REFERENCES campaigns(id)
      )
    `);

    console.log('Database initialized at:', dbPath);
  }
  
  return db;
}

// Funciones para suscriptores
export class SubscriberService {
  private db: Database.Database;

  constructor() {
    this.db = initializeDatabase();
  }

  // Agregar suscriptor
  addSubscriber(subscriber: NewSubscriber): { success: boolean; id?: number; error?: string } {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO subscribers (email, name, status, source, service_id, service_name, tags, preferences)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        subscriber.email,
        subscriber.name || null,
        subscriber.status || 'active',
        subscriber.source || 'website',
        subscriber.service_id || null,
        subscriber.service_name || null,
        subscriber.tags || null,
        subscriber.preferences || null
      );

      return { success: true, id: result.lastInsertRowid as number };
    } catch (error) {
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return { success: false, error: 'Email already exists' };
      }
      return { success: false, error: (error as Error).message };
    }
  }

  // Obtener suscriptor por email
  getSubscriberByEmail(email: string): Subscriber | null {
    const stmt = this.db.prepare('SELECT * FROM subscribers WHERE email = ?');
    return stmt.get(email) as Subscriber || null;
  }

  // Obtener todos los suscriptores activos
  getActiveSubscribers(limit?: number): Subscriber[] {
    let query = 'SELECT * FROM subscribers WHERE status = ? ORDER BY subscribed_at DESC';
    if (limit) {
      query += ` LIMIT ${limit}`;
    }
    const stmt = this.db.prepare(query);
    return stmt.all('active') as Subscriber[];
  }

  // Actualizar estado del suscriptor
  updateSubscriberStatus(email: string, status: 'active' | 'unsubscribed' | 'bounced'): boolean {
    const stmt = this.db.prepare('UPDATE subscribers SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?');
    const result = stmt.run(status, email);
    return result.changes > 0;
  }

  // Obtener estadísticas
  getStats(): { total: number; active: number; unsubscribed: number; today: number } {
    const total = this.db.prepare('SELECT COUNT(*) as count FROM subscribers').get() as { count: number };
    const active = this.db.prepare('SELECT COUNT(*) as count FROM subscribers WHERE status = ?').get('active') as { count: number };
    const unsubscribed = this.db.prepare('SELECT COUNT(*) as count FROM subscribers WHERE status = ?').get('unsubscribed') as { count: number };
    const today = this.db.prepare('SELECT COUNT(*) as count FROM subscribers WHERE DATE(subscribed_at) = DATE("now")').get() as { count: number };

    return {
      total: total.count,
      active: active.count,
      unsubscribed: unsubscribed.count,
      today: today.count
    };
  }

  // Buscar suscriptores
  searchSubscribers(query: string): Subscriber[] {
    const stmt = this.db.prepare('SELECT * FROM subscribers WHERE email LIKE ? OR name LIKE ? ORDER BY subscribed_at DESC');
    return stmt.all(`%${query}%`, `%${query}%`) as Subscriber[];
  }
}

// Cerrar la base de datos cuando la aplicación termine
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

export default SubscriberService;

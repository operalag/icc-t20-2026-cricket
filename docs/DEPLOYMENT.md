# Deployment Guide - Cricket Prediction Markets

This guide covers deployment of the Cricket Prediction Markets platform to production.

## Prerequisites

- Node.js 18+
- TON wallet with testnet/mainnet TON
- Access to TON blockchain node or API
- PostgreSQL database
- Redis instance
- Domain name and SSL certificate

## Phase 1: Smart Contract Deployment

### 1.1 Compile Smart Contracts

```bash
cd contracts/
func -o market.fif market.fc
func -o amm-pool.fif amm-pool.fc
func -o jetton.fif jetton.fc
func -o settlement.fif settlement.fc
```

### 1.2 Deploy to TON Testnet

```bash
# Deploy Market Factory
ton-cli deploy --contract market-factory.fif --network testnet

# Deploy Jetton Master
ton-cli deploy --contract jetton-master.fif --network testnet

# Deploy Settlement Manager
ton-cli deploy --contract settlement-manager.fif --network testnet
```

### 1.3 Verify Deployments

```bash
ton-cli get-account <contract-address> --network testnet
```

### 1.4 Update Contract Addresses

Update `.env.production` with deployed contract addresses:

```
MARKET_FACTORY_ADDRESS=EQD...
JETTON_MASTER_ADDRESS=EQD...
SETTLEMENT_MANAGER_ADDRESS=EQD...
```

## Phase 2: Database Setup

### 2.1 PostgreSQL Database

```sql
-- Create database
CREATE DATABASE cricket_markets_prod;

-- Run migrations
psql -d cricket_markets_prod -f migrations/001_create_tables.sql
psql -d cricket_markets_prod -f migrations/002_create_indexes.sql
psql -d cricket_markets_prod -f migrations/003_create_functions.sql
```

### 2.2 Redis Configuration

```bash
# Install Redis
sudo apt-get install redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf

# Set maxmemory and eviction policy
maxmemory 2gb
maxmemory-policy allkeys-lru

# Restart Redis
sudo systemctl restart redis
```

## Phase 3: Backend Services

### 3.1 API Gateway

```bash
cd backend/api-gateway
npm install
npm run build

# Start with PM2
pm2 start dist/server.js --name cricket-api
pm2 save
```

### 3.2 Odds Calculation Engine

```bash
cd backend/odds-engine
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start service
python main.py
```

### 3.3 Real-Time Updates Service

```bash
cd backend/realtime-service
npm install
npm run build

# Start with PM2
pm2 start dist/server.js --name cricket-realtime
pm2 save
```

### 3.4 Cricket Data Feed Adapter

```bash
cd backend/data-adapter
npm install
npm run build

# Start with PM2
pm2 start dist/server.js --name cricket-data
pm2 save
```

## Phase 4: Frontend Deployment

### 4.1 Build Next.js Application

```bash
cd /Users/tonicaradonna/cricket
npm install
npm run build
```

### 4.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### 4.3 Configure Custom Domain

```bash
# Add domain in Vercel
vercel domains add cricket-markets.com

# Configure DNS records
# A record: @ -> 76.76.21.21
# CNAME: www -> cname.vercel-dns.com
```

### 4.4 Update TON Connect Manifest

Update `/public/tonconnect-manifest.json` with production URL:

```json
{
  "url": "https://cricket-markets.com",
  "name": "Cricket Prediction Markets",
  "iconUrl": "https://cricket-markets.com/icon-512.png"
}
```

## Phase 5: Infrastructure Setup

### 5.1 Load Balancer (NGINX)

```nginx
upstream api_backend {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 80;
    server_name api.cricket-markets.com;

    location / {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 5.2 SSL Certificate (Let's Encrypt)

```bash
sudo certbot --nginx -d cricket-markets.com -d www.cricket-markets.com
```

### 5.3 Firewall Configuration

```bash
# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

## Phase 6: Monitoring & Logging

### 6.1 Prometheus

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cricket-api'
    static_configs:
      - targets: ['localhost:3001', 'localhost:3002']

  - job_name: 'cricket-realtime'
    static_configs:
      - targets: ['localhost:3005']
```

### 6.2 Grafana Dashboards

Import dashboards:
- API performance dashboard
- Market activity dashboard
- Bet volume dashboard
- System health dashboard

### 6.3 ELK Stack

```bash
# Install Elasticsearch
sudo apt-get install elasticsearch

# Install Logstash
sudo apt-get install logstash

# Install Kibana
sudo apt-get install kibana

# Configure log shipping from API services
```

### 6.4 Sentry Error Tracking

```typescript
// In Next.js app
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: 'production',
  tracesSampleRate: 0.1,
});
```

## Phase 7: Oracle Network Setup

### 7.1 Deploy Oracle Nodes

Deploy 5 independent oracle nodes:

```bash
cd backend/oracle-node
npm install
npm run build

# Configure each node
cp .env.example .env.oracle1
# Edit .env.oracle1 with unique keys

# Start oracle node
pm2 start dist/server.js --name oracle-1
```

### 7.2 Configure Oracle Contract

```bash
# Register oracle addresses in Settlement Manager
ton-cli call <settlement-manager> add_oracle <oracle-address>
```

## Phase 8: Security Hardening

### 8.1 Rate Limiting

```typescript
// In API gateway
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

### 8.2 DDoS Protection

Enable Cloudflare:
- Add site to Cloudflare
- Update DNS nameservers
- Enable "Under Attack" mode if needed

### 8.3 Database Security

```sql
-- Create read-only user for reporting
CREATE USER reporting WITH PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO reporting;

-- Encrypt sensitive columns
ALTER TABLE users ADD COLUMN email_encrypted bytea;
```

## Phase 9: Backup & Disaster Recovery

### 9.1 Database Backups

```bash
# Daily automated backups
0 2 * * * pg_dump cricket_markets_prod | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz

# Backup to S3
aws s3 cp /backups/ s3://cricket-markets-backups/ --recursive
```

### 9.2 Contract State Backup

```bash
# Export contract state
ton-cli dump-account <contract-address> > contract_backup.json
```

### 9.3 Recovery Plan

Document recovery procedures:
1. Database restoration
2. Contract redeployment
3. Service startup sequence
4. DNS failover

## Phase 10: Testing & Launch

### 10.1 Load Testing

```bash
# Install k6
brew install k6

# Run load test
k6 run load-test.js --vus 1000 --duration 5m
```

### 10.2 Security Audit

- Smart contract audit (CertiK, Trail of Bits)
- Penetration testing
- Code review

### 10.3 Phased Rollout

1. **Alpha**: Internal team only (1 week)
2. **Beta**: Invite-only users (2 weeks)
3. **Soft Launch**: Public with volume limits (1 week)
4. **Full Launch**: Remove all restrictions

## Environment Variables

### Production .env

```bash
# TON Blockchain
NEXT_PUBLIC_TON_NETWORK=mainnet
NEXT_PUBLIC_TON_API_KEY=<your-api-key>
TON_NODE_URL=https://toncenter.com/api/v2/jsonRPC

# Smart Contracts
MARKET_FACTORY_ADDRESS=<deployed-address>
JETTON_MASTER_ADDRESS=<deployed-address>
SETTLEMENT_MANAGER_ADDRESS=<deployed-address>

# Database
DATABASE_URL=postgresql://user:pass@db.cricket-markets.com:5432/cricket_prod
DATABASE_POOL_SIZE=20
DATABASE_SSL=true

# Redis
REDIS_URL=redis://cache.cricket-markets.com:6379
REDIS_CLUSTER_NODES=node1:6379,node2:6379,node3:6379

# APIs
CRICKET_API_URL=https://api.sportradar.com/cricket
CRICKET_API_KEY=<your-api-key>

# Security
JWT_SECRET=<random-256-bit-key>
ENCRYPTION_KEY=<random-256-bit-key>
SESSION_SECRET=<random-256-bit-key>

# Monitoring
SENTRY_DSN=<your-sentry-dsn>
DATADOG_API_KEY=<your-datadog-key>
PROMETHEUS_PORT=9090

# Features
ENABLE_IN_PLAY_BETTING=true
ENABLE_KYC=true
MAX_BET_AMOUNT=10000
PLATFORM_FEE_RATE=0.03
```

## Monitoring Checklist

- [ ] API response times <500ms
- [ ] Database query times <100ms
- [ ] Redis cache hit rate >80%
- [ ] Error rate <0.1%
- [ ] TON transaction success rate >99%
- [ ] Odds calculation latency <200ms
- [ ] WebSocket connections stable
- [ ] Disk usage <80%
- [ ] CPU usage <70%
- [ ] Memory usage <80%

## Post-Deployment

### 1. Monitor for 24 hours

Watch all metrics closely for first 24 hours.

### 2. Gradual Traffic Increase

Slowly increase user limits:
- Day 1: 100 concurrent users
- Day 3: 1,000 concurrent users
- Week 1: 10,000 concurrent users
- Week 2: 100,000 concurrent users

### 3. Incident Response Plan

Document procedures for:
- Smart contract bugs
- Database failures
- Oracle failures
- DDoS attacks
- Data breaches

## Support Contacts

- **Smart Contracts**: contracts@cricket-markets.com
- **Infrastructure**: devops@cricket-markets.com
- **Security**: security@cricket-markets.com
- **24/7 Hotline**: +1-XXX-XXX-XXXX

## Rollback Procedure

If critical issues arise:

1. **Immediate**: Pause new bet placements
2. **Isolate**: Identify affected markets
3. **Communicate**: Notify users via status page
4. **Fix**: Deploy hotfix or rollback
5. **Verify**: Test thoroughly
6. **Resume**: Gradually re-enable features

---

**Deployment Checklist**: Use this guide as a checklist for production deployment. Customize based on your specific infrastructure needs.

# 🚀 Deployment Flow

This document describes the complete deployment pipeline for the landing page project, from code changes to production deployment.

## Overview

The deployment follows a **GitOps** approach using GitHub Actions for CI/CD and Argo CD for continuous deployment to Kubernetes.

## Flow Stages

### 1. 💻 Development Phase

**Trigger**: Developer pushes code to `main` branch

**What happens**:

- Developer works locally with `npm run dev` (Vite dev server)
- Code includes React components with shadcn/ui, i18n setup, and theme switching
- Changes are committed and pushed to GitHub repository

**Key files modified**:

- `src/` - React components and application code
- `public/` - Static assets (images, icons, locales)
- `package.json` - Dependencies and scripts

### 2. ⚙️ CI/CD Pipeline (GitHub Actions)

**Trigger**: Push to `main` branch or Pull Request

**Workflow steps**:

#### Step 1: Code Quality & Testing

```yaml
- Checkout code
- Setup Node.js environment
- Install dependencies (`npm ci`)
- Run linting (`npm run lint`)
- Run tests (`npm run test`)
- Type checking (if using TypeScript)
```

#### Step 2: Build Application

```yaml
- Run Vite build (`npm run build`)
- Generate static files in `dist/` folder
- Optimize assets (minification, tree-shaking)
- Generate i18n bundles for EN/PT
```

#### Step 3: Docker Image Creation

```yaml
- Build multi-stage Docker image:
    - Stage 1: Node.js build environment
    - Stage 2: Nginx production server with static files
- Tag image with commit SHA and 'latest'
- Run security scanning (optional)
```

#### Step 4: Registry Push

```yaml
- Authenticate with Docker registry (GitHub Container Registry)
- Push tagged images
- Update image tags in Kubernetes manifests (if using config repo)
```

### 3. 🚢 Infrastructure Deployment (DigitalOcean Kubernetes)

**Trigger**: New Docker image available + Argo CD sync

**Components**:

#### Argo CD Application

- **Sync Policy**: Automated (or manual for production safety)
- **Source**: GitHub repository (manifests in `k8s/` folder)
- **Destination**: DigitalOcean Kubernetes cluster
- **Sync Frequency**: Every 3 minutes (configurable)

#### Kubernetes Resources Created

```yaml
# Deployment
- Pods running Nginx containers with static files
- Resource limits and requests defined
- Health checks (readiness/liveness probes)

# Service
- ClusterIP service exposing pods internally
- Port mapping (80 -> 8080)

# Ingress
- External access configuration
- TLS termination (Let's Encrypt or Cloudflare)
- Domain routing rules
```

### 4. 🌐 CDN & Edge (Cloudflare)

**Trigger**: Kubernetes Ingress exposes service

**Configuration**:

- **DNS**: Points domain to DigitalOcean Load Balancer
- **SSL/TLS**: Full (strict) encryption
- **Caching**: Static assets cached at edge locations
- **Performance**: Minification, Brotli compression
- **Security**: DDoS protection, Bot management

## Deployment Timeline

```
Code Push → GitHub Actions (2-5 min) → Docker Registry (30s) → Argo CD Sync (3 min) → Live (immediate)
```

**Total deployment time**: ~5-10 minutes from push to production

## Environment Configuration

### Environment Variables

```bash
# Build-time (GitHub Actions)
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.yourdomain.com

# Runtime (Kubernetes)
NODE_ENV=production
PORT=8080
```

### Secrets Management

- Docker registry credentials in GitHub Secrets
- Kubernetes secrets for sensitive data
- Cloudflare API tokens for DNS management

## Rollback Strategy

### Automatic Rollback

- **Health checks fail**: Kubernetes automatically restarts pods
- **Image pull fails**: Previous image continues running
- **Argo CD detects drift**: Automatic sync to desired state

### Manual Rollback

```bash
# Rollback to previous deployment
kubectl rollout undo deployment/landing-page

# Rollback to specific revision
kubectl rollout undo deployment/landing-page --to-revision=2

# Check rollout status
kubectl rollout status deployment/landing-page
```

### Git-based Rollback

```bash
# Revert commit in main branch
git revert <commit-hash>
git push origin main

# Argo CD will automatically sync the reversion
```

## Monitoring & Observability

### Health Checks

- **Readiness Probe**: `GET /` returns 200
- **Liveness Probe**: `GET /health` (if implemented)
- **Startup Probe**: Allows time for container initialization

### Logs

```bash
# View application logs
kubectl logs -f deployment/landing-page

# View Argo CD sync logs
kubectl logs -f -n argocd deployment/argocd-application-controller
```

### Metrics (Future Enhancement)

- **Kubernetes metrics**: CPU, memory, pod status
- **Application metrics**: Page load times, error rates
- **CDN metrics**: Cache hit ratio, edge response times

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check GitHub Actions logs
# Common causes: dependency conflicts, TypeScript errors, test failures
```

#### Docker Image Issues

```bash
# Test image locally
docker run -p 8080:8080 ghcr.io/your-username/landing-page:latest
```

#### Kubernetes Deployment Issues

```bash
# Check pod status
kubectl get pods -l app=landing-page

# Describe pod for events
kubectl describe pod <pod-name>

# Check Argo CD application status
kubectl get applications -n argocd
```

#### DNS/CDN Issues

```bash
# Test DNS resolution
dig yourdomain.com

# Check Cloudflare edge cache
curl -I https://yourdomain.com
```

## Security Considerations

### Container Security

- **Base image**: Use official Nginx Alpine image
- **Non-root user**: Container runs as nginx user
- **Minimal attack surface**: Only necessary packages included

### Kubernetes Security

- **RBAC**: Least privilege access for service accounts
- **Network policies**: Restrict pod-to-pod communication
- **Pod security standards**: Enforce security contexts

### Secrets Management

- **Never commit secrets**: Use GitHub Secrets and Kubernetes Secrets
- **Rotate credentials**: Regular rotation of access tokens
- **Principle of least privilege**: Minimal required permissions

## Future Improvements

### Performance

- **Multi-stage builds**: Optimize Docker image size
- **Asset optimization**: WebP images, critical CSS inlining
- **Service Worker**: Cache static assets for offline support

### Monitoring

- **Prometheus/Grafana**: Detailed metrics and dashboards
- **Alerting**: Slack/email notifications for failures
- **Uptime monitoring**: External service monitoring

### Development Experience

- **Preview environments**: Deploy PR branches to temporary environments
- **Local development**: Docker Compose for full stack testing
- **Automated testing**: E2E tests with Playwright/Cypress

---

## Quick Reference

### Useful Commands

```bash
# Local development
npm run dev

# Production build
npm run build && npm run preview

# Docker build
docker build -t landing-page .

# Deploy to staging
git push origin staging

# Emergency rollback
kubectl rollout undo deployment/landing-page
```

### Key Files

- `.github/workflows/deploy.yml` - CI/CD pipeline
- `Dockerfile` - Container configuration
- `k8s/` - Kubernetes manifests
- `argocd/` - Argo CD application definitions

# 🏗️ Infrastructure Decisions

This document captures the architectural decisions made for the landing page project, including the rationale behind technology choices and trade-offs considered.

## Decision Log

### ADR-001: Frontend Framework Choice

**Decision**: Use React + Vite

**Context**:

- Building a simple personal landing page (static content)
- Primary goal is learning CI/CD and infrastructure tools
- Need support for theming and internationalization

**Decision Rationale**:

- **Simplicity**: Vite has minimal configuration overhead
- **Learning Focus**: Allows more time on infrastructure rather than framework complexity
- **Static Output**: Perfect for containerization and CDN caching
- **Development Speed**: Vite's dev server is extremely fast
- **Ecosystem**: Full React ecosystem available for UI components

**Trade-offs**:

- ✅ Faster builds and dev server
- ✅ Simpler deployment (static files)
- ✅ Better learning focus on infrastructure
- ❌ No built-in SSR (not needed for this project)
- ❌ Manual routing setup (single page, so minimal impact)

---

### ADR-002: UI Library Selection

**Decision**: Use shadcn/ui with Tailwind CSS

**Context**:

- Need accessible, modern UI components
- Want to maintain design consistency
- Support for dark/light themes required

**Decision Rationale**:

- **Accessibility**: Built on Radix UI primitives (ARIA compliant)
- **Customization**: Full control over component code
- **Modern Design**: Contemporary aesthetic out of the box
- **Theme Support**: Excellent dark/light mode implementation

**Trade-offs**:

- ✅ Full component customization control
- ✅ Excellent accessibility support
- ✅ Modern design patterns
- ✅ Great TypeScript support
- ❌ Requires manual component installation
- ❌ Steeper learning curve than pre-built libraries

---

### ADR-003: Container Orchestration Platform

**Decision**: Use Kubernetes on DigitalOcean

**Context**:

- Learning objective: understand enterprise deployment patterns
- Need scalable, production-like infrastructure
- Budget considerations for hosting costs

**Decision Rationale**:

- **Learning Value**: Kubernetes is industry standard for container orchestration
- **Cost Effective**: DigitalOcean pricing is predictable and reasonable
- **Managed Service**: Reduces operational overhead while learning
- **GitOps Ready**: Works well with Argo CD deployment patterns

**Trade-offs**:

- ✅ Industry-standard technology
- ✅ Excellent learning opportunity
- ✅ Scalable for future projects
- ✅ Reasonable cost
- ❌ Overkill for a static site
- ❌ Higher complexity than static hosting
- ❌ Requires ongoing cluster maintenance

---

### ADR-004: GitOps Tool Selection

**Decision**: Use Argo CD for continuous deployment

**Context**:

- Want to implement GitOps deployment pattern
- Need automated synchronization between Git and Kubernetes
- Learning objective: understand modern deployment practices

**Decision Rationale**:

- **Git as Source of Truth**: Declarative approach to deployments
- **Visual Interface**: Excellent UI for monitoring deployments
- **Kubernetes Native**: Designed specifically for K8s environments
- **Self-Healing**: Automatic drift detection and correction
- **Industry Adoption**: Widely used in enterprise environments

**Trade-offs**:

- ✅ True GitOps implementation
- ✅ Excellent observability and UI
- ✅ Automatic drift correction
- ✅ Rollback capabilities
- ❌ Additional complexity for simple deployments
- ❌ Learning curve for GitOps concepts
- ❌ Requires separate Git repository for manifests (recommended)

---

### ADR-005: CDN and Edge Provider

**Decision**: Use Cloudflare for CDN, SSL, and DNS

**Context**:

- Need global content delivery for performance
- Require SSL/TLS termination
- Want DDoS protection and security features

**Decision Rationale**:

- **Free Tier**: Excellent free plan for personal projects
- **Performance**: Global edge network with excellent performance
- **Security**: Built-in DDoS protection and Web Application Firewall
- **Ease of Use**: Simple DNS and SSL management
- **Additional Features**: Analytics, caching rules, Workers capability

**Trade-offs**:

- ✅ Excellent performance and reliability
- ✅ Comprehensive security features
- ✅ Free tier covers project needs
- ✅ Simple configuration and management
- ❌ Vendor lock-in for advanced features
- ❌ Less control over edge configuration vs self-managed

---

### ADR-006: CI/CD Pipeline Architecture

**Decision**: Use GitHub Actions for CI/CD with containerized deployments

**Context**:

- Code hosted on GitHub
- Need automated testing and deployment
- Want integration with existing GitHub workflow

**Decision Rationale**:

- **Integration**: Seamless integration with GitHub repository
- **Free Tier**: Generous free minutes for open source projects
- **Ecosystem**: Rich marketplace of actions and workflows
- **Learning Value**: Widely used in industry
- **YAML Configuration**: Infrastructure as code approach

**Trade-offs**:

- ✅ Tight GitHub integration
- ✅ Large ecosystem and community
- ✅ Free for public repositories
- ✅ Good performance and reliability
- ❌ Vendor lock-in to GitHub ecosystem
- ❌ Limited customization vs self-hosted solutions

---

### ADR-007: Internationalization Strategy

**Decision**: Use react-i18next with namespace organization

**Context**:

- Support for English and Portuguese languages
- Need runtime language switching
- Want maintainable translation management

**Decision Rationale**:

- **Feature Complete**: Pluralization, interpolation, namespaces
- **Runtime Switching**: Change language without reload
- **Community**: Large community and ecosystem
- **Performance**: Efficient loading and caching
- **Developer Experience**: Good tooling and debugging

**Trade-offs**:

- ✅ Comprehensive i18n features
- ✅ Runtime language switching
- ✅ Good performance characteristics
- ✅ Extensive documentation
- ❌ Bundle size increase
- ❌ Complex setup for advanced features

---

## Technology Stack Summary

### Frontend Layer

```
┌─────────────────┐
│   React + Vite  │ ← Fast development, static build output
├─────────────────┤
│   shadcn/ui     │ ← Accessible components, theme support
├─────────────────┤
│  Tailwind CSS   │ ← Utility-first styling
├─────────────────┤
│ react-i18next   │ ← Internationalization
└─────────────────┘
```

### Infrastructure Layer

```
┌─────────────────┐
│   Cloudflare    │ ← CDN, SSL, DNS, Security
├─────────────────┤
│   Kubernetes    │ ← Container orchestration
├─────────────────┤
│   DigitalOcean  │ ← Managed K8s hosting
├─────────────────┤
│     Docker      │ ← Containerization
└─────────────────┘
```

### Automation Layer

```
┌─────────────────┐
│ GitHub Actions  │ ← CI/CD pipeline
├─────────────────┤
│    Argo CD      │ ← GitOps deployment
├─────────────────┤
│  Docker Registry│ ← Container image storage
└─────────────────┘
```

## Quick Decision Reference

**When someone asks "Why did you choose X over Y?"**

| Technology   | Key Reason                 | Learning Value                 |
| ------------ | -------------------------- | ------------------------------ |
| Vite         | Simplicity + static output | Focus on infrastructure        |
| Kubernetes   | Industry standard          | Enterprise deployment patterns |
| Argo CD      | GitOps best practices      | Modern deployment methodology  |
| DigitalOcean | Cost-effective learning    | Managed services balance       |
| Cloudflare   | Performance + security     | Edge computing concepts        |
| shadcn/ui    | Modern + accessible        | Component architecture         |

This architecture balances learning objectives with practical implementation, providing enterprise-relevant experience while maintaining reasonable complexity and cost.

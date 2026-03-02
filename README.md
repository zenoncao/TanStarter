# TanStack Start Starter

基于 TanStack Start 的全栈 React 应用模板，集成现代前端技术栈与云服务。

## 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | TanStack Start, React 19, TypeScript |
| **样式** | Tailwind CSS v4, shadcn/ui, Base UI |
| **数据库** | Drizzle ORM, Cloudflare D1 (SQLite) |
| **认证** | Better Auth |
| **支付** | Stripe |
| **邮件** | Resend |
| **部署** | Cloudflare Pages |
| **工具** | Biome, Bun |

## 快速开始

```bash
# 安装依赖
bun install

# 配置环境变量
cp .env.example .dev.vars

# 启动开发服务器
bun run dev
```

## 环境变量

```bash
# 认证
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# 邮件
RESEND_API_KEY="re_..."
```

## 数据库

```bash
# 生成迁移
bun run db:generate

# 本地执行迁移
bun run db:migrate:local

# 生产环境执行迁移
bun run db:migrate:prod

# 启动 Drizzle Studio
bun run db:studio
```

## 部署

```bash
# 构建
bun run build

# 部署到 Cloudflare Pages
bun run deploy
```

## 项目结构

```
├── src/
│   ├── components/     # UI 组件
│   ├── db/            # 数据库 schema
│   ├── lib/           # 工具库 (auth, stripe, email)
│   ├── routes/        # 应用路由
│   └── styles.css     # 全局样式
├── drizzle/           # 数据库迁移文件
├── public/            # 静态资源
└── wrangler.toml      # Cloudflare 配置
```

## 脚本

| 命令 | 说明 |
|------|------|
| `bun run dev` | 启动开发服务器 |
| `bun run build` | 生产构建 |
| `bun run lint` | 代码检查 |
| `bun run format` | 格式化代码 |
| `bun run test` | 运行测试 |

## 特性

- ⚡ 基于 TanStack Start 的全栈 SSR/SPA
- 🔐 Better Auth 认证系统 (邮箱/密码)
- 💳 Stripe 支付集成
- 📧 Resend 邮件发送
- 🗄️ Drizzle ORM + Cloudflare D1
- 🎨 Tailwind CSS v4 + shadcn/ui
- 🔧 Biome 代码规范
- 🌍 Cloudflare Pages 部署

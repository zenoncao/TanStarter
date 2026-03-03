import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BarChartIcon,
  ZapIcon,
  Shield02Icon,
  UserGroupIcon,
  ArrowRight01Icon,
  Tick02Icon,
  StarIcon,
  Menu01Icon,
  Cancel01Icon,
  SparklesIcon,
  ChartLineData01Icon,
  PieChart03Icon,
  Activity02Icon,
} from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { LoginDialog } from '@/components/auth/login-dialog';
import { RegisterDialog } from '@/components/auth/register-dialog';
import { AuthDialogProvider } from '@/components/providers/auth-dialog-provider';

// Navigation component
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <HugeiconsIcon icon={BarChartIcon} className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Nexus Analytics</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            功能
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            定价
          </a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            客户案例
          </a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            常见问题
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LoginDialog>
            <Button variant="ghost" size="sm">
              登录
            </Button>
          </LoginDialog>
          <Button size="sm">
            免费试用
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
          ) : (
            <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#features" className="text-sm font-medium text-muted-foreground">
              功能
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground">
              定价
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground">
              客户案例
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground">
              常见问题
            </a>
            <Separator className="my-2" />
            <LoginDialog>
              <Button variant="ghost" className="justify-start">登录</Button>
            </LoginDialog>
            <Button>免费试用</Button>
          </nav>
        </div>
      )}
    </header>
  );
}

// Hero section
function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5">
            <HugeiconsIcon icon={SparklesIcon} className="h-3.5 w-3.5" />
            全新 AI 驱动分析引擎
          </Badge>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            数据洞察，
            <span className="text-primary">即刻呈现</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            将分散的数据转化为清晰的商业洞察。Nexus Analytics 帮助团队实时监控关键指标，
            发现增长机会，做出更明智的决策。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2">
              开始免费试用
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              预约演示
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            无需信用卡 · 14 天免费试用 · 随时取消
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 lg:mt-20">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1">
                <div className="mx-auto h-6 w-64 rounded-md bg-muted" />
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={ChartLineData01Icon} className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">总收入</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">¥2.4M</p>
                    <p className="text-xs text-green-500">+12.5% 较上月</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={UserGroupIcon} className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">活跃用户</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">18,492</p>
                    <p className="text-xs text-green-500">+8.2% 较上月</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Activity02Icon} className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">转化率</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">3.24%</p>
                    <p className="text-xs text-green-500">+2.1% 较上月</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="h-48 rounded-lg bg-muted" />
                <div className="h-48 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Logo Cloud
function LogoCloud() {
  const logos = ['Stripe', 'Vercel', 'Notion', 'Figma', 'Slack', 'GitHub'];

  return (
    <section className="border-y bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          已被全球领先团队信赖
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-lg font-semibold text-muted-foreground/50"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features section
function Features() {
  const features = [
    {
      icon: ZapIcon,
      title: '实时数据分析',
      description: '毫秒级数据处理能力，让决策不再等待。支持流式数据接入，实时监控业务动态。',
    },
    {
      icon: Shield02Icon,
      title: '企业级安全',
      description: 'SOC 2 Type II 认证，端到端加密，细粒度权限控制。您的数据安全是我们的首要任务。',
    },
    {
      icon: UserGroupIcon,
      title: '团队协作',
      description: '共享仪表板、注释、警报。让数据洞察在团队间无缝流动，提升协作效率。',
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            为现代团队打造
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            从初创企业到财富 500 强，Nexus Analytics 帮助各类组织释放数据价值
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <HugeiconsIcon icon={feature.icon} className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Detailed Features
function DetailedFeatures() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Feature 1 */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">智能洞察</Badge>
            <h3 className="text-3xl font-bold tracking-tight">
              AI 驱动的异常检测
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              不再错过任何重要的数据变化。我们的 AI 引擎自动识别异常模式，
              在问题发生前主动预警，帮助您防患于未然。
            </p>
            <ul className="mt-6 space-y-3">
              {['自动趋势分析', '智能警报系统', '预测性建议'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <HugeiconsIcon icon={Tick02Icon} className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="h-full rounded-xl bg-card p-6 shadow-xl">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={PieChart03Icon} className="h-5 w-5 text-primary" />
                  <span className="font-medium">异常检测</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">收入波动</span>
                      <Badge variant="destructive" className="text-xs">异常</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">检测到 -23% 的异常下跌</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">用户活跃度</span>
                      <Badge variant="secondary" className="text-xs">正常</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">在预期范围内波动</p>
                  </div>
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <p className="text-xs text-primary">AI 建议: 检查支付网关状态</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const testimonials = [
    {
      quote: 'Nexus Analytics 彻底改变了我们理解数据的方式。现在我们可以实时追踪每一个关键指标，决策速度提升了 3 倍。',
      author: '张明',
      role: 'CEO, TechFlow',
      rating: 5,
    },
    {
      quote: '最直观的分析工具我用过。设置简单，功能强大，团队协作效率大幅提升。',
      author: '李雪',
      role: '产品总监, DataVibe',
      rating: 5,
    },
    {
      quote: '从 Excel 迁移到 Nexus 是我们做过最正确的决定。AI 洞察功能帮我们发现了隐藏的增长机会。',
      author: '王强',
      role: '运营总监, GrowthLab',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            客户怎么说
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            来自全球 10,000+ 团队的信赖
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="relative">
              <CardContent className="pt-6">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <HugeiconsIcon key={i} icon={StarIcon} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10" />
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing
function Pricing() {
  const plans = [
    {
      name: '入门版',
      price: '¥99',
      description: '适合个人和小型团队',
      features: ['5 个仪表板', '10,000 事件/月', '7 天数据保留', '邮件支持'],
      cta: '开始试用',
      variant: 'outline' as const,
    },
    {
      name: '专业版',
      price: '¥299',
      description: '适合成长中的团队',
      features: ['无限仪表板', '100,000 事件/月', '90 天数据保留', '优先支持', '团队协作', 'API 访问'],
      cta: '开始试用',
      variant: 'default' as const,
      popular: true,
    },
    {
      name: '企业版',
      price: '定制',
      description: '适合大型企业',
      features: ['无限一切', '自定义事件限额', '无限数据保留', '专属客户经理', 'SSO/SAML', 'SLA 保障'],
      cta: '联系销售',
      variant: 'outline' as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            简单透明的定价
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            选择适合您的方案，随时升级或降级
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-6">最受欢迎</Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== '定制' && <span className="text-muted-foreground">/月</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.variant}
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-16 sm:py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              准备好开始了吗？
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              加入 10,000+ 已经使用 Nexus Analytics 的团队，让数据驱动您的业务增长。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2">
                免费开始使用
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                联系销售团队
              </Button>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/60">
              14 天免费试用 · 无需信用卡
            </p>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const faqs = [
    {
      question: '如何开始免费试用？',
      answer: '只需点击"开始免费试用"按钮，使用邮箱注册即可。无需绑定信用卡，14 天内可体验所有专业版功能。',
    },
    {
      question: '是否支持数据导出？',
      answer: '是的，我们支持多种格式的数据导出，包括 CSV、JSON 和 Excel。企业版用户还可以通过 API 实时访问数据。',
    },
    {
      question: '我的数据安全吗？',
      answer: '绝对安全。我们采用银行级加密，通过 SOC 2 Type II 认证，数据存储在符合 GDPR 要求的服务器上。',
    },
    {
      question: '可以取消订阅吗？',
      answer: '随时可以。没有长期合同，没有取消费用。您可以在账户设置中随时取消或更改订阅计划。',
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            常见问题
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            还有其他问题？联系我们的支持团队
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {faq.answer}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter
function Newsletter() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-muted/50 p-8 lg:flex-row lg:p-12">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold">订阅我们的数据洞察周刊</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              每周获取最新的数据分析趋势和最佳实践
            </p>
          </div>
          <div className="flex w-full max-w-md gap-3">
            <Input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1"
            />
            <Button>订阅</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const links = {
    产品: ['功能', '定价', '集成', '更新日志', 'API 文档'],
    公司: ['关于我们', '博客', '招聘', '联系我们', '合作伙伴'],
    资源: ['帮助中心', '社区', '模板库', '网络研讨会', '案例研究'],
    法律: ['隐私政策', '服务条款', '安全', 'Cookie 政策'],
  };

  return (
    <footer className="border-t bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <HugeiconsIcon icon={BarChartIcon} className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Nexus Analytics</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              让数据驱动每一个决策
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold">{category}</h4>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 Nexus Analytics. 保留所有权利。
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
export function LandingPage() {
  return (
    <AuthDialogProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <LogoCloud />
          <Features />
          <DetailedFeatures />
          <Testimonials />
          <Pricing />
          <CTASection />
          <FAQ />
          <Newsletter />
        </main>
        <Footer />
        {/* Dialogs managed by AuthDialogProvider */}
        <LoginDialog />
        <RegisterDialog />
      </div>
    </AuthDialogProvider>
  );
}

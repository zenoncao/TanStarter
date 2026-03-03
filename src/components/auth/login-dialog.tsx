'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { useAuthDialog } from '@/components/providers/auth-dialog-provider';

interface LoginDialogProps {
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export function LoginDialog({ children, onSuccess }: LoginDialogProps) {
  const { openDialog, openLogin, openRegister, closeDialog } = useAuthDialog();
  const isOpen = openDialog === 'login';

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) closeDialog();
  };

  // 如果传入子元素，克隆并添加 onClick 处理
  const triggerElement = children ? (
    <div onClick={openLogin}>{children}</div>
  ) : (
    <Button variant="ghost" size="sm" onClick={openLogin}>
      登录
    </Button>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error.message || '登录失败，请检查邮箱和密码');
      } else {
        closeDialog();
        onSuccess?.();
        window.location.reload();
      }
    } catch {
      setError('登录过程中发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToRegister = () => {
    closeDialog();
    // 小延迟确保关闭动画流畅
    setTimeout(openRegister, 50);
  };

  return (
    <>
      {triggerElement}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>欢迎回来</DialogTitle>
            <DialogDescription>
              登录您的 Nexus Analytics 账户以继续
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <Field>
              <FieldLabel>邮箱地址</FieldLabel>
              <div className="relative">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="pl-10"
                  required
                />
              </div>
            </Field>

            <Field>
              <FieldLabel>密码</FieldLabel>
              <div className="relative">
                <HugeiconsIcon
                  icon={LockPasswordIcon}
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    className="h-4 w-4"
                  />
                </button>
              </div>
            </Field>

            {error && <FieldError>{error}</FieldError>}

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  登录
                  <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            还没有账户？{' '}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={switchToRegister}
            >
              立即注册
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

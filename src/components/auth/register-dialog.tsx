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
  UserIcon,
} from '@hugeicons/core-free-icons';
import { useAuthDialog } from '@/components/providers/auth-dialog-provider';

interface RegisterDialogProps {
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export function RegisterDialog({ children, onSuccess }: RegisterDialogProps) {
  const { openDialog, openLogin, openRegister, closeDialog } = useAuthDialog();
  const isOpen = openDialog === 'register';

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) closeDialog();
  };

  // 如果传入子元素，克隆并添加 onClick 处理
  const triggerElement = children ? (
    <div onClick={openRegister}>{children}</div>
  ) : (
    <Button variant="ghost" size="sm" onClick={openRegister}>
      注册
    </Button>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error.message || '注册失败，请稍后重试');
      } else {
        closeDialog();
        onSuccess?.();
        window.location.reload();
      }
    } catch {
      setError('注册过程中发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    closeDialog();
    setTimeout(openLogin, 50);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            注册
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>创建账户</DialogTitle>
          <DialogDescription>
            注册 Nexus Analytics 账户，开始您的数据洞察之旅
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Field>
            <FieldLabel>姓名</FieldLabel>
            <div className="relative">
              <HugeiconsIcon
                icon={UserIcon}
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="pl-10"
                required
              />
            </div>
          </Field>

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
                placeholder="请输入密码（至少8位）"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="pl-10 pr-10"
                minLength={8}
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
                创建账户
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          已有账户？{' '}
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={switchToLogin}
          >
            立即登录
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout = ({ children, className }: ResponsiveLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout;


import React from 'react';
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout = ({ children, className }: ResponsiveLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen transition-all duration-500 ease-in-out",
      "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",
      "dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900",
      "relative overflow-hidden",
      className
    )}>
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full twinkle"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full twinkle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full twinkle" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-pink-400 rounded-full twinkle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-yellow-400 rounded-full twinkle" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 max-w-7xl relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout;

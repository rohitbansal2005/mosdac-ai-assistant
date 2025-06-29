
import React, { useState } from 'react';
import { Bot, Menu, X, Globe, Settings, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LanguageToggle from './LanguageToggle';
import AuthButtons from './AuthButtons';
import ThemeToggle from './ThemeToggle';

interface EnhancedHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
}

const EnhancedHeader = ({ activeTab, setActiveTab, currentLanguage, setCurrentLanguage }: EnhancedHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card/95 backdrop-blur-xl shadow-2xl border-b border-primary/20 sticky top-0 z-50">
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-br from-primary to-accent p-1.5 sm:p-2 rounded-xl shadow-lg cosmic-glow space-float">
              <Rocket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MOSDAC Space AI
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>भारतीय अंतरिक्ष AI Assistant</span>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Hackathon 2025</Badge>
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MOSDAC Space AI
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant={activeTab === 'chat' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('chat')}
              className="transition-all duration-300 hover:bg-primary/10"
            >
              Chat
            </Button>
            <Button 
              variant={activeTab === 'graph' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('graph')}
              className="transition-all duration-300 hover:bg-primary/10"
            >
              Knowledge Graph
            </Button>
            <ThemeToggle />
            <LanguageToggle currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
            <AuthButtons />
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <LanguageToggle currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
            <AuthButtons />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-primary/10"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-primary/20 animate-in slide-in-from-top duration-200">
            <div className="space-y-2">
              <Button 
                variant={activeTab === 'chat' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => {
                  setActiveTab('chat');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start hover:bg-primary/10"
              >
                Chat
              </Button>
              <Button 
                variant={activeTab === 'graph' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => {
                  setActiveTab('graph');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start hover:bg-primary/10"
              >
                Knowledge Graph
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start hover:bg-primary/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;

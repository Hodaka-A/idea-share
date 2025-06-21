import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
}

export function ChatHeader({ sidebarOpen, isMobile, setSidebarOpen, title }: ChatHeaderProps) {
  return (
    <div className="fixed p-3 md:p-4 border-b flex items-center gap-2 min-w-full z-40 bg-white">
      <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen && !isMobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <h1 className="text-base md:text-lg font-semibold truncate">{title}</h1>
    </div>
  );
}
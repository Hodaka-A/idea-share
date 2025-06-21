import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isTyping: boolean;
  sidebarOpen: boolean;
  isMobile: boolean;
}

export function ChatInput({ input, setInput, onSend, onKeyDown, isTyping, sidebarOpen, isMobile }: ChatInputProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-10 border-t bg-background px-3 md:px-4 py-5 transition-all duration-300 ${
        !isMobile && sidebarOpen ? "ml-80" : ""
      }`}
    >
      <div className="w-full px-7">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="メッセージを入力してください... (Shift+Enterで改行)"
            className="flex-1 text-sm md:text-base min-h-[40px] max-h-32 resize-none"
            rows={1}
          />
          <Button
            onClick={onSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-violet-800 via-pink-700 to-orange-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center px-2">
          AIは間違いを犯すことがあります。重要な情報については確認してください。
        </p>
      </div>
    </div>
  );
}
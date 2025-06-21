import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  return (
    <div className="max-w-full md:max-w-3xl mx-auto space-y-4 md:space-y-6 pt-[80px] pb-55">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 md:gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8 md:h-8 md:w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs bg-gradient-to-br from-violet-800 via-pink-700 to-orange-700">
                AI
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[85%] md:max-w-[70%] rounded-lg p-3 md:p-4 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-muted"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8 md:h-8 md:w-8 flex-shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-xs">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-2 md:gap-4 justify-start">
          <Avatar className="h-8 w-8 md:h-8 md:w-8 flex-shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-violet-800 via-pink-700 to-orange-700 text-primary-foreground text-xs">
              AI
            </AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 md:p-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
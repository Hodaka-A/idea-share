import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Settings, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Chat } from "@/Page/AIChat";

type SideBarProps={
   chats:Chat[]
   sidebarOpen:boolean;
   isMobile:boolean;
   handleNewChat:()=>void;
   currentChatId:string |null;
   formatTime:(data:Date)=>string;
   setCurrentChatId:React.Dispatch<React.SetStateAction<string |null >>;
   setSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({chats,sidebarOpen,isMobile,handleNewChat,currentChatId,formatTime,setCurrentChatId,setSidebarOpen}:SideBarProps) => {
  return (
    <>
     <div
        className={`fixed left-0 top-0 h-full ${
          isMobile
            ? `w-80 z-50 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `${
                sidebarOpen ? "w-80" : "w-0"
              } z-30 transition-all duration-300 overflow-hidden`
        } border-r bg-background`}
      >
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="p-5 border-b">
            <Button
              onClick={handleNewChat}
              className="w-full justify-start gap-2 bg-gray-900 text-white py-6 font-bold bg-gradient-to-br
  from-violet-800 via-pink-700 to-orange-700"
            >
              <Plus className="h-4 w-4" />
              新しいチャットを作成
            </Button>
          </div>

          {/* チャット履歴 */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setCurrentChatId(chat.id);
                    if (isMobile) setSidebarOpen(false); // モバイルでチャット選択時にサイドバーを閉じる
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    currentChatId === chat.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(chat.lastMessage)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* フッター */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">ユーザー</p>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default SideBar
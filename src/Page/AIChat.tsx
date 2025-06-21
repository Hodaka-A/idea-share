import type React from "react";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import SideBar from "@/components/SideBar";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

export default function AIChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(true);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "React開発について",
      lastMessage: new Date(Date.now() - 1000 * 60 * 30),
      messages: [
        {
          id: "1",
          content: "Reactの最新機能について教えてください",
          role: "user",
          timestamp: new Date(Date.now() - 1000 * 60 * 35),
        },
        {
          id: "2",
          content:
            "React 18では、Concurrent Rendering、Automatic Batching、Suspenseの改善など多くの新機能が追加されました。",
          role: "assistant",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
        },
      ],
    },
    {
      id: "2",
      title: "TypeScriptのベストプラクティス",
      lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 2),
      messages: [
        {
          id: "3",
          content: "TypeScriptでのベストプラクティスを教えてください",
          role: "user",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
    {
      id: "3",
      title: "AIアプリケーション開発",
      lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 24),
      messages: [],
    },
  ]);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  //   新規のチャットを作成
  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "新しいチャット",
      messages: [],
      lastMessage: new Date(),
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

//   メッセージ送信とAI返信シミュレーションデモ
  const handleSendMessage = async () => {
    if (!input.trim() || !currentChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title:
                chat.messages.length === 0
                  ? input.trim().slice(0, 30) + "..."
                  : chat.title,
              lastMessage: new Date(),
            }
          : chat
      )
    );

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "申し訳ございませんが、これはデモUIです。実際のAI機能を実装するには、AI SDKを使用してバックエンドAPIと連携する必要があります。",
        role: "assistant",
        timestamp: new Date(),
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setIsTyping(false);
    }, 2000);
  };

  // 質問投稿時のリアルタイムの時間表示
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  };

  // 入力フォームの送信ボタンをクリックすると、質問を送信する関数
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // UIのデザイン部分
  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* サイドバー */}
      <SideBar
        chats={chats}
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        handleNewChat={handleNewChat}
        currentChatId={currentChatId}
        formatTime={formatTime}
        setCurrentChatId={setCurrentChatId}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 ${
          !isMobile && sidebarOpen ? "ml-80" : ""
        }`}
      >
        <ChatHeader
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
          setSidebarOpen={setSidebarOpen}
          title={currentChat?.title || "AIアシスタント"}
        />

        {/* チャット表示エリア */}
        <ScrollArea className="flex-1 p-2 md:p-4">
          {currentChat ? (
            <ChatMessages messages={currentChat.messages} isTyping={isTyping} />
          ) : (
            // チャットがないときにデフォルトに表示させるもの
            <div className="flex items-center justify-center h-full p-4 pt-[80px]">
              <div className="text-center max-w-md">
                <MessageSquare className="h-8 w-8 md:h-12 md:w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  AIアシスタントへようこそ
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  新しいチャットを開始するか、既存のチャットを選択してください
                </p>
                <Button
                  onClick={handleNewChat}
                  className="w-full md:w-auto py-6 px-6 font-bold bg-gradient-to-br from-violet-800 via-pink-700 to-orange-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  新しいチャットを開始
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* 入力エリア */}
        {currentChatId && (
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handleSendMessage}
            onKeyDown={handleKeyDown}
            isTyping={isTyping}
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}

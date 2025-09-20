import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithGemini } from "@/lib/supabase";
import chatbotIcon from "@/assets/chatbot-icon.png";

// Update the Message interface to match what the server expects
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Jharkhand tourism assistant. How can I help you plan your perfect trip? मैं आपका झारखंड पर्यटन सहायक हूं। आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूं?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 320, height: 384 });
  const [position, setPosition] = useState({ x: window.innerWidth - 350, y: window.innerHeight - 450 });
  const [language, setLanguage] = useState("english");
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState("");

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Format conversation history for the API
      const historyForApi = messages.map(msg => ({
        isUser: msg.isUser,
        content: msg.content
      }));

      const data = await chatWithGemini(inputMessage, historyForApi, language);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        isUser: false,
        timestamp: new Date(data.timestamp),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeHandle(handle);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (handle.includes('left')) {
        newWidth = Math.max(300, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (handle.includes('right')) {
        newWidth = Math.max(300, startWidth + deltaX);
      }
      if (handle.includes('top')) {
        newHeight = Math.max(350, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }
      if (handle.includes('bottom')) {
        newHeight = Math.max(350, startHeight + deltaY);
      }

      // Constrain to viewport
      newWidth = Math.min(600, newWidth);
      newHeight = Math.min(700, newHeight);
      newX = Math.max(0, Math.min(window.innerWidth - newWidth, newX));
      newY = Math.max(0, Math.min(window.innerHeight - newHeight, newY));

      setWindowSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle("");
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-glow animate-pulse-glow transition-bounce z-50",
          "primary-gradient hover:scale-110"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className={cn(
          "fixed shadow-soft z-40 select-none",
          "flex flex-col bg-card border-2",
          isResizing && "transition-none"
        )}
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${windowSize.width}px`, 
          height: `${windowSize.height}px`
        }}>
          {/* Header */}
          <div className="primary-gradient p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">
                  <img 
                    src={chatbotIcon} 
                    alt="Tourism Bot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Tourism Assistant</h3>
                  <p className="text-xs text-black/80">Always here to help</p>
                </div>
              </div>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm bg-white/70 text-black border border-black/30 rounded px-2 py-1"
              >
                <option value="english" className="text-black">English</option>
                <option value="hindi" className="text-black">हिंदी</option>
                <option value="tamil" className="text-black">தமிழ்</option>
                <option value="bengali" className="text-black">বাংলা</option>
                <option value="telugu" className="text-black">తెలుగు</option>
                <option value="marathi" className="text-black">मराठी</option>
              </select>
            </div>
          </div>


          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  message.isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                  message.isUser 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {message.isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg text-sm transition-smooth",
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border shadow-sm"
                  )}
                >
                  <div className="whitespace-pre-line">
                    {message.content.split('\n').map((line, lineIndex) => {
                      // Handle bullet points (lines starting with * )
                      if (line.trim().startsWith('* ')) {
                        const content = line.replace(/^\* /, '');
                        // Handle bold text within bullet points
                        const formattedContent = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                        return (
                          <div key={lineIndex} className="flex items-start gap-2 mb-1">
                            <span className="text-muted-foreground mt-0.5">•</span>
                            <span dangerouslySetInnerHTML={{ __html: formattedContent }} />
                          </div>
                        );
                      }
                      
                      // Handle regular text with bold formatting
                      const formattedLine = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                      
                      // Skip empty lines unless they're intentional spacing
                      if (line.trim() === '') {
                        return <div key={lineIndex} className="h-2" />;
                      }
                      
                      return (
                        <div key={lineIndex} dangerouslySetInnerHTML={{ __html: formattedLine }} />
                      );
                    })}
            </div>
          </div>
          
          {/* Resize Handles */}
          <div 
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'top-left')}
          />
          <div 
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'top-right')}
          />
          <div 
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
          />
          <div 
            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
          />
          <div 
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'top')}
          />
          <div 
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'bottom')}
          />
          <div 
            className="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'left')}
          />
          <div 
            className="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize bg-primary/20 hover:bg-primary/40"
            onMouseDown={(e) => handleMouseDown(e, 'right')}
          />
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs flex-shrink-0">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="bg-card border shadow-sm p-3 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Jharkhand tourism..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                size="icon"
                disabled={!inputMessage.trim() || isLoading}
                className="primary-gradient text-white transition-smooth"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
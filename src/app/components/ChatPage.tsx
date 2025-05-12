import Chat_Window from "./chat_ui/Chat_Window";

interface darkMode {
  isDarkMode: boolean;
}

export default function ChatPage({ isDarkMode }: darkMode) {
  return <Chat_Window isDarkMode={isDarkMode} />;
}

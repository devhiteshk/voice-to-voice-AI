export function saveChatToLocalStorage(sessionId, chatHistory) {
  const existingChats = JSON.parse(localStorage.getItem("chatSessions")) || {};

  existingChats[sessionId] = chatHistory;

  if (chatHistory?.[0]?.role) {
    localStorage.setItem("chatSessions", JSON.stringify(existingChats));
  }
}

export function retrieveChatsFromLocalStorage() {
  const chats = JSON.parse(localStorage.getItem("chatSessions")) || {};
  return chats;
}

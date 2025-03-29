"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  RefreshCw, 
  AlertCircle, 
  Mail, 
  User, 
  Calendar, 
  Clock, 
  Star, 
  StarOff,
  Trash2, 
  CheckCircle,
  Filter
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isFlagged: boolean;
}

export default function MessagesAdminPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "flagged">("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Fetch messages data
  const { data: messages, isLoading, isError, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await apiClient.get("/messages");
      return response.data.messages || [];
    }
  });

  // Mark message as read
  const markAsRead = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.patch(`/messages/${id}`, { isRead: true });
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setAlert({ message: "Message marked as read", type: "success" });
      setTimeout(() => setAlert(null), 3000);
    }
  });

  // Toggle flag status
  const toggleFlag = useMutation({
    mutationFn: async ({ id, isFlagged }: { id: number; isFlagged: boolean }) => {
      await apiClient.patch(`/messages/${id}`, { isFlagged });
      return { id, isFlagged };
    },
    onSuccess: ({ isFlagged }) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setAlert({ 
        message: isFlagged ? "Message flagged" : "Message unflagged", 
        type: "success" 
      });
      setTimeout(() => setAlert(null), 3000);
    }
  });

  // Delete message
  const deleteMessage = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/messages/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      setAlert({ message: "Message deleted successfully", type: "success" });
      setTimeout(() => setAlert(null), 3000);
    },
    onError: (error) => {
      console.error("Error deleting message:", error);
      setAlert({ message: "Failed to delete message", type: "error" });
      setTimeout(() => setAlert(null), 3000);
    },
    onSettled: () => {
      setIsDeleting(null);
    }
  });

  // Handle message selection
  const handleMessageSelect = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead.mutate(message.id);
    }
  };

  // Handle delete confirmation
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setIsDeleting(id);
      deleteMessage.mutate(id);
    }
  };

  // Filter messages based on search term and selected filter
  const filteredMessages = messages?.filter(message => {
    // Search filter
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesFilter = 
      filter === "all" || 
      (filter === "unread" && !message.isRead) ||
      (filter === "flagged" && message.isFlagged);
    
    return matchesSearch && matchesFilter;
  }) || [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Message Center</h1>
            <p className="text-gray-300">Manage customer inquiries and contact messages</p>
          </div>
        </div>

        {/* Alert */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 rounded-md ${
              alert.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-500" : 
              "bg-red-500/10 border border-red-500/20 text-red-500"
            }`}
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{alert.message}</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List Panel */}
          <div className="lg:col-span-1">
            {/* Search and filter */}
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="block w-full bg-white/10 border border-gray-600 rounded-md py-2 pl-10 pr-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => refetch()} 
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-md text-gray-300"
                  title="Refresh"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded text-sm ${
                    filter === "all" 
                      ? "bg-blue-500 text-white" 
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${
                    filter === "unread" 
                      ? "bg-blue-500 text-white" 
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Unread
                </button>
                <button
                  onClick={() => setFilter("flagged")}
                  className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${
                    filter === "flagged" 
                      ? "bg-blue-500 text-white" 
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <Star className="h-4 w-4" />
                  Flagged
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg h-[calc(100vh-260px)] overflow-hidden flex flex-col">
              {isLoading ? (
                <div className="p-8 text-center flex-1 flex items-center justify-center">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-400 rounded-full"></div>
                </div>
              ) : isError ? (
                <div className="p-8 text-center flex-1 flex flex-col items-center justify-center text-red-400">
                  <AlertCircle className="h-10 w-10 mb-2" />
                  <p>Failed to load messages</p>
                  <button 
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-8 text-center flex-1 flex items-center justify-center text-gray-400">
                  {searchTerm || filter !== "all" ? (
                    <p>No messages match your filters</p>
                  ) : (
                    <p>No messages received yet</p>
                  )}
                </div>
              ) : (
                <div className="overflow-y-auto flex-1 divide-y divide-gray-700/50">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id}
                      onClick={() => handleMessageSelect(message)}
                      className={`p-4 cursor-pointer transition-colors duration-200 ${
                        selectedMessage?.id === message.id 
                          ? "bg-blue-500/20" 
                          : "hover:bg-white/5"
                      } ${!message.isRead ? "border-l-4 border-blue-500" : ""}`}
                    >
                      <div className="flex justify-between">
                        <h3 className={`text-base font-medium ${!message.isRead ? "text-white" : "text-gray-300"}`}>
                          {message.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {message.isFlagged && <Star className="h-4 w-4 text-yellow-400" />}
                          <span className="text-xs text-gray-400">{formatDate(message.createdAt)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{message.subject}</p>
                      <p className="text-xs text-gray-500 truncate mt-1">{message.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg h-[calc(100vh-200px)] overflow-hidden flex flex-col">
              {selectedMessage ? (
                <div className="flex flex-col h-full">
                  {/* Message Header */}
                  <div className="p-6 border-b border-gray-700/50">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-medium text-white">{selectedMessage.subject}</h2>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleFlag.mutate({ 
                            id: selectedMessage.id, 
                            isFlagged: !selectedMessage.isFlagged 
                          })}
                          className="p-1.5 rounded-full hover:bg-white/10"
                          title={selectedMessage.isFlagged ? "Remove flag" : "Flag message"}
                        >
                          {selectedMessage.isFlagged ? (
                            <StarOff className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <Star className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        <button 
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="p-1.5 rounded-full hover:bg-white/10 text-red-400"
                          title="Delete message"
                          disabled={isDeleting === selectedMessage.id}
                        >
                          {isDeleting === selectedMessage.id ? (
                            <div className="h-5 w-5 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div className="flex gap-2">
                          <span className="text-sm text-gray-300 font-medium">{selectedMessage.name}</span>
                          <span className="text-sm text-gray-400">&lt;{selectedMessage.email}&gt;</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {new Date(selectedMessage.createdAt).toLocaleDateString([], { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <Clock className="h-4 w-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-400">
                          {new Date(selectedMessage.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="p-6 flex-1 overflow-y-auto">
                    <div className="text-gray-300 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Message Actions */}
                  <div className="p-4 border-t border-gray-700/50 flex justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-sm text-gray-400">Marked as read</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors">
                        Reply via Email
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center flex-1 flex flex-col items-center justify-center text-gray-400">
                  <Mail className="h-16 w-16 mb-4 text-gray-600" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">Select a Message</h3>
                  <p>Choose a message from the list to view its contents</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

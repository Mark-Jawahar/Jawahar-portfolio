"use client";

import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("hbp-token");
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-5">Messages ({messages.length})</h2>
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">From</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Subject</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Date</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                onClick={() => setSelected(msg)}
                className="border-b border-zinc-50 hover:bg-zinc-50 cursor-pointer"
              >
                <td className="p-4">
                  <div>
                    <p className="text-xs font-medium">{msg.name}</p>
                    <p className="text-[10px] text-zinc-500">{msg.email}</p>
                  </div>
                </td>
                <td className="p-4 text-xs">{msg.subject}</td>
                <td className="p-4 text-xs text-zinc-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    msg.isRead ? "bg-zinc-100 text-zinc-600" : "bg-blue-100 text-blue-700"
                  }`}>
                    {msg.isRead ? "Read" : "New"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">{selected.subject}</h3>
              <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-zinc-600">&times;</button>
            </div>
            <div className="text-xs text-zinc-500 mb-4">
              <p>From: {selected.name} ({selected.email})</p>
              <p>{new Date(selected.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-sm leading-relaxed">{selected.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

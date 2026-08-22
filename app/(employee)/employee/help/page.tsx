"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { useToast } from "@/components/ui/Toast";
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageCircle, BookOpen, Search, Send } from "lucide-react";

const FAQS = [
  {
    category: "Leave & Time Off",
    icon: "🌴",
    items: [
      { q: "How do I apply for leave?", a: "Navigate to Leave Portal > Apply tab. Select your leave type, date range, enter a reason, and click Submit. Your manager will be notified immediately and typically responds within 24–48 hours." },
      { q: "What is the leave carry-forward policy?", a: "Annual leave can be carried forward up to 5 days to the following year. Sick leave and unpaid leave cannot be carried forward. Carry-forward must be used by March 31 of the following year." },
      { q: "Can I cancel an approved leave?", a: "Yes, you can cancel an approved leave by going to Leave History and clicking 'Cancel' on the respective request, provided the leave has not yet started. Once leave begins, contact HR directly at hr@acme.com." },
    ],
  },
  {
    category: "Payroll & Payslips",
    icon: "💰",
    items: [
      { q: "When is my salary credited?", a: "Salaries are credited on the last working day of each month. Bank transfers are typically processed 2 business days before the credit date to ensure timely receipt." },
      { q: "How do I download my payslip?", a: "Go to My Payslips > Payslips tab. Click the eye icon to view a payslip, or the download icon to get a PDF. All payslips from your start date are accessible here." },
      { q: "I have a discrepancy in my payslip. What should I do?", a: "Raise a ticket below with details of the discrepancy. Include the payslip month, the expected amount, and the actual amount. The payroll team will investigate and respond within 3 business days." },
    ],
  },
  {
    category: "Attendance",
    icon: "📋",
    items: [
      { q: "I forgot to check in/out. How do I correct it?", a: "Submit an attendance correction via the Attendance page. Your manager and HR will review and approve the correction. Corrections must be submitted within 5 working days of the missed punch." },
      { q: "What counts as late arrival?", a: "Any check-in after 9:15 AM for standard office hours is marked as 'Late'. For remote employees, the policy is flexible within core hours of 10 AM to 4 PM." },
    ],
  },
  {
    category: "Training & Development",
    icon: "🎓",
    items: [
      { q: "Are training courses mandatory?", a: "Compliance courses (Code of Conduct, Security Awareness, Anti-Bribery) are mandatory for all employees and must be completed within 30 days of assignment. Other courses are optional but highly encouraged." },
      { q: "Can I request a new training course?", a: "Yes! Submit a request via the Help Center ticket below. Include the course name/provider, estimated cost, and how it aligns with your role. L&D team reviews all requests monthly." },
    ],
  },
];

export default function EmployeeHelpPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Leave & Time Off");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredFaqs = FAQS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDesc) return;
    toast({ title: "Ticket submitted", description: `Your request has been logged. Ticket ID: #HR-${Date.now().toString().slice(-4)}. Expect a response within 1–2 business days.`, variant: "success" });
    setTicketTitle(""); setTicketDesc("");
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-purple-50 border border-purple-100 mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">How can we help you?</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Find answers to common HR questions or submit a support ticket and we'll get back to you shortly.
        </p>
        <div className="max-w-md mx-auto mt-6">
          <SearchBar value={search} onChange={setSearch} placeholder="Search help articles..." />
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group" onClick={() => toast({ title: "Opening HR chat...", variant: "info" })}>
          <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Chat with HR</h3>
          <p className="text-xs text-slate-500 mt-1">Get instant support from the HR team</p>
          <Badge variant="success" className="mt-3">Online Now</Badge>
        </Card>
        <Card className="flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group" onClick={() => toast({ title: "Opening email client", variant: "info" })}>
          <div className="h-12 w-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-3 group-hover:bg-sky-100 transition-colors">
            <Mail className="h-6 w-6 text-sky-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Email HR</h3>
          <p className="text-xs text-slate-500 mt-1">hr@acme.com</p>
          <p className="text-[10px] text-slate-400 mt-1">Responds in 24–48 hours</p>
        </Card>
        <Card className="flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group" onClick={() => toast({ title: "Opening documentation", variant: "info" })}>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
            <BookOpen className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">HR Policies</h3>
          <p className="text-xs text-slate-500 mt-1">Browse all company policies</p>
          <p className="text-[10px] text-slate-400 mt-1">Updated August 2026</p>
        </Card>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Search className="h-4 w-4 text-slate-400" />Frequently Asked Questions
        </h2>
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <HelpCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">No articles found for "{search}"</p>
            <p className="text-xs mt-1">Try different keywords or submit a ticket below.</p>
          </div>
        ) : (
          filteredFaqs.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span>{cat.icon}</span>{cat.category}
              </h3>
              <div className="space-y-1.5">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key} className={`rounded-xl border transition-all ${isOpen ? "border-primary/30 bg-purple-50/20" : "border-border bg-card"}`}>
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-start justify-between gap-3 p-4 text-left cursor-pointer"
                      >
                        <span className="text-sm font-semibold text-slate-800">{item.q}</span>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-primary shrink-0 mt-0.5" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submit Ticket */}
      <Card className="border-2 border-primary/20 bg-purple-50/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Send className="h-4 w-4 text-primary" />Submit a Support Ticket
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</label>
              <div className="flex flex-wrap gap-2">
                {FAQS.map((cat) => (
                  <button
                    type="button"
                    key={cat.category}
                    onClick={() => setTicketCategory(cat.category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${ticketCategory === cat.category ? "bg-primary text-white border-primary" : "border-border text-slate-600 hover:border-primary/40 hover:bg-purple-50"}`}
                  >
                    {cat.icon} {cat.category}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Subject *</label>
              <input value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} className="w-full h-10 rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Briefly describe your issue..." required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description *</label>
              <textarea value={ticketDesc} onChange={(e) => setTicketDesc(e.target.value)} className="w-full min-h-[80px] rounded-lg border border-border bg-card p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none" placeholder="Provide more details about your issue..." required />
            </div>
            <Button type="submit" className="flex items-center gap-2 cursor-pointer">
              <Send className="h-4 w-4" />Submit Ticket
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

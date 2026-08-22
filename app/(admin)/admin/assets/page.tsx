"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Laptop,
  Monitor,
  Search,
  Plus,
  SlidersHorizontal,
  Smartphone,
  Cpu,
} from "lucide-react";

// Mock assets list
const initialAssets = [
  { id: "AST-828", name: "MacBook Pro 16\"", serial: "C02DF98XMD6M", type: "Laptop", assigned: "Jane Cooper", status: "ASSIGNED" },
  { id: "AST-829", name: "Dell UltraSharp 27\"", serial: "CN0K0Y847248", type: "Monitor", assigned: "Cody Fisher", status: "ASSIGNED" },
  { id: "AST-830", name: "iPhone 15 Pro", serial: "DNP948194XMD", type: "Mobile", assigned: "---", status: "AVAILABLE" },
  { id: "AST-831", name: "MacBook Air 13\"", serial: "C02FK892LK12", type: "Laptop", assigned: "Albert Flores", status: "ASSIGNED" },
  { id: "AST-832", name: "Logitech MX Master 3S", serial: "LZ294827XMS1", type: "Accessory", assigned: "---", status: "MAINTENANCE" },
];

export default function AdminAssetsPage() {
  const [assets, setAssets] = useState(initialAssets);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Form states
  const [name, setName] = useState("");
  const [serial, setSerial] = useState("");
  const [type, setType] = useState("Laptop");

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) || asset.serial.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsset = {
      id: `AST-${828 + assets.length + 1}`,
      name,
      serial,
      type,
      assigned: "---",
      status: "AVAILABLE" as const,
    };
    setAssets([...assets, newAsset]);
    setIsAddOpen(false);
    // Reset Form
    setName("");
    setSerial("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Asset Inventory Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register hardware inventory, track employee device assignments, and manage life cycles.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <Laptop className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Laptops</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">112</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">92 assigned to staff</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-secondary rounded-xl">
            <Monitor className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Monitors</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">84</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">78 assigned to staff</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available items</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">18</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Ready for onboarding</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Maintenance</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">4</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Devices undergoing repair</p>
          </div>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by device name or serial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs focus:bg-card focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-border bg-card py-2.5 px-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none shadow-sm cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Laptop">Laptops</option>
            <option value="Monitor">Monitors</option>
            <option value="Mobile">Mobiles</option>
            <option value="Accessory">Accessories</option>
          </select>
          <Button variant="outline" size="icon" className="h-9 w-9 cursor-pointer">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
              <th className="p-4">Asset ID</th>
              <th className="p-4">Device Details</th>
              <th className="p-4">Serial Number</th>
              <th className="p-4">Category</th>
              <th className="p-4">Assigned To</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-50/40">
                <td className="p-4 font-mono text-xs font-bold text-slate-500">{asset.id}</td>
                <td className="p-4 font-semibold text-slate-700">{asset.name}</td>
                <td className="p-4 text-slate-500 font-mono text-xs">{asset.serial}</td>
                <td className="p-4 text-slate-500 text-xs">{asset.type}</td>
                <td className="p-4 text-slate-600 text-xs font-semibold">{asset.assigned}</td>
                <td className="p-4">
                  <Badge variant={asset.status === "ASSIGNED" ? "info" : asset.status === "AVAILABLE" ? "success" : "warning"}>
                    {asset.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Asset Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Register Hardware Asset">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Device Name"
            placeholder="e.g. MacBook Pro 14"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Serial Number / Tag"
            placeholder="e.g. C02FLK982KMS"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Hardware Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
            >
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Mobile">Mobile Device</option>
              <option value="Accessory">Accessory</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Register Device
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AnalyticsDashboard } from "../components/AnalyticsDashboard";
import { InventoryDashboard } from "../components/InventoryDashboard";
import { NotificationPanel } from "../components/NotificationPanel";

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'notifications'>('analytics');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(storedAppointments);

    const storedInventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    if (storedInventory.length === 0) {
      const defaultInventory = [
        { id: 1, name: 'Quartz Countertops', category: 'Surfaces', stock: 15, minStock: 10, unit: 'slabs', supplier: 'Caesarstone' },
        { id: 2, name: 'White Oak Lumber', category: 'Wood', stock: 45, minStock: 30, unit: 'board ft', supplier: 'Woodworkers Source' },
        { id: 3, name: 'Carrara Marble', category: 'Surfaces', stock: 8, minStock: 5, unit: 'slabs', supplier: 'Stone Source NYC' },
        { id: 4, name: 'Belgian Linen Fabric', category: 'Textiles', stock: 120, minStock: 80, unit: 'yards', supplier: 'The Shade Store' },
        { id: 5, name: 'Soft-Close Hinges', category: 'Hardware', stock: 250, minStock: 200, unit: 'pieces', supplier: 'Blum' },
        { id: 6, name: 'Zellige Tiles', category: 'Finishes', stock: 4, minStock: 10, unit: 'boxes', supplier: 'Clé Tile' },
        { id: 7, name: 'Walnut Veneer', category: 'Wood', stock: 28, minStock: 20, unit: 'sheets', supplier: 'Certainly Wood' },
        { id: 8, name: 'Brass Hardware', category: 'Hardware', stock: 180, minStock: 150, unit: 'pieces', supplier: 'Rejuvenation' },
      ];
      localStorage.setItem('inventory', JSON.stringify(defaultInventory));
      setInventory(defaultInventory);
    } else {
      setInventory(storedInventory);
    }
  }, []);

  const lowStockItems = inventory.filter(item => item.stock < item.minStock);
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="mb-12">
            <h1
              className="text-[3.5rem] mb-4 tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manage appointments, monitor inventory, and track business metrics.
            </p>
          </div>

          <div className="flex gap-4 mb-12 border-b border-border">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-4 text-sm tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'analytics'
                  ? 'border-b-2 border-foreground opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-4 text-sm tracking-wide uppercase transition-all duration-300 relative ${
                activeTab === 'inventory'
                  ? 'border-b-2 border-foreground opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              Inventory
              {lowStockItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {lowStockItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 text-sm tracking-wide uppercase transition-all duration-300 relative ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-foreground opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              Notifications
              {(pendingAppointments.length + lowStockItems.length) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                  {pendingAppointments.length + lowStockItems.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'analytics' && <AnalyticsDashboard appointments={appointments} inventory={inventory} />}
          {activeTab === 'inventory' && <InventoryDashboard inventory={inventory} setInventory={setInventory} />}
          {activeTab === 'notifications' && (
            <NotificationPanel
              appointments={pendingAppointments}
              lowStockItems={lowStockItems}
            />
          )}
        </div>
      </main>
    </>
  );
}

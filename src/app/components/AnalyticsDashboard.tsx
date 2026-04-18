import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsDashboardProps {
  appointments: any[];
  inventory: any[];
}

export function AnalyticsDashboard({ appointments, inventory }: AnalyticsDashboardProps) {
  const projectTypeCounts = appointments.reduce((acc: any, apt) => {
    acc[apt.projectType] = (acc[apt.projectType] || 0) + 1;
    return acc;
  }, {});

  const projectTypeData = Object.entries(projectTypeCounts).map(([type, count], index) => ({
    id: `project-${type}-${index}`,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count as number,
  }));

  const inventoryByCategory = inventory.reduce((acc: any, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(inventoryByCategory).map(([category, count], index) => ({
    id: `category-${category}-${index}`,
    category,
    items: count as number,
  }));

  const totalBudget = appointments.reduce((sum, apt) => sum + parseFloat(apt.budget || 0), 0);
  const avgBudget = appointments.length > 0 ? totalBudget / appointments.length : 0;

  const COLORS = ['#000000', '#D4A55A', '#8B9F8E', '#B89968'];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border border-border p-8">
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2">Total Appointments</p>
          <p className="text-[2.5rem] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            {appointments.length}
          </p>
        </div>

        <div className="border border-border p-8">
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2">Avg. Budget</p>
          <p className="text-[2.5rem] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            ${Math.round(avgBudget).toLocaleString()}
          </p>
        </div>

        <div className="border border-border p-8">
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2">Total Revenue</p>
          <p className="text-[2.5rem] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            ${Math.round(totalBudget).toLocaleString()}
          </p>
        </div>

        <div className="border border-border p-8">
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2">Inventory Items</p>
          <p className="text-[2.5rem] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            {inventory.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-border p-8">
          <h3 className="text-[1.5rem] mb-8 tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            Projects by Type
          </h3>
          {projectTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`pie-cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-20">No appointment data yet</p>
          )}
        </div>

        <div className="border border-border p-8">
          <h3 className="text-[1.5rem] mb-8 tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            Inventory by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="items" fill="#D4A55A">
                  {categoryData.map((entry, index) => (
                    <Cell key={`bar-cell-${entry.id}-${index}`} fill="#D4A55A" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-20">No inventory data</p>
          )}
        </div>
      </div>

      <div className="border border-border">
        <div className="p-8 border-b border-border">
          <h3 className="text-[1.5rem] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
            Recent Appointments
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-8 py-4 text-left text-xs tracking-widest uppercase opacity-50">Client</th>
                <th className="px-8 py-4 text-left text-xs tracking-widest uppercase opacity-50">Project</th>
                <th className="px-8 py-4 text-left text-xs tracking-widest uppercase opacity-50">Budget</th>
                <th className="px-8 py-4 text-left text-xs tracking-widest uppercase opacity-50">Date</th>
                <th className="px-8 py-4 text-left text-xs tracking-widest uppercase opacity-50">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 10).map((apt) => (
                <tr key={apt.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-8 py-4">{apt.fullName}</td>
                  <td className="px-8 py-4 capitalize">{apt.projectType}</td>
                  <td className="px-8 py-4">${parseFloat(apt.budget).toLocaleString()}</td>
                  <td className="px-8 py-4">{apt.preferredDate}</td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 text-xs tracking-wide uppercase bg-secondary/20 text-secondary-foreground">
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-muted-foreground">
                    No appointments scheduled yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

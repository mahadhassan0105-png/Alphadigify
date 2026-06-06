import { db } from "@/lib/db";
import DashboardClient from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard Overview | Alphadigify",
  description: "Live admin analytics and operations dashboard",
};

export default async function DashboardPage() {
  // Fetch real-time data from Prisma
  const [totalClients, activeProjects, newLeads, paidInvoices, projectsGrouped, allLeads] = await Promise.all([
    db.client.count(),
    db.project.count({
      where: { status: { notIn: ["Completed", "Cancelled"] } }
    }),
    db.lead.count({
      where: { status: "New" }
    }),
    db.invoice.aggregate({
      _sum: { amount: true },
      where: { status: "Paid" }
    }),
    db.project.groupBy({
      by: ['service'],
      _count: { service: true }
    }),
    db.lead.findMany({
      select: { createdAt: true }
    })
  ]);

  const stats = {
    totalClients,
    activeProjects,
    newLeads,
    revenue: paidInvoices._sum.amount || 0,
  };

  // Process Projects Data
  const projectsData = projectsGrouped.map(g => ({
    name: g.service,
    count: g._count.service
  }));

  // Process Leads Data (Last 6 Months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const leadsByMonth = new Array(12).fill(0);
  allLeads.forEach(lead => {
    leadsByMonth[lead.createdAt.getMonth()]++;
  });

  const currentMonth = new Date().getMonth();
  const leadsData = [];
  for (let i = 5; i >= 0; i--) {
    let m = currentMonth - i;
    if (m < 0) m += 12;
    leadsData.push({
      name: monthNames[m],
      leads: leadsByMonth[m]
    });
  }

  return <DashboardClient stats={stats} leadsData={leadsData} projectsData={projectsData} />;
}

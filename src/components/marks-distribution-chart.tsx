
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MarksDistributionChartProps {
    data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`${label}`}</p>
        <p className="intro text-foreground">{`العلامات : ${payload[0].value}`}</p>
        <p className="desc text-muted-foreground">{`عدد الدوائر : ${payload[0].payload['عدد الدوائر']}`}</p>
      </div>
    );
  }

  return null;
};


export function MarksDistributionChart({ data }: MarksDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
        dir="rtl"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--foreground))" angle={-15} textAnchor="end" height={50} />
        <YAxis stroke="hsl(var(--foreground))" label={{ value: 'العلامات', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
        <Bar dataKey="العلامات" name="العلامات" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}


'use client';

import { Pie, PieChart, Tooltip, ResponsiveContainer, Legend, Cell, Label } from 'recharts';

interface MarksDistributionChartProps {
    data: any[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`${data.name}`}</p>
        <p className="intro text-foreground">{`العلامات : ${data['العلامات']}`}</p>
        <p className="desc text-muted-foreground">{`عدد الدوائر : ${data['عدد الدوائر']}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.value}</span>
                </li>
            ))}
        </ul>
    );
}

export function MarksDistributionChart({ data }: MarksDistributionChartProps) {
  const totalMarks = 200;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="العلامات"
          nameKey="name"
          innerRadius={'70%'}
          outerRadius={'90%'}
          paddingAngle={2}
          stroke="hsl(var(--primary))"
          strokeWidth={4}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
           <Label 
            value={`المجموع: ${totalMarks}`} 
            position="center" 
            className="text-2xl font-bold"
            style={{ fill: 'hsl(var(--primary-foreground))' }}
          />
        </Pie>
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

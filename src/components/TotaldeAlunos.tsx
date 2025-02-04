"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface Total {
  title: string;
  subtitle: string
  total: number;
  handleRedirect?: () => void
}

export function TotalDeAlunos(props: Total) {
  const chartData = [{ totAtivos: props.total, fill: "var(--color-safari)" }];

  const chartConfig = {
    totAtivos: {
      label: "totAtivos",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col bg-[#232241] border-none cursor-pointer" onClick={props.handleRedirect || undefined}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[#F4F4F5]">{props.title}</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 cursor-pointer">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square cursor-pointer"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
            className="cursor-pointer"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-[#232241] bg-[#232241] cursor-pointer"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="totAtivos" background cornerRadius={10} className="cursor-pointer"/>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-[#F4F4F5] text-4xl font-bold"
                        >
                          {chartData[0].totAtivos.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {props.subtitle}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

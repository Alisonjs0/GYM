"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { getData } from "@/data/data"
const { data } = getData()

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface Captacao {
  result: Array<{mes: string, matriculas: number, desistencias: number, arrecadado: number}>
}

export function CaptacaoDeAlunos(props: Captacao) {

  return (
    <Card className="bg-[#232241] border-none">
      <CardHeader>
        <CardTitle className="text-[#F4F4F5]">Captacao de alunos</CardTitle>
        <CardDescription className="text-[#F4F4F5]">Janeiro - Junho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={props.result.slice(0, 6)}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="matriculas" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="desistencias" fill="#C14345" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-[#F4F4F5]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-[#F4F4F5]">Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}


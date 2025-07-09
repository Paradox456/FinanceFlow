import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { FinancialSummary as FinancialSummaryType } from '../types/finance';

interface FinancialSummaryProps {
  summary: FinancialSummaryType;
}

export function FinancialSummary({ summary }: FinancialSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Balance',
      value: summary.balance,
      icon: Wallet,
      color: summary.balance >= 0 ? 'text-income' : 'text-expense',
      bgColor: summary.balance >= 0 ? 'bg-income/10' : 'bg-expense/10',
    },
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'text-income',
      bgColor: 'bg-income/10',
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'text-expense',
      bgColor: 'bg-expense/10',
    },
    {
      title: 'Monthly Balance',
      value: summary.monthlyBalance,
      icon: DollarSign,
      color: summary.monthlyBalance >= 0 ? 'text-income' : 'text-expense',
      bgColor: summary.monthlyBalance >= 0 ? 'bg-income/10' : 'bg-expense/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card) => (
        <Card key={card.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              {formatCurrency(card.value)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {card.title === 'Monthly Balance' ? 'This month' : 'All time'}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { Budget, Transaction } from '../types/finance';
import { defaultCategories } from '../data/categories';

interface BudgetManagerProps {
  budgets: Budget[];
  transactions: Transaction[];
  onAddBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  onDeleteBudget: (id: string) => void;
}

export function BudgetManager({ budgets, transactions, onAddBudget, onDeleteBudget }: BudgetManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const expenseCategories = defaultCategories.filter(cat => cat.type === 'expense');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateSpent = (budget: Budget) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const isExpense = transaction.type === 'expense';
        const isCategory = transaction.category === budget.category;
        
        if (budget.period === 'monthly') {
          return isExpense && isCategory && 
                 transactionDate.getMonth() === currentMonth && 
                 transactionDate.getFullYear() === currentYear;
        } else {
          return isExpense && isCategory && 
                 transactionDate.getFullYear() === currentYear;
        }
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) return;

    const categoryData = expenseCategories.find(cat => cat.name === category);
    
    onAddBudget({
      category,
      amount: parseFloat(amount),
      period,
      color: categoryData?.color || '#8b5cf6',
    });

    setCategory('');
    setAmount('');
    setPeriod('monthly');
    setShowForm(false);
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage < 70) return { status: 'good', color: 'text-income', icon: CheckCircle };
    if (percentage < 90) return { status: 'warning', color: 'text-warning', icon: AlertCircle };
    return { status: 'over', color: 'text-expense', icon: AlertCircle };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Manager
          </CardTitle>
          <Button onClick={() => setShowForm(!showForm)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget-category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories
                          .filter(cat => !budgets.some(budget => budget.category === cat.name))
                          .map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget-amount">Budget Amount ($)</Label>
                    <Input
                      id="budget-amount"
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget-period">Period</Label>
                    <Select value={period} onValueChange={(value: 'monthly' | 'yearly') => setPeriod(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Add Budget
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {budgets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No budgets set yet. Create your first budget to start tracking your spending goals!
          </div>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const spent = calculateSpent(budget);
              const percentage = Math.min((spent / budget.amount) * 100, 100);
              const { status, color, icon: StatusIcon } = getBudgetStatus(spent, budget.amount);
              
              return (
                <div key={budget.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{budget.category}</h3>
                      <Badge variant="outline" className="capitalize">
                        {budget.period}
                      </Badge>
                      <StatusIcon className={`h-4 w-4 ${color}`} />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteBudget(budget.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={color}>
                        Spent: {formatCurrency(spent)}
                      </span>
                      <span className="text-muted-foreground">
                        Budget: {formatCurrency(budget.amount)}
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{percentage.toFixed(1)}% used</span>
                      <span>
                        {spent > budget.amount 
                          ? `${formatCurrency(spent - budget.amount)} over budget`
                          : `${formatCurrency(budget.amount - spent)} remaining`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
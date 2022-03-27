import { FinanceDataItem, FormattedDataItem } from '../../Types/FinanceData';

// Split data by type
export const dataByType = (data: Array<FinanceDataItem>) => {
  if (data) {
    // GroupBy is still experimental
    const dataByType = data.reduce((r, a) => {
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));
    return dataByType;
  } else {
    return [];
  }
};

const colors: { [key: string]: string } = {
  Grocheries: '#880808	',
  Household: '#8B0000',
  Vehicle: '#FF3131',
  Entertainment: '#FF0000',
  Travel: '#FF4433',
  Shopping: '#E0115F',
  Other: '#F1DAC4',
  Savings: '#228B22',
  Investment: '#008000	',
  Salary: '#4F7942',
  Business: '#7CFC00',
};

// Sort data by category then format for pie chart & add color
export const formatData = (data: Array<FinanceDataItem>) => {
  if (data) {
    let chartData = [] as Array<FormattedDataItem>;

    const dataByCategory = data.reduce((r, a) => {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));

    Object.keys(dataByCategory).map((item) => {
      let sum = 0;
      dataByCategory[item].map((item: FinanceDataItem) => {
        sum = sum + item.amount;
      });
      chartData.push({
        title: item,
        value: sum,
        color: colors[item],
      });
    });
    return chartData;
  } else return [];
};

// Calculate balance
export const calculateBalance = (data: Array<FinanceDataItem>) => {
  let sum = 0;
  data.map((item) => {
    if (item.type === 'income') sum = sum + item.amount;
    if (item.type === 'expense') sum = sum - item.amount;
  });

  return sum;
};

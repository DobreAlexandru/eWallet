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
  Grocheries: '#a6051a',
  Utilities: '#950417',
  Medical: '#840414',
  Personal: '#740312',
  Gifts: '#63030F',
  Education: '#53020C',
  Household: '#42020A',
  Vehicle: '#AE1E30',
  Entertainment: '#B73747',
  Travel: '#9C1B2B',
  Shopping: '#8B1826',
  Other: '#F1DAC4',
  Savings: '#009949',
  Investment: '#008941',
  Salary: '#007A3A',
  Business: '#006B33',
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

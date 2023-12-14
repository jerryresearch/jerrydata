type Reports = {
  _id: string;
  name: string;
  description: string;
  chartsCount: number;
  updatedAt: string;
  charts: string[];
  createdBy: string;
};

type Chart = {
  _id: string;
  title: string;
  chartType: string;
  report: string;
  dataset: string;
  createdBy: string;
  xAxis: string;
  yAxis: string;
  xData: any[];
  yData: any[];
  series?: string;
};

type Dataset = {
  _id: string;
  name: string;
  description?: string;
  datatype: string;
  size: string;
  rows: number;
  headers: [
    {
      name: string;
      datatype: string;
      columnType: string;
      defaultAggregate: string;
      dateFieldType: string;
      geoFieldType: string;
      isDisabled: boolean;
    }
  ];
  columns: number;
  lastLoad: string;
  createdAt: string;
  updatedAt: string;
};

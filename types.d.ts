type Reports = {
  title: string;
  chartsCount: number;
  lastModified: string;
  charts: string[];
  createdBy: string;
};

type Dataset = {
  _id: string;
  name: string;
  datatype: string;
  size: string;
  rows: number;
  columns: number;
  lastLoad: string;
};

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
  headers: [
    {
      name: string;
      datatype: string;
      isDisabled: boolean;
    }
  ];
  columns: number;
  lastLoad: string;
};

type Reports = {
  _id: string;
  name: string;
  description: string;
  chartsCount: number;
  lastModified: string;
  charts: string[];
  createdBy: string;
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

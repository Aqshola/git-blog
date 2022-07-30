export type POST_TYPE = {
  title: string;
  path: string;
  createAt: Date;
  slug: string;
  content?: string|any;
};

export type RESPONSE_POST <DATA_TYPE>= {
  data: DATA_TYPE
  status: "success" | "failed";
  errorMsg?: string|null|any;
};

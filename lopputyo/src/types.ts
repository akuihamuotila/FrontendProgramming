export type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export type Training = {
  id: number;
  date: string;
  activity: string;
  duration: number;
  customer: {
    firstname: string;
    lastname: string;
  };
};

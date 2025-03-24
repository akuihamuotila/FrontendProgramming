export type Todo = {
  title: string;
  duedate: string;
  priority: string;
};

export type TodoTableProps = {
  todos: Todo[];
  handleDelete: (row: number) => void;
};

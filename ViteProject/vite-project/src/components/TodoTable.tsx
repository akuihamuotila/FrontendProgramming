import { TodoTableProps } from "../types";

export default function TodoTable(props: TodoTableProps) {
  return (
    <table>
      <thead>
        <th>Title</th>
        <th>Priority</th>
        <th>Duedate</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {props.todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.title}</td>
            <td>{todo.priority}</td>
            <td>{todo.duedate}</td>
            <td>
              <button onClick={() => props.handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

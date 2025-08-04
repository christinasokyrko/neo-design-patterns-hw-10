import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class UpdateTaskCommand extends AbstractCommand {
  private previousTask: { [key: string]: Task[keyof Task] } = {};

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

 execute(): void {
  const current = this.taskList.updateTask(this.taskId, this.updates);
  if (current) {
    this.previousTask = {};
    for (const key in this.updates) {
      const typedKey = key as keyof Task;
      const value = current[typedKey];
      if (value !== undefined) {
        this.previousTask[typedKey] = value as Task[keyof Task];
      }
    }
  }
}

  undo(): void {
    if (this.previousTask) {
      this.taskList.updateTask(this.taskId, this.previousTask);
    }
  }
}

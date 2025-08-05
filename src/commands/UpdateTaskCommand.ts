import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class UpdateTaskCommand extends AbstractCommand {
  private previousTask?: Task;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const currentTask = this.taskList.getAllTasks().find(task => task.id === this.taskId);
    if (currentTask) {
      this.previousTask = { ...currentTask };
    }
    this.taskList.updateTask(this.taskId, this.updates);
  }

  undo(): void {
    if (this.previousTask) {
      this.taskList.updateTask(this.taskId, this.previousTask);
    }
  }
}

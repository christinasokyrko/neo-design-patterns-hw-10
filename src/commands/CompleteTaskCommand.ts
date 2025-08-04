import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';

export class CompleteTaskCommand extends AbstractCommand {
  private previousStatus: boolean = false;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private newStatus: boolean = true
  ) {
    super();
  }

  execute(): void {
    const task = this.taskList.completeTask(this.taskId, this.newStatus);
    if (task) {
      this.previousStatus = !this.newStatus;
    }
  }

  undo(): void {
    this.taskList.completeTask(this.taskId, this.previousStatus);
  }
}


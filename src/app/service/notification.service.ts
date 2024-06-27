import {Injectable} from "@angular/core";
import {NotifierService} from "angular-notifier";


@Injectable()
export class NotificationService {
  private readonly notifier: NotifierService;

  constructor(private notificationService: NotifierService) {
    this.notifier = notificationService;
  }

  onDefault(message: string): void {
    this.notifier.notify(Type.DEFAULT, message);
  }

  onSuccess(message: string): void {
    this.notifier.notify(Type.SUCCESS, message);
  }

  onInfo(message: string): void {
    this.notifier.notify(Type.INFO, message);
  }

  onError(message: string): void {
    this.notifier.notify(Type.ERROR, message);
  }

  onWarning(message: string): void {
    this.notifier.notify(Type.WARNING, message);
  }

}

enum Type {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

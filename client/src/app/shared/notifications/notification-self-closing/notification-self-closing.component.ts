import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-self-closing',
  templateUrl: './notification-self-closing.component.html',
  styleUrls: ['./notification-self-closing.component.scss']
})
export class NotificationSelfClosingComponent {
  @Input() header: string;
  @Input() description: string;

  visibility: boolean = false;

  openNotification() {
    this.visibility = true;
    setTimeout(() => this.closeNotification(), 5000);
  }

  closeNotification() {
    this.visibility = false;
  }
}

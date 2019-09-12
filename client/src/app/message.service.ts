import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  messages: string[] = [];
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
    this.messages.push(message);
  }

  clearMessages() {
    this.subject.next();
    this.messages = [];
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}

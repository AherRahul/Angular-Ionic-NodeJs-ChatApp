import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable()
export class MessageProvider {
  constructor(public http: HttpClient) {}

  SendMessage(senderId, receiverId, receiverName, message): Observable<any> {
    return this.http.post(
      `${BASEURL}/chat-messages/${senderId}/${receiverId}`,
      {
        receiverId,
        receiverName,
        message
      }
    );
  }

  GetAllMessages(senderId, receiverId): Observable<any> {
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}`);
  }

  MarkMessages(sender, receiver): Observable<any> {
    return this.http.get(`${BASEURL}/receiver-messages/${sender}/${receiver}`);
  }

  MarkAllMessages(): Observable<any> {
    return this.http.get(`${BASEURL}/mark-all-messages`);
  }
}

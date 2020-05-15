import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable()
export class PostProvider {
  constructor(public http: HttpClient) {}

  AddPost(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-post`, body);
  }

  GetAllPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
  }

  AddLike(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-like`, body);
  }

  AddComment(postId, comment): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-comment`, {
      postId,
      comment
    });
  }

  GetPost(id): Observable<any> {
    return this.http.get(`${BASEURL}/post/${id}`);
  }
}

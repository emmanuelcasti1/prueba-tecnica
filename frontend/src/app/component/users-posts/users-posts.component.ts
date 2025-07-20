import { Component, OnInit } from '@angular/core';
import { RequestApiService, User, Post } from '../../service/request-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-posts',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css']
})
export class UsersPostsComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  selectedUserId: number | null = null;

  constructor(private apiService: RequestApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
      if (users.length > 0) {
        this.selectedUserId = users[0].id;
      }
    });

    this.apiService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  getPostsByUser(userId: number): Post[] {
    return this.posts.filter(post => post.userId === userId);
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  RequestApiService,
  User,
  Album,
} from '../../service/request-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  users: User[] = [];
  albums: Album[] = [];
  selectedUser: User | null = null;
  selectedUserId: number | null = null;
  isLoading = false;

  constructor(private apiService: RequestApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
      if (users.length > 0) {
        this.onUserSelected(users[0].id);
      }
    });
  }

  onUserSelected(userId: number): void {
    this.selectedUserId = userId;
    this.selectedUser = this.users.find((u) => u.id === userId) || null;
    this.loadAlbums(userId);
  }

  loadAlbums(userId: number): void {
    this.isLoading = true;
    this.apiService.getAlbumsByUser(userId).subscribe({
      next: (albums) => {
        this.albums = albums;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}

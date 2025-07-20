import { Component, OnInit } from '@angular/core';
import { RequestApiService, Request } from '../../service/request-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  selectedRequest: Request | null = null;
  editedRequest: Request = {
    method: '',
    date: new Date(),
    returnedData: '',
  };
  newRequest: Request = {
    method: 'GET',
    date: new Date(),
    returnedData: '',
  };
  requestToDelete: Request | null = null;

  showEditModal = false;
  showDeleteModal = false;
  showCreateModal = false;

  constructor(private apiService: RequestApiService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.apiService.getLogs().subscribe((requests) => {
      this.requests = requests;
    });
  }

  openCreateModal(): void {
    this.newRequest = {
      method: 'POST',
      date: new Date(),
      returnedData: '',
    };
    this.showCreateModal = true;
  }

  openEditModal(request: Request): void {
    this.selectedRequest = request;
    this.editedRequest = { ...request };
    this.showEditModal = true;
  }

  openDeleteModal(request: Request): void {
    this.requestToDelete = request;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showCreateModal = false;
  }

  createRequest(): void {
    this.apiService.createRequest(this.newRequest).subscribe({
      next: () => {
        this.loadRequests();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error creating request:', err);
      },
    });
  }

  saveChanges(): void {
    if (this.selectedRequest && this.selectedRequest.id) {
      this.apiService
        .updateLog(
          this.selectedRequest.id,
          this.editedRequest.method,
          this.editedRequest.returnedData
        )
        .subscribe(() => {
          this.loadRequests();
          this.closeModal();
        });
    }
  }

  confirmDelete(): void {
    if (this.requestToDelete && this.requestToDelete.id) {
      this.apiService.deleteLog(this.requestToDelete.id).subscribe(() => {
        this.loadRequests();
        this.closeModal();
      });
    }
  }
}

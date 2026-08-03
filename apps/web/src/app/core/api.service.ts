import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API = 'http://localhost:3000/api';
const TOKEN_KEY = 'senda_token';

export interface Visit {
  id: string; beneficiaryName: string; beneficiaryAge?: number | null;
  address: string; city: string; contactName: string; contactPhone: string;
  contactEmail?: string | null; preferredSlot: string; visitType: string;
  notes?: string | null; status: string; createdAt: string;
  assignedTo?: { name: string } | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  getToken() { return localStorage.getItem(TOKEN_KEY); }
  clearToken() { localStorage.removeItem(TOKEN_KEY); }
  private authHeaders() {
    const t = this.getToken();
    return t ? { headers: new HttpHeaders({ Authorization: `Bearer ${t}` }) } : {};
  }
  createVisit(body: Record<string, unknown>): Observable<Visit> {
    return this.http.post<Visit>(`${API}/visits`, body);
  }
  login(email: string, password: string) {
    return this.http.post<{ accessToken: string; user: { name: string } }>(`${API}/auth/login`, { email, password }).pipe(
      tap((r) => localStorage.setItem(TOKEN_KEY, r.accessToken)),
    );
  }
  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${API}/visits`, this.authHeaders());
  }
  updateVisit(id: string, status: string) {
    return this.http.patch<Visit>(`${API}/visits/${id}`, { status }, this.authHeaders());
  }
}

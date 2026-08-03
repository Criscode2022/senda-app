import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService, Visit } from '../../core/api.service';
@Component({
  standalone: true, imports: [NgFor, NgIf, DatePipe, RouterLink],
  template: `
  <div class="min-h-screen bg-bg">
    <div class="bg-ink text-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <span class="font-display text-lg font-semibold">SENDA Staff</span>
        <button type="button" class="text-sm text-white/70 hover:text-white" (click)="logout()">Cerrar sesión</button>
      </div>
    </div>
    <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 class="font-display text-3xl font-semibold">Agenda de visitas</h1>
      <p class="mt-2 text-sm text-ink-muted">Cola de solicitudes · actualizar estado</p>
      <p *ngIf="error" class="mt-4 text-red-700">{{ error }} <a routerLink="/staff/login" class="underline">Login</a></p>
      <p *ngIf="!loading && !error && items.length===0" class="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">No hay visitas.</p>
      <ul class="mt-8 space-y-4">
        <li *ngFor="let v of items" class="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-lg font-semibold">{{ v.beneficiaryName }}<span *ngIf="v.beneficiaryAge">, {{ v.beneficiaryAge }}</span></p>
              <p class="mt-1 text-sm text-ink-muted">{{ v.address }} · {{ v.city }} · {{ v.preferredSlot }} · {{ v.visitType }}</p>
              <p class="mt-1 text-sm text-ink-muted">Contacto: {{ v.contactName }} · {{ v.contactPhone }}</p>
              <p class="mt-1 text-xs text-ink-muted">{{ v.createdAt | date:'short' }}</p>
            </div>
            <span class="rounded-full px-3 py-1 text-[11px] font-bold uppercase"
              [class.bg-primary-soft]="v.status==='NEW'" [class.text-primary]="v.status==='NEW'"
              [class.bg-green-100]="v.status==='CONFIRMED'" [class.text-green-800]="v.status==='CONFIRMED'"
              [class.bg-amber-100]="v.status==='IN_PROGRESS'" [class.text-amber-900]="v.status==='IN_PROGRESS'"
              [class.bg-border]="v.status==='COMPLETED'||v.status==='CANCELLED'">{{ v.status }}</span>
          </div>
          <p *ngIf="v.notes" class="mt-3 text-sm text-ink-muted">{{ v.notes }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button type="button" class="rounded-full border border-border px-3 py-1.5 text-xs font-semibold" (click)="set(v,'CONFIRMED')">Confirmar</button>
            <button type="button" class="rounded-full border border-border px-3 py-1.5 text-xs font-semibold" (click)="set(v,'IN_PROGRESS')">En curso</button>
            <button type="button" class="rounded-full border border-border px-3 py-1.5 text-xs font-semibold" (click)="set(v,'COMPLETED')">Completar</button>
            <button type="button" class="rounded-full border border-border px-3 py-1.5 text-xs font-semibold" (click)="set(v,'CANCELLED')">Cancelar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `,
})
export class StaffAgendaPage implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  items: Visit[] = []; loading = true; error = '';
  ngOnInit() {
    if (!this.api.getToken()) { this.router.navigate(['/staff/login']); return; }
    this.load();
  }
  load() {
    this.loading = true; this.error = '';
    this.api.getVisits().subscribe({
      next: (v) => { this.items = v; this.loading = false; },
      error: () => { this.error = 'No autorizado o error de red.'; this.loading = false; },
    });
  }
  set(v: Visit, status: string) {
    this.api.updateVisit(v.id, status).subscribe({ next: () => this.load(), error: () => alert('Error al actualizar') });
  }
  logout() { this.api.clearToken(); this.router.navigate(['/staff/login']); }
}

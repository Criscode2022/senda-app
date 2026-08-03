import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  standalone: true, imports: [RouterLink, NgIf],
  template: `
  <div class="mx-auto max-w-lg px-4 py-20 text-center">
    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold text-primary">✓</div>
    <h1 class="mt-6 font-display text-3xl font-semibold">Solicitud recibida</h1>
    <p class="mt-4 text-ink-muted">Hemos registrado tu petición<span *ngIf="id"> (ref. {{ short }})</span>. Coordinación te contactará para confirmar la visita.</p>
    <a routerLink="/" class="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white">Volver al inicio</a>
  </div>
  `,
})
export class SuccessPage {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.queryParamMap.get('id') ?? '';
  get short() { return this.id.slice(-8).toUpperCase(); }
}

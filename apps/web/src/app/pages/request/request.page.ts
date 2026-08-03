import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApiService } from '../../core/api.service';
@Component({
  standalone: true, imports: [ReactiveFormsModule, NgIf],
  template: `
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div class="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <h1 class="font-display text-3xl font-semibold md:text-4xl">Solicitar visita</h1>
        <p class="mt-3 text-sm leading-relaxed text-ink-muted">Solicitud — coordinación te contactará para confirmar. No es reserva automática.</p>
        <div class="mt-6 rounded-2xl bg-primary-soft p-5 text-sm text-primary">Incluye datos de la persona mayor y un contacto familiar o de confianza.</div>
      </div>
      <form class="space-y-4 rounded-[20px] border border-border bg-surface p-6 shadow-sm sm:p-8" [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label class="mb-1 block text-sm font-semibold" for="bn">Nombre de la persona mayor</label>
          <input id="bn" formControlName="beneficiaryName" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-semibold" for="ad">Dirección</label>
            <input id="ad" formControlName="address" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-semibold" for="ci">Barrio / ciudad</label>
            <input id="ci" formControlName="city" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-semibold" for="cn">Tu nombre (contacto)</label>
            <input id="cn" formControlName="contactName" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-semibold" for="ph">Teléfono</label>
            <input id="ph" formControlName="contactPhone" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <p *ngIf="form.controls.contactPhone.touched && form.controls.contactPhone.invalid" class="mt-1 text-xs text-red-700">Teléfono no válido.</p>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-semibold" for="sl">Franja</label>
            <select id="sl" formControlName="preferredSlot" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm">
              <option value="ANY">Cualquiera</option><option value="MORNING">Mañana</option><option value="AFTERNOON">Tarde</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-sm font-semibold" for="vt">Tipo de visita</label>
            <select id="vt" formControlName="visitType" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm">
              <option value="COMPANY">Compañía</option><option value="ERRAND">Recado</option><option value="WALK">Paseo</option><option value="OTHER">Otro</option>
            </select>
          </div>
        </div>
        <div>
          <label class="mb-1 block text-sm font-semibold" for="no">Notas</label>
          <textarea id="no" formControlName="notes" rows="3" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"></textarea>
        </div>
        <p *ngIf="error" class="rounded-xl bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
        <button type="submit" [disabled]="form.invalid || loading" class="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white disabled:opacity-50">{{ loading ? 'Enviando…' : 'Enviar solicitud' }}</button>
      </form>
    </div>
  </div>
  `,
})
export class RequestPage {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  loading = false; error = '';
  form = this.fb.nonNullable.group({
    beneficiaryName: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    contactName: ['', [Validators.required, Validators.minLength(2)]],
    contactPhone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{9,20}$/)]],
    preferredSlot: ['ANY'],
    visitType: ['COMPANY'],
    notes: [''],
  });
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    this.api.createVisit(this.form.getRawValue()).subscribe({
      next: (v) => { this.loading = false; this.router.navigate(['/solicitar/enviada'], { queryParams: { id: v.id } }); },
      error: () => { this.loading = false; this.error = 'No se pudo enviar. Comprueba la conexión e inténtalo de nuevo.'; },
    });
  }
}

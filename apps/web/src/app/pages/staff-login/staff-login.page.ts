import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApiService } from '../../core/api.service';
@Component({
  standalone: true, imports: [ReactiveFormsModule, NgIf],
  template: `
  <div class="mx-auto flex max-w-md flex-col px-4 py-16">
    <h1 class="font-display text-3xl font-semibold">Acceso staff</h1>
    <p class="mt-2 text-sm text-ink-muted">Coordinación y acompañantes · JWT</p>
    <form class="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm" [formGroup]="form" (ngSubmit)="submit()">
      <div>
        <label class="mb-1 block text-sm font-semibold" for="em">Email</label>
        <input id="em" type="email" formControlName="email" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-semibold" for="pw">Contraseña</label>
        <input id="pw" type="password" formControlName="password" class="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm" />
      </div>
      <p *ngIf="error" class="text-sm text-red-700">{{ error }}</p>
      <button type="submit" [disabled]="form.invalid || loading" class="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-50">Entrar</button>
      <p class="text-center text-xs text-ink-muted">Demo: coord&#64;senda.care / password123</p>
    </form>
  </div>
  `,
})
export class StaffLoginPage {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  loading = false; error = '';
  form = this.fb.nonNullable.group({
    email: ['coord&#64;senda.care', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]],
  });
  submit() {
    this.loading = true; this.error = '';
    const v = this.form.getRawValue();
    this.api.login(v.email, v.password).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/staff']); },
      error: () => { this.loading = false; this.error = 'Credenciales inválidas'; },
    });
  }
}

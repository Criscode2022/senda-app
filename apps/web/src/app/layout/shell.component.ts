import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-shell', standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header class="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
    <div class="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
      <a routerLink="/" class="flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-white">S</span>
        <span class="font-display text-xl font-semibold text-primary">SENDA</span>
      </a>
      <nav class="hidden items-center gap-7 text-sm font-medium text-ink-muted md:flex">
        <a routerLink="/" routerLinkActive="text-ink" [routerLinkActiveOptions]="{exact:true}">Inicio</a>
        <a routerLink="/solicitar" class="rounded-full bg-primary px-5 py-2.5 text-white hover:bg-primary-strong">Solicitar visita</a>
        <a routerLink="/staff/login" class="text-xs text-ink-muted hover:text-ink">Staff</a>
      </nav>
      <a routerLink="/solicitar" class="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white md:hidden">Visita</a>
    </div>
  </header>
  <main class="min-h-[70vh]"><ng-content /></main>
  <footer class="bg-ink text-white">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p class="font-display text-lg">SENDA</p>
      <p class="mt-2 text-sm text-white/60">Acompañamiento a domicilio para personas mayores. Urgencias médicas: 112.</p>
    </div>
  </footer>
  `,
})
export class ShellComponent {}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true, imports: [RouterLink],
  template: `
  <section class="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-16">
    <div>
      <div class="inline-flex rounded-full bg-primary-soft px-3 py-1.5 text-[11px] font-semibold tracking-wide text-primary">ACOMPAÑAMIENTO A DOMICILIO</div>
      <h1 class="mt-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl">Cuidado que llega a casa, con ruta y con calma.</h1>
      <p class="mt-5 text-lg leading-relaxed text-ink-muted">Solicita visitas de acompañamiento para personas mayores. Coordinación confirma y el equipo llega con una agenda clara.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a routerLink="/solicitar" class="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-strong">Solicitar visita</a>
        <a href="#como" class="rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold">Cómo funciona</a>
      </div>
    </div>
    <div class="overflow-hidden rounded-[20px] border border-border shadow-lg">
      <img src="assets/heroes/home.jpg" alt="Acompañamiento a domicilio" class="aspect-[4/3] w-full object-cover" />
    </div>
  </section>
  <section id="como" class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
    <h2 class="font-display text-2xl font-semibold md:text-3xl">Cómo funciona</h2>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <article class="rounded-2xl border border-border bg-surface p-6 shadow-sm"><p class="text-xs font-bold text-accent">01</p><h3 class="mt-2 font-semibold">Solicitas</h3><p class="mt-2 text-sm text-ink-muted">La familia envía preferencia de franja y tipo de visita.</p></article>
      <article class="rounded-2xl border border-border bg-surface p-6 shadow-sm"><p class="text-xs font-bold text-accent">02</p><h3 class="mt-2 font-semibold">Confirmamos</h3><p class="mt-2 text-sm text-ink-muted">Coordinación llama y cierra día y hora.</p></article>
      <article class="rounded-2xl border border-border bg-surface p-6 shadow-sm"><p class="text-xs font-bold text-accent">03</p><h3 class="mt-2 font-semibold">Acompañamos</h3><p class="mt-2 text-sm text-ink-muted">El equipo visita y actualiza el estado en la agenda.</p></article>
    </div>
  </section>
  <section class="bg-primary">
    <div class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
      <h2 class="font-display text-2xl font-semibold text-white md:text-3xl">¿Necesitas una visita esta semana?</h2>
      <a routerLink="/solicitar" class="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary">Solicitar ahora</a>
    </div>
  </section>
  `,
})
export class HomePage {}

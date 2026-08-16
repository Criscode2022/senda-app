import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true, imports: [RouterLink],
  template: `
  <section class="relative min-h-[78vh] overflow-hidden bg-ink">
    <img src="assets/heroes/home.jpg" alt="Acompañamiento a domicilio" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#1A1F2E] via-[#1A1F2E]/55 to-transparent"></div>
    <div class="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6">
      <p class="text-[11px] font-semibold tracking-[0.18em] text-white/80">ACOMPAÑAMIENTO A DOMICILIO</p>
      <h1 class="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-white md:text-6xl">Cuidado que llega a casa, con ruta y con calma.</h1>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-white/80">Solicita visitas de acompañamiento para personas mayores. Coordinación confirma y el equipo llega con una agenda clara.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a routerLink="/solicitar" class="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink hover:bg-primary-soft">Solicitar visita</a>
        <a href="#como" class="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white">Cómo funciona</a>
      </div>
    </div>
  </section>
  <section id="como" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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

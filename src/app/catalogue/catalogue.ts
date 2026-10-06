import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LIVRES } from '../livres';

@Component({
  selector: 'app-catalogue',
  imports: [RouterLink],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue {
  protected readonly filtre = signal('');

  protected readonly resultats = computed(() => {
    const term = this.filtre().toLowerCase().trim();
    if (!term) {
      return LIVRES;
    }
    return LIVRES.filter(l => l.auteur.toLowerCase().includes(term));
  });

  protected onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filtre.set(input.value);
  }
}

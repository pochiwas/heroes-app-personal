import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/hero.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor(private heroService: HeroesService) { }

  public searchInput = new FormControl('')
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  searchHeroes() {
    const value = this.searchInput.value || '';
    console.log({ value });
    this.heroService.getSuggestions(value)
      .subscribe(hero => this.heroes = hero);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero:Hero = event.option.value
    this.searchInput.setValue(hero.superhero)
    this.selectedHero = hero;
  }
}

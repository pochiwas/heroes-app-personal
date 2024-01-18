import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
    constructor(private http: HttpClient) { }

    private base: string = environments.baseUrl;

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.base}/heroes`);
    }

    getHeroById(id: string): Observable<Hero | undefined> {
        return this.http.get<Hero>(`${this.base}/heroes/${id}`)
            .pipe(
                catchError(error => of(undefined))
            )
    }

    getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.base}/heroes?q=${query}&limit=6`)
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(`${this.base}/heroes/`, hero)
    }

    updateHero(hero: Hero): Observable<Hero> {
        if (!hero.id) throw Error('Hero id is required')
        return this.http.patch<Hero>(`${this.base}/heroes/${hero.id}`, hero)
    }

    deletedHeroById(id: string): Observable<boolean> {

        return this.http.delete<Hero>(`${this.base}/heroes/${id}`)
            .pipe(
                catchError(err => of(false)),
                map(resp => true)
            );
    }
}

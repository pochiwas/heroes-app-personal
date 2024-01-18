import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  constructor(private heroService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router:Router) { }


  @Input()
  public selectedHero!: Hero;

  public hero?: Hero

  ngOnInit(): void {

    this.activateRoute.params
    //pipe ejecuta las funciones dentro del mismo pipe y luego devuelve una funcion con las respuestas de dichas ejecucciones
      .pipe(
        switchMap(({id}) => this.heroService.getHeroById(id))
    ).subscribe( hero =>{
      //si no exite hero se redirecciona a la pagina de la lista de heroes
      if(!hero) return this.router.navigate(['/heroes/list'])
      console.log({hero});
    this.hero = hero
    console.log(this.hero);
    return;
    })

  }

  goBack(){
    return this.router.navigateByUrl('heroes/list');
  }

}

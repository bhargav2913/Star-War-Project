import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';
import axios from 'axios';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any = null;
  homeworldName: string = '';
  speciesName: string = '';
  filmTitles: string[] = [];
  vehiclesNames: string[] = [];
  starshipsNames: string[] = [];

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }

  async ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.character = await this.swapiService.getCharacter(Number(characterId));

    if (this.character.homeworld) {
      const homeworldData = await axios.get(this.character.homeworld);
      this.homeworldName = homeworldData.data.name;
    }

    if (this.character.species.length) {
      const speciesData = await axios.get(this.character.species[0]);
      this.speciesName = speciesData.data.name;
    }

    for (const filmUrl of this.character.films) {
      const filmData = await axios.get(filmUrl);
      this.filmTitles.push(filmData.data.title);
    }

    for (const vehicleUrl of this.character.vehicles) {
      const vehicleData = await axios.get(vehicleUrl);
      this.vehiclesNames.push(vehicleData.data.name);
    }

    for (const starshipUrl of this.character.starships) {
      const starshipData = await axios.get(starshipUrl);
      this.starshipsNames.push(starshipData.data.name);
    }
  }
}

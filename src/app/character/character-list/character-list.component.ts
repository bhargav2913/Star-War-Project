import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  films: any[] = [];
  species: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  selectedFilm: string = '';
  selectedSpecies: string = '';
  selectedVehicle: string = '';
  selectedStarship: string = '';
  selectedBirthYear: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private swapiService: SwapiService, private router: Router) { }

  async ngOnInit() {
    const charactersData = await this.swapiService.getCharacters();
    this.characters = charactersData.results;
    this.filteredCharacters = [...this.characters];

    const filmsData = await this.swapiService.getFilms();
    this.films = filmsData.results;

    const speciesData = await this.swapiService.getSpecies();
    this.species = speciesData.results;

    const vehiclesData = await this.swapiService.getVehicles();
    this.vehicles = vehiclesData.results;

    const starshipsData = await this.swapiService.getStarships();
    this.starships = starshipsData.results;

    this.updatePagination();
  }

  filterCharacters() {
    this.filteredCharacters = this.characters.filter(character => {
      const matchesFilm = this.selectedFilm ? character.films.includes(this.selectedFilm) : true;
      const matchesSpecies = this.selectedSpecies ? character.species.includes(this.selectedSpecies) : true;
      const matchesVehicle = this.selectedVehicle ? character.vehicles.includes(this.selectedVehicle) : true;
      const matchesStarship = this.selectedStarship ? character.starships.includes(this.selectedStarship) : true;
      const matchesBirthYear = this.selectedBirthYear ? character.birth_year.includes(this.selectedBirthYear) : true;

      return matchesFilm && matchesSpecies && matchesVehicle && matchesStarship && matchesBirthYear;
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  selectCharacter(character: any) {
    const characterId = character.url.split('/').slice(-2, -1)[0];
    this.router.navigate([`/characters/${characterId}`]);
  }

  getSpeciesName(speciesUrl: string) {
    const species = this.species.find(species => species.url === speciesUrl);
    return species ? species.name : 'Unknown';
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCharacters.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get paginatedCharacters() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCharacters.slice(start, end);
  }
}

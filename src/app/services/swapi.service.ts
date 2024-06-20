import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private apiUrl = 'https://swapi.dev/api';

  constructor() { }

  async getCharacters(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/people`);
    return response.data;
  }

  async getCharacter(id: number): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/people/${id}`);
    return response.data;
  }

  async getFilms(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/films`);
    return response.data;
  }

  async getSpecies(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/species`);
    return response.data;
  }

  async getVehicles(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/vehicles`);
    return response.data;
  }

  async getVehicle(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }

  async getStarships(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/starships`);
    return response.data;
  }

  async getStarship(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }

  async getHomeworld(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
}

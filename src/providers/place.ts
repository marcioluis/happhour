import { Injectable } from '@angular/core';
import { PlaceModel } from "../model/models";
import { Api } from "./providers";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';



/*
  Generated class for the Place provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlaceProvider {

  constructor() {
    console.log('Hello Place Provider');
  }

  findNearbyPlaces(radius: number, skip?: number, size?: number) {
    let places: PlaceModel[] = [{
      _id: 123,
      nome: "4Beers", subNome: "Bar de cervejas artesanais",
      logoUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSIelVH6cOzCktUM5jLCZ7du6gRVTUVK7jIKhSQMWzNg9oSXKdB",
      endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: true, isReservavel: true,
      horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
      fotosUrls: [
        "https://media-cdn.tripadvisor.com/media/photo-s/0b/c4/2e/ab/bar-e-suas-vinte-torneiras.jpg",
        "https://igx.4sqi.net/img/general/original/42099106_nQ_m_JhxlYoKFupTU3jJpRAIMCf1cvoAl95CY3M7UHQ.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/0c/10/a3/41/4beer-cerveja-cultura.jpg"]
    }];
    
    return Observable.from<PlaceModel>(places);
    
  }

}


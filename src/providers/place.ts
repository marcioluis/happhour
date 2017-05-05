import { Injectable } from '@angular/core';
import { PlaceModel } from "../model/models";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

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

  findNearbyPlaces(radius: number, skip: number = 0, size: number = 3) {
    let promise = new Promise<PlaceModel[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(placesMockData);
      }, 2550);
    });
    //http://stackoverflow.com/questions/37618337/how-to-use-skip-and-take-with-rxjs-observable
    return Observable.from<PlaceModel[]>(promise)
      .map(data => data.slice(skip, skip + size));
  }

}

const placesMockData: PlaceModel[] = [{
  id: 123,
  nome: "4Beers", subNome: "Cerveja & Cultura",
  logoUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSIelVH6cOzCktUM5jLCZ7du6gRVTUVK7jIKhSQMWzNg9oSXKdB",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: true, isReservavel: true,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "A 4beer é um tap house, bar com 20 torneiras de chopp saídas direto da câmara fria, junto da cervejaria Diefen Bier. \n\r Às 23h: Hell Bells, último chopp!",
  fotosUrls: [
    "https://media-cdn.tripadvisor.com/media/photo-s/0b/c4/2e/ab/bar-e-suas-vinte-torneiras.jpg",
    "https://igx.4sqi.net/img/general/original/42099106_nQ_m_JhxlYoKFupTU3jJpRAIMCf1cvoAl95CY3M7UHQ.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0c/10/a3/41/4beer-cerveja-cultura.jpg"]
}, {
  id: 1234,
  nome: "Mulligan Porto Alegre", subNome: "Irish pub",
  logoUrl: "http://silvercreekart.weebly.com/uploads/3/7/3/0/37300503/9869404.png",
  endereco: "Av. Padre Chagas 666", telefones: ["5133627666", "5132145678"], isHappyOnDemand: false, isPontuavel: true, isReservavel: false,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://2.kekantoimg.com/iNKlCUKmkreSO-X0FltzpKMlOBY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/814/113814.jpg",
    "https://imagesapt.apontador-assets.com/fit-in/640x480/7d526959259b4329a4ada9fc3a17e7e6/3k2yv72s-320148250593434.jpg",
    "http://3.bp.blogspot.com/-kOUsGgSTuFY/TbrMpQ05GrI/AAAAAAAAABo/d6X6joh13is/s1600/Mulligan_Small.jpg"]
}, {
  id: 1235,
  nome: "Pedrini", subNome: "",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/A_Voz_do_Brasil_logo.svg/256px-A_Voz_do_Brasil_logo.svg.png",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: false, isReservavel: true,
  horariosFuncionamento: { 1: "18h - 1h", 2: "18h - 1h", 3: "18h - 1h", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://3.kekantoimg.com/abphgIiG07F-T0GfsZuS4gtrr2M=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/887/116887.jpg",
    "http://1.bp.blogspot.com/-lB5B463mp3k/VE-Xow1lBzI/AAAAAAAAAVA/SIzUzzb4TDc/s1600/Imagem%2B1.jpg",
    "https://3.kekantoimg.com/szxjO6_em79V5cBwj4W1T6vH2JY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/879/277879.jpg"]
}, {
  id: 456,
  nome: "4Beers", subNome: "Bar de cervejas artesanais",
  logoUrl: "https://logodownload.org/wp-content/uploads/2014/09/lol-logo-league-of-legends-4.png",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: true, isReservavel: true,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://media-cdn.tripadvisor.com/media/photo-s/0b/c4/2e/ab/bar-e-suas-vinte-torneiras.jpg",
    "https://igx.4sqi.net/img/general/original/42099106_nQ_m_JhxlYoKFupTU3jJpRAIMCf1cvoAl95CY3M7UHQ.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0c/10/a3/41/4beer-cerveja-cultura.jpg"]
}, {
  id: 4567,
  nome: "Mulligan Porto Alegre", subNome: "Irish pub",
  logoUrl: "https://typo3.org/fileadmin/t3org/images/icons/slack.svg",
  endereco: "Av. Padre Chagas 666", telefones: ["5133627666", "5132145678"], isHappyOnDemand: false, isPontuavel: true, isReservavel: false,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://2.kekantoimg.com/iNKlCUKmkreSO-X0FltzpKMlOBY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/814/113814.jpg",
    "https://imagesapt.apontador-assets.com/fit-in/640x480/7d526959259b4329a4ada9fc3a17e7e6/3k2yv72s-320148250593434.jpg",
    "http://3.bp.blogspot.com/-kOUsGgSTuFY/TbrMpQ05GrI/AAAAAAAAABo/d6X6joh13is/s1600/Mulligan_Small.jpg"]
}, {
  id: 4568,
  nome: "Pedrini", subNome: "",
  logoUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSQksVuC8-cD1RFYccUzIDpZ_gD0tZw38b1MVEVGLYvqIPSbYnWUA",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: false, isReservavel: true,
  horariosFuncionamento: { 1: "18h - 1h", 2: "18h - 1h", 3: "18h - 1h", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://3.kekantoimg.com/abphgIiG07F-T0GfsZuS4gtrr2M=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/887/116887.jpg",
    "http://1.bp.blogspot.com/-lB5B463mp3k/VE-Xow1lBzI/AAAAAAAAAVA/SIzUzzb4TDc/s1600/Imagem%2B1.jpg",
    "https://3.kekantoimg.com/szxjO6_em79V5cBwj4W1T6vH2JY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/879/277879.jpg"]
}, {
  id: 789,
  nome: "4Beers", subNome: "Bar de cervejas artesanais",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Chromium_11_Logo.svg/256px-Chromium_11_Logo.svg.png",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: true, isReservavel: true,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://media-cdn.tripadvisor.com/media/photo-s/0b/c4/2e/ab/bar-e-suas-vinte-torneiras.jpg",
    "https://igx.4sqi.net/img/general/original/42099106_nQ_m_JhxlYoKFupTU3jJpRAIMCf1cvoAl95CY3M7UHQ.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0c/10/a3/41/4beer-cerveja-cultura.jpg"]
}, {
  id: 7890,
  nome: "Mulligan Porto Alegre", subNome: "Irish pub",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Media_Player_Classic_logo.png",
  endereco: "Av. Padre Chagas 666", telefones: ["5133627666", "5132145678"], isHappyOnDemand: false, isPontuavel: true, isReservavel: false,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://2.kekantoimg.com/iNKlCUKmkreSO-X0FltzpKMlOBY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/814/113814.jpg",
    "https://imagesapt.apontador-assets.com/fit-in/640x480/7d526959259b4329a4ada9fc3a17e7e6/3k2yv72s-320148250593434.jpg",
    "http://3.bp.blogspot.com/-kOUsGgSTuFY/TbrMpQ05GrI/AAAAAAAAABo/d6X6joh13is/s1600/Mulligan_Small.jpg"]
}, {
  id: 7891,
  nome: "Pedrini", subNome: "",
  logoUrl: "https://4.bp.blogspot.com/-rMQvgxPet-A/VySnsgGDF1I/AAAAAAAAFgY/YOZUZL4wRRMZ5Y6Gv0UZDBtzb_t3uH98QCLcB/s1600/AFC_inline.png",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: false, isReservavel: true,
  horariosFuncionamento: { 1: "18h - 1h", 2: "18h - 1h", 3: "18h - 1h", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://3.kekantoimg.com/abphgIiG07F-T0GfsZuS4gtrr2M=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/887/116887.jpg",
    "http://1.bp.blogspot.com/-lB5B463mp3k/VE-Xow1lBzI/AAAAAAAAAVA/SIzUzzb4TDc/s1600/Imagem%2B1.jpg",
    "https://3.kekantoimg.com/szxjO6_em79V5cBwj4W1T6vH2JY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/879/277879.jpg"]
}, {
  id: 7893,
  nome: "4Beers", subNome: "Bar de cervejas artesanais",
  logoUrl: "https://images.vexels.com/media/users/3/136311/isolated/lists/b26ff18482f595dacf0017d4d0251c0a-logo-kebab-embrulhar-fast-food.png",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: true, isReservavel: true,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://media-cdn.tripadvisor.com/media/photo-s/0b/c4/2e/ab/bar-e-suas-vinte-torneiras.jpg",
    "https://igx.4sqi.net/img/general/original/42099106_nQ_m_JhxlYoKFupTU3jJpRAIMCf1cvoAl95CY3M7UHQ.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0c/10/a3/41/4beer-cerveja-cultura.jpg"]
}, {
  id: 7894,
  nome: "Mulligan Porto Alegre", subNome: "Irish pub",
  logoUrl: "https://opensource.org/files/twitterlogo.png",
  endereco: "Av. Padre Chagas 666", telefones: ["5133627666", "5132145678"], isHappyOnDemand: false, isPontuavel: true, isReservavel: false,
  horariosFuncionamento: { 1: "fechado", 2: "fechado", 3: "fechado", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://2.kekantoimg.com/iNKlCUKmkreSO-X0FltzpKMlOBY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/814/113814.jpg",
    "https://imagesapt.apontador-assets.com/fit-in/640x480/7d526959259b4329a4ada9fc3a17e7e6/3k2yv72s-320148250593434.jpg",
    "http://3.bp.blogspot.com/-kOUsGgSTuFY/TbrMpQ05GrI/AAAAAAAAABo/d6X6joh13is/s1600/Mulligan_Small.jpg"]
}, {
  id: 7895,
  nome: "Pedrini", subNome: "",
  logoUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSoInmyuFsDxaHwf9luOPksCYFL6Lx1EaQt16TIMe867bEUV9HC4w",
  endereco: "Av. Polônia 240", telefones: ["5133627666", "5132145678"], isHappyOnDemand: true, isPontuavel: false, isReservavel: true,
  horariosFuncionamento: { 1: "18h - 1h", 2: "18h - 1h", 3: "18h - 1h", 4: "19h - 23h", 5: "19h - 23h", 6: "18h-00h", 7: "fechado" },
  descricao: "",
  fotosUrls: [
    "https://3.kekantoimg.com/abphgIiG07F-T0GfsZuS4gtrr2M=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/887/116887.jpg",
    "http://1.bp.blogspot.com/-lB5B463mp3k/VE-Xow1lBzI/AAAAAAAAAVA/SIzUzzb4TDc/s1600/Imagem%2B1.jpg",
    "https://3.kekantoimg.com/szxjO6_em79V5cBwj4W1T6vH2JY=/fit-in/600x600/s3.amazonaws.com/kekanto_pics/pics/879/277879.jpg"]
}];


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('spotify listo');
  }
  getQuery( query: string){

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCB9DkU6_OxAPR9sfazrfoRQ20AhcMmbpNrpF6XlPVi4SGnS_e_qgxpWekzvffiv4rVXu-jKZGAZlgxWa8'
    });

    return this.http.get(url,{ headers});

  };
  getNewReleases(){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDsvfJ95x15bNCXqkpORyoEgh-GLbrNtGQ5-AXL6Ajr9SQ6V-MO5aRf6IXmH2DbSstJv_CmgGJLb2hIkIw'
    // })
    
    return this.getQuery('browse/new-releases?limit=20')
    .pipe(map(data => {
      return data['albums'].items;
    }));
  
    //  this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers });
    //  .pipe(map(data => {
    //    return data['albums'].items;
    //  }));

  };

  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map(data => data['artists'].items));

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQCjQgynIsB6e3waeAI0-pCNzGc9Fk1ootdQoEHEm2Hjp_CRA3yL-U8OaGD7hQGEw5vK8WZLO9G0PhCljSk'
    // })

    //  return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
    //  .pipe(map(data => data['artists'].items));

  };

  getArtista(id: string){
    return this.getQuery(`artists/${id}`)
    // .pipe(map(data => data['artists'].items));

  };

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?market=us`)
    .pipe(map(data => data['tracks']));

  };

}

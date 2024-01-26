import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalService } from './local.service';
import { ServiceLocator } from './service.locator';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient,
    private localService: LocalService,
    private serviceLocator: ServiceLocator) { }

  getReviews(chef: string): Observable<Review[]> {

    var params = new HttpParams();
    if (chef !== undefined && chef !== null) {
      params = params.set('chef', chef);
    }
    console.log('Fetching reviews for : ' + params)
    return this.http.get<Review[]>(this.serviceLocator.ReviewsUrl, { params });
  }
}

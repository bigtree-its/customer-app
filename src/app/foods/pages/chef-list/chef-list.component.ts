import {
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChefSearchQuery } from 'src/app/model/ChefSearchQuery';
import { Cuisine, Dish, LocalChef } from 'src/app/model/localchef';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { ChefService } from 'src/app/services/chef.service';
import { ContextService } from 'src/app/services/context.service';
import { CuisinesService } from 'src/app/services/cusines.service';
import { LocationService } from 'src/app/services/location.service';
import { Utils } from 'src/app/services/utils';
import {
  faStar,
  faCopyright,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/services/local.service';
import { Constants } from 'src/app/services/constants';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-chef-list',
  templateUrl: './chef-list.component.html',
  styleUrls: ['./chef-list.component.css'],
})
export class ChefListComponent implements OnDestroy {
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;

  localService = inject(LocalService);
  dishService = inject(DishService);
  titleService = inject(Title);

  destroy$ = new Subject<void>();
  serviceLocation: ServiceLocation;
  localChefs: LocalChef[] = [];
  filteredChefs: LocalChef[] = [];
  serviceLocations: ServiceLocation[] = [];

  starSelected: string = '/assets/icons/star3.png';
  star: string = '/assets/icons/star.png';
  cuisines: Cuisine[] = [];
  selectedCuisines: Cuisine[] = [];
  selectedDishes: Dish[] = [];
  selectedCuisine: Cuisine;
  selectedDish: Dish;
  cuisineMap: Map<String, Cuisine> = new Map<String, Cuisine>();
  dishMap: Map<String, Dish> = new Map<String, Dish>();
  errors: any;
  errorMessage: any;
  dishes: Dish[] = [];
  cuisine: Cuisine;
  faStar = faStar;
  faCopyright = faCopyright;
  faCheck = faCheck;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chefService: ChefService,
    private contextService: ContextService,
    private locationService: LocationService,
    private utils: Utils,
    private cuisinesService: CuisinesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var location = this.activatedRoute.snapshot.queryParamMap.get('location');
    const cuisine = this.activatedRoute.snapshot.queryParamMap.get('cuisine');
    console.log('location: ' + location);
    console.log('cuisine: ' + cuisine);
    if (location !== null && location.length > 5) {
      this.locationService.getLocation(location).subscribe((sl) => {
        if (Utils.isValid(sl)) {
          this.serviceLocation = sl;
          this.titleService.setTitle(sl.slug.toLocaleUpperCase())
          this.localService.saveData(
            Constants.StorageItem_Location,JSON.stringify(this.serviceLocation)
          );
          this.contextService.selectLocation(sl);
          this.fetchChefsByServiceLocation(this.serviceLocation);
        }
      });
    }

    if (cuisine !== null && cuisine.length > 5) {
      this.cuisinesService.getSingleCuisine(cuisine).subscribe((c) => {
        if (Utils.isValid(c)) {
          this.cuisine = c;
          console.log('Fetched the cuisine ' + JSON.stringify(this.cuisine));
          this.contextService.selectCuisine(this.cuisine);
          this.fetchChefsByCuisines(this.cuisine);
        }
      });
    }

    this.cuisinesService.getCuisines().subscribe((d) => {
      this.cuisines = d;
      this.selectedCuisine = this.cuisines[0];
      for (var i = 0; i < d.length; i++) {
        var theCuisine = d[i];
        this.cuisineMap.set(theCuisine.name, theCuisine);
      }
    });

    this.loadDishes();
  }

  private loadDishes() {
    let observable = this.dishService.getDishes();
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        console.log('Retrieved dishes from server');
        this.dishes = data;
      },
      error: (err) => {
        console.error('Errors when loading Dishes' + JSON.stringify(err));
        this.errors = err;
        this.errorMessage = err.error.detail;
      },
    });
  }

  onSelectCuisine(c: Cuisine) {
    console.log('You clicked ' + JSON.stringify(c));
    var selected = false;
    for (var i = 0; i < this.selectedCuisines.length; i++) {
      var theCuisine = this.selectedCuisines[i];
      if (theCuisine.name === c.name) {
        this.selectedCuisines.splice(i, 1);
        selected = true;
      }
    }
    this.filteredChefs = [];
    if (!selected) {
      this.selectedCuisines.push(c);
    }

    this.filterByCuisine();
  }

  isSelectedCuisine(c: Cuisine) {
    var selected = false;
    for (var i = 0; i < this.selectedCuisines.length; i++) {
      var theCuisine = this.selectedCuisines[i];
      if (theCuisine.name === c.name) {
        selected = true;
        console.log('Cuisine selected ' + true);
        break;
      }
    }
    return selected;
  }

  filterByCuisine() {
    console.log('Selected cuisines: ' + JSON.stringify(this.selectedCuisines));
    if (this.selectedCuisines.length === 0) {
      this.filteredChefs = this.localChefs;
    } else {
      this.localChefs.forEach((supplier) => {
        this.selectedCuisines.forEach((selectedC) => {
          supplier.cuisines.forEach((supplierC) => {
            if (selectedC.name === supplierC.name) {
              if (!this.filteredChefs.includes(supplier)) {
                this.filteredChefs.push(supplier);
              }
            }
          });
        });
      });
    }
  }

  onSelectDish(c: Dish) {
    console.log('You clicked dish' + JSON.stringify(c));
    var selected = false;
    for (var i = 0; i < this.selectedDishes.length; i++) {
      var theDish = this.selectedDishes[i];
      if (theDish.name === c.name) {
        this.selectedDishes.splice(i, 1);
        selected = true;
      }
    }
    this.filteredChefs = [];
    if (!selected) {
      this.selectedDishes.push(c);
    }

    this.filterByDish();
  }

  isDishSelected(c: Dish) {
    var selected = false;
    for (var i = 0; i < this.selectedDishes.length; i++) {
      var theDish = this.selectedDishes[i];
      if (theDish.name === c.name) {
        selected = true;
        console.log('Dish selected? ' + true);
        break;
      }
    }
    return selected;
  }

  filterByDish() {
    console.log('Chefs: ' + JSON.stringify(this.localChefs));
    console.log('Selected dish: ' + JSON.stringify(this.selectedDishes));
    if (this.selectedDishes.length === 0) {
      this.filteredChefs = this.localChefs;
    } else {
      this.localChefs.forEach((supplier) => {
        this.selectedDishes.forEach((selectedD) => {
          supplier.dishes.forEach((sd) => {
            if (selectedD.name === sd.name) {
              if (!this.filteredChefs.includes(supplier)) {
                this.filteredChefs.push(supplier);
              }
            }
          });
        });
      });
    }
  }

  onClickCook(cook: LocalChef) {
    this.router.navigate(['cooks', cook._id]).then();
  }

  fetchChefsByServiceLocation(serviceLocation: ServiceLocation) {
    const chefSearchQuery = {} as ChefSearchQuery;
    chefSearchQuery.serviceAreas = serviceLocation._id;
    console.log('The Query for chefs ' + JSON.stringify(chefSearchQuery));
    this.chefService
      .getAllLocalChefs(chefSearchQuery)
      .subscribe((result: LocalChef[]) => {
        this.localChefs = result;
        this.filteredChefs = this.localChefs;
        this.serviceLocations = [];
      });
  }

  fetchChefsByCuisines(cuisine: Cuisine) {
    console.log('The Cuisine ' + JSON.stringify(cuisine));
    const chefSearchQuery = {} as ChefSearchQuery;
    chefSearchQuery.cuisines = cuisine._id;
    console.log('The Query for chefs ' + JSON.stringify(chefSearchQuery));
    this.chefService
      .getAllLocalChefs(chefSearchQuery)
      .subscribe((result: LocalChef[]) => {
        this.localChefs = result;
        this.filteredChefs = this.localChefs;
        this.serviceLocations = [];
      });
  }

  getAddress(cook: LocalChef): string {
    return Utils.getChefAddress(cook);
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

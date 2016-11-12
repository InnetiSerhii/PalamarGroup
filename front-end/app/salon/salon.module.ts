/**
 * Created by Galyna on 25.08.2016.
 */

//modules
import 'angular';
import 'angular-material';
import {resourcesModule} from "../resources/resources.module";

//components
import {salonRoutes} from './salon.routes';
import {SalonHomeComponentName, SalonHomeComponentOptions} from "./components/salon.home.component";
import {FavorsComponentName, FavorsComponentOptions} from "./components/favors.component";
import {MasterComponentName, MasterComponentOptions} from "./components/salon.master.component";
import {ProductsComponentOptions, ProductsComponentName} from "./components/products.component";
import {SalonContactsComponentOptions, SalonContactsComponentName} from "./components/salon.contacts.component";
import {SalonTransformsComponentName, SalonTransformsComponentOptions} from "./components/salon.transforms.component";
import {FavorComponentName, FavorComponentOptions} from "./components/favor.component";
import {MastersComponentName, MastersComponentOptions} from "./components/masters.component";
import {AppointmentService, AppointmentServiceName} from "./servises/appointment.service";


let app = angular.module('salon', ['ngMaterial', resourcesModule.name])
    .config(salonRoutes)
    .service(AppointmentServiceName, AppointmentService)
    .component(SalonHomeComponentName, SalonHomeComponentOptions)
    .component(FavorsComponentName, FavorsComponentOptions)
    .component(FavorComponentName, FavorComponentOptions)
    .component(MasterComponentName, MasterComponentOptions)
    .component(MastersComponentName, MastersComponentOptions)
    .component(SalonContactsComponentName, SalonContactsComponentOptions)
    .component(ProductsComponentName, ProductsComponentOptions)
    .component(SalonTransformsComponentName, SalonTransformsComponentOptions);

export let salonModule = app;



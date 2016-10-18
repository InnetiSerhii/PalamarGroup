import {ITransform,ITransformResource,TransformResourceName} from "../../resources/transform.resource";
import {IRootScope} from "../../../typings";


const template = `<div class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПЕРЕВТІЛЕННЯ</div>
            </div>

        </div>
    </div>

 <div ng-repeat="transform in $ctrl.transforms">
    <div layout="row" layout-align="center center" ng-if="transform.videos.length>0">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
            <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos" data-aos="{{{true:'zoom-in-up', false:''}[$ctrl.showAnimation]}}"
                         ng-repeat="video in transform.videos track by $index"
                         flex>
                    <div flex class="embed-responsive embed-responsive-16by9">
                        <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                       video-id="video.url"></youtube-video>
                    </div>
                    <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::video.name}}</span>
                    </md-card-content>
                </md-card>
            </div>
        </div>

    </div>

     <div layout="row" layout-align="center center" ng-if="transform.photos.length>0">
        <div  flex flex-gt-md="60" flex-md="80"  flex-gt-xs="60">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="photo in transform.photos"
                         class="md-margin " flex-gt-sm="22"  flex-gt-xs="46" flex-xs="80"
                         ng-click="$ctrl.showMaster(master._id)">
                    <card-image-container>
                        <img ng-src="{{::photo.url}}" class="md-card-image">
                    </card-image-container>
                    <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::photo.name}}</span>
                    </md-card-content>

            </div>
        </div>
         
    </div>
 </div>   
</div>



`;

export class SalonTransformsComponentController {


    static $inject = [TransformResourceName,"$routeParams"];
    
    showAnimation:boolean;
    transforms:ITransform[];

    constructor(private TransformResource:ITransformResource, private $rootScope:IRootScope) {
        this.showAnimation = $rootScope.isBigSize;
    }

    $onInit() {
            this.transforms=  this.TransformResource.query({sort:"order"});
            this.transforms.$promise.then( (transforms) => {
            } );

    }

}

export let SalonTransformsComponentUrl = "/transforms";
export let SalonTransformsComponentName = 'pgSalonTransforms';
export let SalonTransformsComponentOptions = {
    template: template,
    controller: SalonTransformsComponentController
};
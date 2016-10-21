import {MasterResourceName, IMasterResource, IMaster, IScheduler} from "../../resources/master.resource";
import {IRootScope} from "../../../typings";
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import ITask = pg.models.ITask;

const template = `<div class=" description-container">


    <div class=" courses" layout-align="center center" layout="column"
    >
        <div hide show-gt-xs="true" layout="row" layout-align="center center">

            <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
            >
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[$ctrl.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex="50"><img src="{{::$ctrl.master.photo.url}}" class="md-card-image "/>
                    </div>
                    <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[$ctrl.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex="50" layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text flex layout-align="space-around center">
                                <div hide show-md="true" class="md-display-2">{{::$ctrl.master.name}}</div>
                                <div hide-md="true" class="md-display-1">{{::$ctrl.master.name}}</div>
                                <div class="descr-container">
                                    <div class="md-title">{{::$ctrl.master.description}}</div>

                                </div>
                            </md-card-title-text>
                        </md-card-title>
                        <md-card-actions flex="25">
                            <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                       ng-click="$ctrl.showAppointmentDialog()">
                                Записатись
                            </md-button>
                        </md-card-actions>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div hide-gt-xs="true" layout="row" layout-align="center center">
            <div class="overlay-bg trigger-right"></div>
            <md-card md-whiteframe="8">
                <md-card-content layout="column">
                    <div class="card-media " ng-click="$ctrl.showMaster($ctrl.master._id)"><img
                            src="{{::$ctrl.master.photo.url}}"
                            class="md-card-image"/></div>
                    <div class="card-desc "
                         layout="column" layout-align="center center">
                        <md-card-title>
                            <md-card-title-text>
                                <div class="md-headline">{{::$ctrl.master.name}}</div>
                                <div class="md-title">{{::$ctrl.master.description}}</div>
                            </md-card-title-text>
                        </md-card-title>

                        <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                   ng-click="$ctrl.showAppointmentDialog(product)">
                            Записатись
                        </md-button>
                    </div>
                </md-card-content>

            </md-card>

        </div>

    </div>
    <div flex layout-align="center center" layout="column">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ГРАФІК РОБОТИ</div>
            </div>

        </div>
    </div>

    <div  class="master-scheduler" layout="row" flex layout-align="center center" >
        <div flex flex-gt-md="86" flex-gt-lg="80" >
            <div layout="column" layout layout-wrap layout-align="center center">
                  <div flex class="md-padding ">
        <daypilot-calendar id="week" daypilot-config="$ctrl.weekConfig"
                           daypilot-events="$ctrl.events"></daypilot-calendar>
    </div>
            </div>
        </div>

    </div>

    <div flex layout-align="center center" layout="column"
         ng-if="$ctrl.master.videos.length>0 || $ctrl.master.works.length>0">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> РОБОТИ МАЙСТРА</div>
            </div>

        </div>
    </div>

    <div class="courses-details" layout="row" flex layout-align="center center" ng-if="$ctrl.master.videos.length>0">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85">
            <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos"
                         data-aos="{{{true:'zoom-in-up', false:''}[$ctrl.showAnimation]}}"
                         ng-repeat="video in $ctrl.master.videos track by $index"
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

    <div flex="100" class="courses-details" layout="row" layout-align="center center"
         ng-if="$ctrl.master.works.length>0 ">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="photo in $ctrl.master.works"
                         class="md-margin "
                         ng-attr-flex-gt-sm="{{$ctrl.getPictureFlex($index,$ctrl.master.works.length)}}"
                         flex-gt-xs="46" flex-xs="80"
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


`;
const appointmentTemplate = `
<md-dialog class="pop-form-dialog"  aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"  layout="column" >
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2 class=" md-padding ">ЗАПИСАТИСЬ НА ПРИЙОМ</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex>
        <md-dialog-content>
            <md-dialog-content-body>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                    <label for="name">Як до вас звертатися</label>
                    <input id="name" ng-model="vm.appointment.name" type="text" name="name">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                    <label for="phone">Телефон</label>
                    <input id="phone" ng-model="vm.appointment.phone" type="text" name="phone">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                    <label for="comment">Додаткова інформація</label>
                    <textarea  id="comment" ng-model="vm.appointment.comment"  name="comment"></textarea>
                </md-input-container>
                    <p class=" md-headline">Після запису з Вами звяжеться адміністратор для підтвердження</p>
            </md-dialog-content-body>
        </md-dialog-content>
        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center" >
            <md-button ng-click="vm.save(orderForm)" class=" xs-selected md-raised md-headline">ЗАПИСАТИСЬ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`
class AppointmentDialogController {

    static $inject = ['$mdDialog', 'appointment'];

    private appointment:IAppointment;
    private originalAppointment:IAppointment;

    constructor(private $mdDialog:ng.material.IDialogService, appointment:IAppointment) {
        this.appointment = angular.copy( appointment );
        this.originalAppointment = appointment;
    }

    save(orderForm) {

        angular.extend( this.originalAppointment, this.appointment );
        this.$mdDialog.hide( this.originalAppointment );
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class MasterComponentController {

    static $inject = ["$log", "$routeParams", MasterResourceName, '$mdDialog', '$routeParams', AppointmentResourceName];
    master:IMaster;
    private appointment:IAppointment;
    events:IScheduler[];
    weekConfig:any;

    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private MasterResource:IMasterResource, private mdDialog:ng.material.IDialogService,
                private $rootScope:IRootScope, private AppointmentResource:IAppointmentResource) {
        this.events = [];
        this.appointment = new this.AppointmentResource();
        if (this.$routeParams["id"]) {
            this.MasterResource.get( {id: this.$routeParams["id"], populate: 'services.favor'} ).$promise
                .then( (master) => {
                    this.master = master;
                } ).catch( (err)=> {
                this.$log.error( err );

            } );
            this.loadEvents( new Date(), this.$routeParams["id"] );
        }
    }

    getStartAndEndOfWeek(date):Date[] {
        date = new Date( date );
        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        var start = new Date( date.setDate( diff ) );
        var end = new Date( date.setDate( start.getDate() + 7 ) );
        return [start, end];
    }

    loadEvents(start, masterId) {

        var days = this.getStartAndEndOfWeek( start );
        var params = {
            id: masterId,
            start: days[0].toISOString(),
            end: days[1].toISOString(),
        }
        this.MasterResource.getTasks( params ).$promise.then( (tasks) => {
            this.initWeekConfig();
            this.events = tasks.map( (task)=> {
                this.updateTaskText( task );
                this.crerateButtons( params )
                this.iniOnTimeRangeSelect();
                return angular.copy( task.scheduler );
            } );

        } ).catch( (err)=> {
            this.$log.error( err );

        } );
    }

    crerateButtons(params:any) {
        var start = new Date( params.start );
        var end = new Date( params.end );
        var days = end.getDate() - start.getDate();


    }

    updateTaskText(task:ITask) {

        task.scheduler.borderColor = "gray";
        task.scheduler.barColor = "gray";
        task.scheduler.text = `<div><span>Зарезервовано</span></div>`;


    }

    initWeekConfig() {
        this.weekConfig = {
            visible: true,
            viewType: "Week",
            angularAutoApply: true,
            locale: "ru-ru",
            cssClassPrefix: "calendar_black",
            businessBeginsHour: "10",
            businessEndsHour: "19",
            headerHeight: "50",
            cellHeight: "50",
            durationBarVisible: "false",
            columnMarginRight: "0",
            hideUntilInit: true,
            eventMoveHandling: 'Disabled',
            eventResizeHandling: 'Disabled',
            heightSpec: 'BusinessHours'
        };


    }
    iniOnTimeRangeSelect() {
        this.weekConfig.eventResizeHandling= 'Update';
        this.weekConfig.onTimeRangeSelected = (args)=> {


            this.showAppointmentDialog()
        };
    }

    getPictureFlex(index, length) {
        if (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 )) {
            return 46;
        } else {
            return 22;
        }
    }

    showAppointmentDialog() {
        this.appointment.master = this.master;
        this.mdDialog.show( {
            template: appointmentTemplate,
            clickOutsideToClose: true,
            bindToController: true,
            controller: AppointmentDialogController,
            controllerAs: 'vm',
            parent: angular.element( document.body ),

            locals: {
                appointment: this.appointment,
            },
        } ).then( (result) => {
            this.handleDialogResult( result );
        } );
        ;
    }

    handleDialogResult(result) {
        this.$rootScope.loading = true;
        this.appointment.master = this.master;
        this.appointment.favors = this.master.services;
        this.appointment.date = new Date().toJSON();
        this.appointment.$save()
            .then( () => {
                this.mdDialog.hide();
                this.showOrderConfirm();
            } )
            .catch( (err) => {
                this.$log.error( err );
            } )
            .finally( () => {
                this.appointment = new this.AppointmentResource();
                this.$rootScope.loading = false;
            } );

    }

    showOrderConfirm():void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Вашу запис прийнято. ' )
                .textContent( 'З вами зв`яжеться адміністратор для підтвердження. Дякуємо.' )
                .ariaLabel( 'Вашу заявку прийнято. ' )
                .ok( 'Закрити' )
        );

    }

}

export let MasterComponentUrl = "/master/:id";
export let MasterComponentName = 'pgMaster';
export let MasterComponentOptions = {
    template: template,
    controller: MasterComponentController
};
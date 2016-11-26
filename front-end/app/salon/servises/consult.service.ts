/**
 * Created by ostap on 26.11.16.
 */
/**
 * Created by Galyna on 12.11.2016.
 */
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import {IRootScope} from "../../../typings";

const template = `<md-dialog class="appointment-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"
           layout="column">
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2 hide show-gt-sm='true' class=" md-padding ">Записатись на прйом до майстра
                {{::vm.appointment.master.name}}</h2>
            <h2 hide-gt-sm='true' class=" md-padding ">Записатись до {{::vm.appointment.master.name}}</h2>
            <span flex></span>
            <md-button class="md-icon-button dialog-close-btn" ng-click="::vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex ng-submit="::vm.save(orderForm)">
        <md-dialog-content>
            <md-dialog-content-body>
                <div hide show-gt-xs="true">
                    <div layout="row">
                        <md-input-container id="orderName" flex="50">
                            <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                            <label for="name">Як до вас звертатись?</label>
                            <input id="name" ng-model="vm.appointment.name" type="text" name="name" required>
                            <div ng-messages="orderForm.name.$error" role="alert"
                                 ng-show="orderForm.$submitted && orderForm.name.$invalid">
                                <div class="md-headline" ng-message="required">
                                    Залиште хоч якусь інформацію про себе, бажано номер телефону
                                </div>
                            </div>

                        </md-input-container>
                        <md-input-container flex="50">
                            <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                            <label for="phone">Телефон</label>
                            <input id="phone" ng-model="vm.appointment.phone" type="text" name="phone">

                        </md-input-container>
                         <md-input-container class="md-block" >
                        <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                        <label for="comment">Додаткова інформація</label>
                        <textarea id="comment" ng-model="vm.appointment.comment" name="comment"></textarea>
                    </md-input-container>
  
                    </div>

                  
                </div>

            </md-dialog-content-body>
        </md-dialog-content>

        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center">
            <md-button type="submit" class=" xs-selected md-raised md-headline">ЗАПИСАТИСЬ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>

`;

export class AppointmentFormComponentController {

    static $inject = ['$mdDialog'];
    private appointment: IAppointment;
    constructor(private $mdDialog: ng.material.IDialogService) {

    }


    save(orderForm) {

        if (this.appointment.name || this.appointment.comment || this.appointment.phone) {

            this.$mdDialog.hide(this.appointment);
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }

}

//noinspection ReservedWordAsName
export interface IAppointmentService {
    onShowDialog(appointment: IAppointment): void;
}
export let ConsultServiceName = 'consultAppointmentService'
export class ConsultService implements IAppointmentService {

    static $inject = ['$mdDialog', '$rootScope', "$log", '$mdMedia',AppointmentResourceName];

    constructor(private $mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private $log: ng.ILogService, private $mdMedia,private AppointmentResource:IAppointmentResource) {

    }

    onShowDialog() {
        var appointment = new this.AppointmentResource();
        this.$mdDialog.show({
            template: template,
            bindToController: true,
            controller: AppointmentFormComponentController,
            controllerAs: 'vm',
            parent: angular.element(document.querySelector('#mainContent')),
            fullscreen: this.$mdMedia('(max-width: 1360px)'),
            locals: {
                appointment: appointment,
            },
        }).then((result) => {
            this.handleDialogResult(result);
        });
        ;
    }

    handleDialogResult(result: IAppointment) {
        if (result.service) {
            result.favors = [];
            result.favors.push(result.service);
        }
        result.creationDate = new Date().toJSON();
        if (result.date) {
            result.date = new Date(result.date).toJSON();
        }

        result.$save()
            .then(() => {
                this.$mdDialog.hide();
                this.showOrderConfirm();
            })
            .catch((err) => {
                this.$log.error(err);
            })
            .finally(() => {
                this.$rootScope.loading = false;
            });
    }

    showOrderConfirm(): void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу запис прийнято. ')
                .textContent('З вами зв`яжеться адміністратор для підтвердження. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }


}


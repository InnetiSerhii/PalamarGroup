import {IMaster, MasterResourceName, IMasterResource} from "../../../resources/master.resource";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;
import {FavorResourceName, IFavorResource, IFavor} from "../../../resources/favor.resource";
import IMasterFavor = pg.models.IMasterFavor;
import {IAppointment, AppointmentResourceName, IAppointmentResource} from "../../../resources/appointment.resource";
import {IConstants} from "../../../core/core.config";

const template = `<div flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="admin.html#!/salon/masters">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Команда</md-tooltip>
            </md-button>
             <div flex layout="row"  layout-align="  center center "> <img ng-if="$ctrl.master.photo.url" ng-src="{{$ctrl.master.photo.url}}" class="avatar " alt="{{master.name}}" />
                                   <h3 ng-if="$ctrl.master.name">{{$ctrl.master.name}}</h3> </div>
           
            <md-button ng-if="::$root.it.can('modifySalon')" ng-click="$ctrl.cancel()" ng-disabled="saveForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button ng-if="::$root.it.can('modifySalon')" type="submit" ng-click="$ctrl.save(saveForm)"
                       class="md-raised">Зберегти
            </md-button>
        </div>
    </md-toolbar>
    <md-tabs md-stretch-tabs="always" md-dynamic-height>      
        <md-tab flex label="Графік">
            <pg-master-scheduler mode='master' appointment="$ctrl.appointment" masterid="$ctrl.master._id"
                                 mname="$ctrl.master.name" photo="$ctrl.master.photo.url"></pg-master-scheduler>
                                
        </md-tab>
        <md-tab flex label="Інфо">
            <md-card>
                <md-card-content>
                    <md-input-container class="md-block ">
                        <label for="name">Ім'я </label>
                        <input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.master.name"
                               name="name"/>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="rate">Загальний рівень майстра</label>
                        <md-select name="rate" ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.master.rate"
                                   ng-model-options="{trackBy: '$value._id'}">
                            <md-option ng-repeat="rate in $ctrl.rates" ng-value="rate">
                                {{ rate.name }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                     <md-input-container class="md-block">
                        <label for="description">Короткий опис</label>
                        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.master.subtitle"
                                  id="subtitle" name="subtitle" ></textarea>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="description">Про майстра</label>
                        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.master.description"
                                  id="description" name="description" ></textarea>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="order">Порядок відображення</label>
                        <input id="order" ng-disabled="::!$root.it.can('modifySalon')"
                               ng-model="$ctrl.master.order" name="order" type="number"/>
                    </md-input-container>
                    <div>
                        <div class="md-block">
                            <md-subheader class="md-no-sticky">Послуги</md-subheader>
                            <div ng-repeat="service in $ctrl.master.services">
                                <md-divider></md-divider>
                                <div layout="row">
                                    <img ng-src="{{service.favor.photo.url}}" class="md-margin md-padding  avatar"
                                         alt="{{service.favor.name}}"/>
                                    <div class="md-margin md-padding " layout="column" name="program">
                                        <div>Назва</div>
                                        {{service.favor.name}}
                                    </div>
                                    <div class="md-margin md-padding " layout="column">
                                        <div>Ціна</div>
                                        {{service.price}} грн.
                                    </div>
                                   
                                    <div class="md-margin md-padding " layout="column">

                                        <md-button ng-if="::$root.it.can('modifySalon')" class="md-icon-button"
                                                   ng-click="$ctrl.deleteService(service)">
                                            <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                                        </md-button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div ng-if="::$root.it.can('modifySalon')" class="md-block">
                            <md-subheader class="md-no-sticky">Додати послугу
                            </md-subheader>
                            <md-input-container layout="row" class="md-block">
                                <label for="service">Послуга</label>
                                <md-select name="service" ng-model="$ctrl.newService.favor"
                                           ng-model-options="{trackBy: '$value._id'}">
                                    <md-option ng-repeat="favor in $ctrl.favors" ng-value="favor">
                                        {{ favor.name }}
                                    </md-option>
                                </md-select>
                                
                           
                                <md-input-container layout="row" class="md-block">
                                    <label for="price">Ціна</label>
                                    <input name="price" type="number" ng-model="$ctrl.newService.price"/>
                                </md-input-container>
                                <md-input-container class="md-block">
                                    <md-button ng-disabled="!$ctrl.newService" class=" " ng-click="$ctrl.addService()">
                                        Додати
                                    </md-button>
                                </md-input-container>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab flex label="Аватар" flex>
            <md-card>
                <md-card-content  >
                    <div layout="row" >
                     <div >
                        <img ng-src="{{$ctrl.master.photo.url}}" />
                         </div>
                        <div ng-if="::$root.it.can('modifySalon')">
                            <md-button ng-if="!$ctrl.showAuthorPhotoUpload" class="md-raised"
                                       ng-click="$ctrl.showAuthorPhotoUpload=true">
                                Змінити фото
                            </md-button>
                            <div ng-if="$ctrl.showAuthorPhotoUpload" class="md-padding md-margin">
                                <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*" class="md-raised">
                                    Вибрати файл
                                </md-button>
                                <md-button class="md-primary"
                                           ng-click="$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.master)">
                                    Завантажити
                                </md-button>
                                <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                     class="cropArea">
                                    <img-crop area-type="rectangle" result-image-size="{w:500,h:560}" aspect-ratio="0.95"
                                              init-max-area="true"
                                              image="hearFormsPhotoFile  | ngfDataUrl"
                                              result-image="croppedhearFormsPhotoFile"
                                              ng-init="croppedhearFormsPhotoFile=''">
                                    </img-crop>
                                </div>

                            </div>
                        </div>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Роботи">
            <md-card>
                <md-card-content>
                    <div flex>
                        <div class="md-padding md-margin" layout="row"
                             ng-repeat="item in $ctrl.master.works track by $index"
                             ng-click="null">
                            <img ng-src="{{item.url}}" class="module-history-img"/>
                            <div layout="column" ng-if="::$root.it.can('modifySalon')">
                                <md-input-container class="md-block  ">
                                    <label for="historyNme">Назва роботи</label>
                                    <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                </md-input-container>
                                <md-input-container class="md-block  ">
                                    <label for="ord">Порядок відображення</label>
                                    <input id="ord" ng-model="item.order" type="number"/>
                                </md-input-container>
                                <md-button class="  md-raised"
                                           ng-click="$ctrl.deleteFromList($ctrl.master.works ,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div ng-if="::$root.it.can('modifySalon')">
                        <md-button ng-if="!$ctrl.showFormPhotoUpload" class="md-raised"
                                   ng-click="$ctrl.showFormPhotoUpload=true">
                            Додати фото
                        </md-button>
                        <div ng-if="$ctrl.showFormPhotoUpload" class="md-padding md-margin">
                            <md-button ngf-select ng-model="masrerNewWork" accept="image/*" class="md-raised">
                                Вибрати файл
                            </md-button>
                            <md-button class="md-primary" ng-show="masrerNewWork"
                                       ng-click="$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, masrerNewWork.name,$ctrl.master.works)">
                                Завантажити
                            </md-button>
                            <div ngf-drop ng-model="masrerNewWork" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:500,h:500}" aspect-ratio="1"
                                          init-max-area="true"
                                          image="masrerNewWork  | ngfDataUrl"
                                          result-image="croppedhearFormsPhotoFile"
                                          ng-init="croppedhearFormsPhotoFile=''">
                                </img-crop>
                            </div>

                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Відео" flex>
            <md-card>
                <md-card-content layout="row">
                    <div flex="60">
                        <md-subheader class="md-no-sticky">Відео</md-subheader>
                        <div class="md-padding md-margin"
                             ng-repeat="item in $ctrl.master.videos track by $index"
                             ng-click="null">
                            <div class="embed-responsive embed-responsive-16by9">
                                <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                               video-id="item.url"></youtube-video>
                            </div>
                            <div layout="column" ng-if="::$root.it.can('modifySalon')">
                                <md-input-container class="md-block  ">
                                    <label for="historyNme">Назва відео</label>
                                    <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                </md-input-container>
                                 <md-input-container class="md-block  ">
                                    <label for="historyNme">ID</label>
                                    <input id="historyNme" ng-model="item.url" name="historyNme"/>
                                </md-input-container>
                                <md-input-container class="md-block  ">
                                    <label for="ord">Порядок відображення</label>
                                    <input id="ord" ng-model="item.order" type="number"/>
                                </md-input-container>
                                <md-button class="  md-raised"
                                           ng-click="$ctrl.deleteFromList($ctrl.master.videos,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div flex ng-if="::$root.it.can('modifySalon')">
                        <md-input-container class="md-block  ">
                            <label for="videoId">ID</label>
                            <input id="videoId" ng-model="videoId" name="videoId"/>
                        </md-input-container>
                        <md-button class="md-raised" ng-if="::$root.it.can('modifySalon')"
                                   ng-click="$ctrl.addVideo(videoId)">
                            Додати відео
                        </md-button>

                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
    </md-tabs>
</div>`;

export class MasterComponentController {
    static $inject = ["$log", "$routeParams", "$mdToast",
        "$timeout", PhotoServiceName, MasterResourceName,
        "Upload", FavorResourceName, '$mdDialog', AppointmentResourceName, 'constants'];

    originalMaster: IMaster;
    master: IMaster;
    showPhotoUpload: boolean;
    showWorkUpload: boolean;
    favors: IFavor[];
    newService: IMasterFavor;
    appointment: IAppointment;

    rates: any[];

    constructor(private $log: ng.ILogService, private $routeParams: ng.route.IRouteParamsService,
                private $mdToast: ng.material.IToastService, private $timeout: ng.ITimeoutService,
                private photoService: PhotoService, private MasterResource: IMasterResource,
                private Upload: ng.angularFileUpload.IUploadService, private favorResource: IFavorResource,
                private $mdDialog: ng.material.IDialogService, private AppointmentResource: IAppointmentResource,
                private constants: IConstants) {
    }

    $onInit() {

        this.rates = this.constants.rates;
        this.favors = this.favorResource.query();
        this.appointment = new this.AppointmentResource();
        if (this.$routeParams["id"]) {
            this.MasterResource.get({id: this.$routeParams["id"], populate: 'services.favor'}).$promise
                .then((master) => {
                    this.originalMaster = master;
                    this.master = angular.copy(this.originalMaster);
                }).catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
        } else {
            this.originalMaster = new this.MasterResource();
            this.master = angular.copy(this.originalMaster);
        }
    }


    cancel() {
        this.master = angular.copy(this.originalMaster);
    }

    save() {

        this.master.$save({populate: 'services.favor'})
            .then((master) => {
                this.$mdToast.showSimple(`Дані майстра збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
    }

    deletePhoto() {
        this.master.photo.url = "";
    }

    deleteService(service) {
        this.deleteFromList(this.master.services, service);
    }

    addService() {

        if (this.newService) {
            if (!this.newService.price) {
                this.newService.price = this.newService.favor.defPrice;
            }

            if (this.master.services.some((ser)=> {
                    return ser.favor._id == this.newService.favor._id
                })) {
                this.$mdToast.showSimple(`Така Послуга вже існує`);
                return;
            }
            this.master.services.push(this.newService);
            this.newService = null;
        }
    }

    addVideo(id) {
        if (!this.master.videos) {
            this.master.videos = [];
        }
        this.master.videos.push({
            name: "",
            url: id,
            order: 0
        });
        this.master.$save()
            .then((course) => {
                this.$mdToast.showSimple(`майстра ${course.name} збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
    }

    uploadPhoto(dataUrl, name, model) {
        this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name))
            .then((url)=> {
                model.photo = {
                    url: url
                }
            }).catch((err)=> {
            this.$log.error(err);
            this.showErrorDialog();
        }).finally(() => {
            this.$timeout(() => {
                this.showPhotoUpload = false;
            });
        });
    };

    uploadCollPhoto(dataUrl, name) {
        if (!this.master._id) {
            this.master.$save({populate: 'services.favor'})
                .then((master) => {
                    this.$mdToast.showSimple(`Дані майстра збережено`);

                    this.photoSave(dataUrl, name, this.master.works);
                })
                .catch((err)=> {
                    this.$log.error(err);
                    this.showErrorDialog();
                });

        } else {
            this.photoSave(dataUrl, name, this.master.works)
        }
    }

    photoSave(dataUrl, name, collection: IPhoto[]) {
        this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name)).then((url)=> {
            collection.push({
                name: "",
                url: url,
                order: 0
            });
        }).catch((err)=> {
            this.$log.error(err);
            this.showErrorDialog();
        }).finally(()=> {
            this.showWorkUpload = false;
        });
    }

    deleteFromList(list: any[], item: any) {
        list.splice(list.indexOf(item), 1);
    }


    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }


}

export let MasterComponentUrl = "/salon/master/:id?";
export let MasterComponentName = "pgMaster";
export let MasterComponentOptions = {
    template: template,
    controller: MasterComponentController
};
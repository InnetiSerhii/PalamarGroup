/// <reference path="../typings/index.d.ts" />
/// <reference path="../typings/browser.extensions.d.ts" />
/// <reference path="../typings/shared.d.ts" />

export interface IRootScope extends ng.IRootScopeService {
    loading:boolean;
    isAdminZone:() => boolean;
    socialParams:{
        host:string,
        target:string,
        title:string,
        image:string,
        description:string};
}

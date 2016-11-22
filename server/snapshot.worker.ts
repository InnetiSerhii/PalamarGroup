/**
 * Created by Galyna on 22.11.2016.
 */
import {Course} from "./models/course";
import {Master} from "./models/master";
import {Favor} from "./models/favor";
import {config} from "./config";
var htmlSnapshots = require('html-snapshots');
let schedule = require('node-schedule');
let path = require('path');
let sm = require('sitemap');
let fs = require('fs');
import * as mongoose from 'mongoose';

var pages = [
    {
        url: "/",
        description: "",
        name: "home",
        text: "Головна",
        title: "PALAMAR GROUP beauty parlour & academy Головна сторінка"
    },
    {
        url: "/beauty-parlour/services",
        description: "",
        name: "services",
        text: "Послуги",
        title: "PALAMAR GROUP beauty parlour & academy Послуги"
    },
    {
        url: "/beauty-parlour/masters",
        description: "",
        name: "masters",
        text: "Майстри",
        title: "PALAMAR GROUP beauty parlour & academy Майстри"
    },
    {
        url: "/beauty-parlour/transformations",
        description: "",
        name: "transforms",
        text: "Перевтіленні",
        title: "PALAMAR GROUP beauty parlour & academy Перевтілення"
    },
    {
        url: "/beauty-parlour/products",
        description: "",
        name: "products",
        text: "Продікція",
        title: "PALAMAR GROUP beauty parlour & academy Продікція"
    },
    {
        url: "/beauty-parlour/contacts",
        description: "",
        name: "salon.contacts",
        text: "Контакти салону",
        title: "PALAMAR GROUP beauty parlour & academy Контакти салону"
    },
    {
        url: "/services/hairdressing",
        description: "",
        name: "hairdressing",
        text: "Перукарські послуги",
        title: "PALAMAR GROUP beauty parlour & academy Перукарські послуги"
    },
    {
        url: "/services/nail-aesthetics",
        description: "",
        name: "nail-aesthetics",
        text: "Нігтьва естетика",
        title: "PALAMAR GROUP beauty parlour & academy Нігтьва естетика"
    },
    {
        url: "/services/makeup",
        description: "",
        name: "makeup",
        text: "Візаж",
        title: "PALAMAR GROUP beauty parlour & academy Візаж"
    },
    {
        url: "/academy",
        description: "",
        name: "academy",
        text: "Академія курси",
        title: "PALAMAR GROUP beauty parlour & academy Програма навчання"
    },
    {
        url: "/academy/calendar",
        description: "",
        name: "calendar",
        text: "Академія календар",
        title: "PALAMAR GROUP beauty parlour & academy Календар навчання"
    },
    {
        url: "/academy/videos",
        description: "",
        name: "video",
        text: "Академія відео",
        title: "PALAMAR GROUP beauty parlour & academy Академія Відео"
    },
    {
        url: "/academy/contacts",
        description: "",
        name: "academy.contacts",
        text: "Академія контакти",
        title: "PALAMAR GROUP beauty parlour & academy Академія контакти"
    }];

function saveSnapshots() {
    return new Promise((resolve, reject)=> {
        console.log("saveSnapshots start " + new Date().toTimeString());

        var result = htmlSnapshots.run({
            input: "sitemap",
            port: "8080",
            source: path.resolve('../front-end/dist/sitemap.xml'),
            phantomjsOptions: ["--ignore-ssl-errors=true"],
            outputDir: './snapshots',
            selector: "#dynamic-content",
            processLimit: 1,

        }, function (err, snapshotsCompleted) {
            console.log("snapshots generution finished at" + new Date().toTimeString())
            console.log(snapshotsCompleted.join(','));
            resolve();
        });

    })

}

function addCollection(courses, urls, reletivePath) {
    courses.forEach((p)=> {
        urls.push({url: reletivePath + p._id, priority: 0.6})
    });
}

async function saveSitemap() {
    var urls = pages.map((p)=> {
        return {url: p.url, priority: 0.8};
    });
    console.log("startMakeSnapshots");
    let courses = await Course.find().exec();
    addCollection(courses, urls, "/academy/course/");

    let masters = await  Master.find().exec();

    addCollection(masters, urls, "/beauty-parlour/master/");
    let favors = await  Favor.find().exec();

    addCollection(favors, urls, "/beauty-parlour/service/");

    var sitemap = sm.createSitemap({
        hostname: config.origin,
        cacheTime: 600000,  //600 sec (10 min) cache purge period,
        urls: urls
    });

    fs.writeFileSync(path.resolve('../front-end/dist/sitemap.xml'), sitemap.toString());
    return await saveSnapshots();
}



schedule.scheduleJob({
    hour: 23,
    minute:20
}, ()=> {
    mongoose.connect(config.mongoUrl, ()=>{
        saveSitemap().then(()=>{
            console.log('complete');
        }).catch(err=>{
            console.error(err);
        });
    });
});
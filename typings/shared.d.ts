declare module pg {
    module models {
        
        export interface IContact {
            _id?: any;
            name:string,
            email:string,
            phone:string,
            photo:string,
            address:string,
            isAcademy:boolean
        }

        export interface IVideo {
            _id?: any;
            name: string,
            url: string,
            order: number
        }

        export interface IPhoto {
            _id?: any;
            name: string,
            url: string,
            order: number
        }

        export interface ICourse {
            _id?: any;
            name: string,
            description: string,
            price: number,
            order: number,
            videos: IVideo[],
            hearFormsPhotos: IPhoto[],
            historyPhotos: IPhoto[],
            author: {
                name: string,
                photoUrl: string
            },
            courseModulesDates: string[],
            isVisible: boolean
        }

        export interface IOrder{
            _id?: any;
            name: string,
            phone: string,
            email: string,
            date: string,
            comment:string,
            admin_comment:string,
            event_id: string,
            answered: boolean,
            booked: boolean
        }

        export interface IUser {
            _id?: any;
            email: string,
            password: string,
            roles: string[]
        }

        export interface IModel {
            _id?: any;
            name: String,
            phone: String,
            email: String,
            address: String,
            fasPhotoUrl:String,
            profilePhotoUrl:String,
            backPhotoUrl:String,
            fullSizePhotoUrl:String,
        }

        export interface ISalonClient {
            _id?: any;
            name: String,
            phone: String,
            email: String,
            address: String,
        }

        export interface IComment {
            _id?: any;
            name: String,
            text: String,
            isVisible: boolean,
            answered: boolean
        }
    }
}


export interface IUser {
email: string;
name: string;
password: string;

}

export interface IColor {
name: string;
id: string;
code: string;

}

export interface IIcon {
    name: string;
    id: string;
    symbol: string;
}

export interface ICategory {
_id: string
name: string;
user: IUser | String;
isEditable: boolean;
color:  IColor
icon: IIcon

}

export interface ITask {
    _id: string;
    name: string;
    categoryId: String;
    user: String;
    isCompleted: boolean;
    isEditable: boolean;
    date: String;
    createdAt: String;
    updatedAt: String;


}


export default IUser;
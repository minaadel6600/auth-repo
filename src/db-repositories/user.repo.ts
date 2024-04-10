import  userModel, { IUser } from "../models/user.model";
import GenericRepository from "./base.repo";


export class UserRepository extends GenericRepository<IUser>{

    constructor() {
        super(userModel);
        
    }
}
import { Request } from 'express';
import DecodedUser from './i-decoded-user';
import { IUser, role } from '../models/user.model';

 
export default interface IRequest extends Request { 
    
    user?: {_id:string,roles:[role]};
    lang?: string
}

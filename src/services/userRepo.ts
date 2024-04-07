import { Model } from 'mongoose';
import userModel, { IUser } from '../models/user.model'
import DbServices from './db.service';
// now, we have all code implementation from BaseRepository
export class GenericRepository<T> {

    public _model: any;
    
    constructor(model: any) {
        this._model = model;
    }

    public async Create(item: T) {
        return await this._model.create(item);
    }

    public async findOne(filter:Object) {
        return await this._model.findOne(filter)
    }


}

export default GenericRepository;
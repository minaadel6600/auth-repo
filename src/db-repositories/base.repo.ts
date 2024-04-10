import { Model } from 'mongoose';
import userModel, { IUser } from '../models/user.model' 


export class GenericRepository<T> {

    public _model: any;
    
    constructor(model: any) {
        this._model = model;
    }

    public async getAll() {
        return await this._model.find()
    }
    public async getByID(id:string): Promise<T>{
        return await this._model.findById(id)
    }
    public async findOne(filter:Object) {
        return await this._model.findOne(filter)
    }
    public async Create(item: T) {
        return await this._model.create(item);
    }
}

export default GenericRepository;
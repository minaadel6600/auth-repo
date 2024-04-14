import { Model } from "mongoose";
import userModel, { IUser } from "../models/user.model";

export class GenericRepository<T> {
  public _model: any;

  constructor(model: any) {
    this._model = model;
  }

  public async getAll(): Promise<T[]> {
    return await this._model.find();
  }
  public async getById(id: string): Promise<T> {
    return await this._model.findById(id);
  }
  public async getOne(filter: Object): Promise<T> {
    return await this._model.findOne(filter);
  }
  public async search(filter: Object): Promise<T[]> {
    return await this._model.find(filter);
  }
  public async Create(item: T) {
    return await this._model.create(item);
  }
  public async UpdateById(id: string, data: T) {
    return await this._model.findByIdAndUpdate(id, data ,{new: true});
  }
  public async DeleteById(id: string) {
    return await this._model.findByIdAndDelete(id);
  }
}

export default GenericRepository;

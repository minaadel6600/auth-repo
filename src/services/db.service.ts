import { Document, Model, Models } from "mongoose";
import HttpError from "../models/error.model";
import IDbServices from "./db.services.interface";
import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';



class DbServices<T> implements IDbServices<T>{
    //creating a property to use your code in all instances 
    // that extends your base repository and reuse on methods of class
    public readonly _collection: T;

    //we created constructor with arguments to manipulate mongodb operations
    constructor(db: T, collectionName: string) {
        this._collection = db;
    }
    getById(): T {
        throw new Error("Method not implemented.");
    }
    post(item: T): T {
        throw new Error("Method not implemented.");
    }

    getAll(): T[] {
        throw new Error("Method not implemented.");
    }
 
  // we add to method, the async keyword to manipulate the insert result
  // of method.
  async create(item: T  ): Promise<InsertOneResult> {
    const result= await (this._collection as Collection).insertOne(item as Document);
    // after the insert operations, we returns only ok property (that haves a 1 or 0 results)
    // and we convert to boolean result (0 false, 1 true)
    return result;
  }
    update(item: T) {
        return item;
    }

}

export default DbServices;
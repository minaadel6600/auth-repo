interface IDbServices<T>{
    getAll(): T[];
    getById(): T;
    post(item:T): T;
    update(item:T):T;
}

export default IDbServices;
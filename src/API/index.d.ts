import youPai from './youPai';
interface gameBox {
    getDeviceId(): string;
}

declare namespace API {
    let yp: youPai;
    let box: gameBox;
}

export = API;
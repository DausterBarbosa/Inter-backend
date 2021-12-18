import {encode, decode} from "js-base64";

class Pix{
    encodeKey(userID:string, value:number, registerID:string){
        const part1 = encode(userID);
        const part2 = encode(value.toString());
        const part3 = encode(registerID);

        return `${part1}-${part2}-${part3}`;
    }

    decodeKey(key:string){
        const decodeKey = key.split("-");

        const userId = decode(decodeKey[0]);
        const value = decode(decodeKey[1]);
        const registerID = decode(decodeKey[2]);

        return {
            userId,
            value,
            registerID,
        };
    }
}

export default new Pix();
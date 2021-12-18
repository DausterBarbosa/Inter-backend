import {getRepository} from "typeorm";

import Pix from "../../database/entity/Pix";
import User from "../../database/entity/User";

import AppError from "../../shared/error/AppError";

import pix from "../../utils/pix";

class PixService{
    async request(value:number, user:Partial<User>){
        const pixRepository = getRepository(Pix);
        const userRepository = getRepository(User);

        const currentUser = await userRepository.findOne({where:{id: user.id}});

        const requestData = {
            requestingUser: currentUser,
            value,
            status: "open",
        };

        const register = await pixRepository.save(requestData);

        const key = pix.encodeKey(user.id || "", value, register.id);

        return key;
    }

    async pay(key:string, user:Partial<User>){
        try {
            var keyDecoded = pix.decodeKey(key);
        } catch (error) {
            throw new AppError("Chave inválida!", 401);
        }

        if(keyDecoded.userId === user.id){
            throw new AppError("Não é possível receber o PIX do mesmo usuário", 401);
        }

        const pixRepository = getRepository(Pix);
        const userRepository = getRepository(User);

        const requestingUser = await userRepository.findOne({where: {id: keyDecoded.userId}});
        const payingUser = await userRepository.findOne({where: {id: user.id}});

        if(payingUser.wallet < Number(keyDecoded.value)){
            throw new AppError("Não há saldo suficiente para realizar o pagamento", 401);
        }

        if(!requestingUser || !payingUser){
            throw new AppError("Não encontramos os clientes da transação, gere uma nova chave", 401);
        }

        requestingUser.wallet = Number(requestingUser.wallet) + Number(keyDecoded.value);
        await userRepository.save(requestingUser);

        payingUser.wallet = Number(payingUser.wallet) - Number(keyDecoded.value);
        await userRepository.save(payingUser);

        const pixTransaction = await pixRepository.findOne({where:{id: keyDecoded.registerID, status: "open"}});

        if(!pixTransaction){
            throw new AppError("Chave inválida para pagamento", 401);
        }

        pixTransaction.status = "close";
        pixTransaction.payingUser = payingUser;

        await pixRepository.save(pixTransaction);

        return {message: "Pagamento efetuado com sucesso"};
    }

    async transactions(user: Partial<User>){
        const pixRepository = getRepository(Pix);

        const pixReceived = await (await pixRepository.find({where:{
            requestingUser: user.id,
            status: "close",
        },
            relations: ["payingUser"],
        }));

        const pixPaying = await pixRepository.find({where:{
            payingUser: user.id,
            status: "close",
        },
            relations: ["requestingUser"],
        });

        const received = pixReceived.map(transactions => ({
            value: transactions.value,
            user: {
                firstname: transactions.payingUser.firstName,
                lastname: transactions.payingUser.lastName,
            },
            updatedAt: transactions.updatedAt,
            type: "received"
        }));

        const paying = pixPaying.map(transactions => ({
            value: transactions.value,
            user: {
                firstname: transactions.requestingUser.firstName,
                lastname: transactions.requestingUser.lastName,
            },
            updatedAt: transactions.updatedAt,
            type: "paid"
        }));

        const allTransactions = received.concat(paying);

        allTransactions.sort(function(a, b){
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();

            return dateA  < dateB ? 1 : -1;
        });
        
        return allTransactions;
    }
}

export default PixService;
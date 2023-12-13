const {
    Client,
    Hbar,
    TokenCreateTransaction,
    TokenAssociateTransaction,
    PrivateKey,
    TransferTransaction,
    AccountBalanceQuery,
    TokenId
} = require("@hashgraph/sdk");

require("dotenv").config();

async function main() {
    const operatorKey = process.env.MY_PRIVATE_KEY;
    const operatorId = process.env.MY_ACCOUNT_ID;
    let client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    // var createTokenTx = await new TokenCreateTransaction()
    //     .setTokenName('CHEETHTOKENS')
    //     .setTokenSymbol('CTOKENS')
    //     .setDecimals(0)
    //     .setInitialSupply(500000000000)
    //     .setTreasuryAccountId(operatorId)
    //     .execute(client)
    // var createReceopt = await createTokenTx.getReceipt(client);
    // var newTokenid = createReceopt.tokenId;
    const existingTokenId = TokenId.fromString(process.env.TOKEND_ID);
    console.log(existingTokenId.toString())

    const account2Id = process.env.MY_ACCOUNT_ID2;
    const account2Key = process.env.MY_PRIVATE_KEY2;

    // <<<< ASOCIAR TOKEN ID A CUENTA 2 >>>>>>
    // const associateTx = await new TokenAssociateTransaction()
    //     .setAccountId(account2Id)
    //     .setTokenIds([newTokenid])
    //     .freezeWith(client)
    //     .sign(PrivateKey.fromString(account2Key))

    // // console.log('TOKEN ID : ', newTokenid.toString())
    // console.log('TOKEN ID EXISTING: ', newTokenid.toString())

    // var submitAssociateTx = await associateTx.execute(client)

    // var associateReceipt = await submitAssociateTx.getReceipt(client)
    // <<<< ASOCIAR TOKEN ID A CUENTA 2 >>>>>>

    var transferTx = await new TransferTransaction()
        .addTokenTransfer(existingTokenId, operatorId, -20)
        .addTokenTransfer(existingTokenId, account2Id, 20)
        .execute(client);

    var transferReceipt = await transferTx.getReceipt(client)

    console.log('Transferencia: ', transferReceipt)

    var accountBalance = await new AccountBalanceQuery().setAccountId(operatorId).execute(client);
    var account2Balance = await new AccountBalanceQuery().setAccountId(account2Id).execute(client);

    // Acceder al mapa subyacente
    const tokenBalanceMap = accountBalance.tokens._map;
    const tokenBalanceMap2 = account2Balance.tokens._map;

    // Iterar sobre el mapa
    for (const [tokenId, balance] of tokenBalanceMap) {
        if (tokenId == existingTokenId) {
            console.log('Balance player.b.96@hotmail.com :', balance.toString());
        }

    }
    for (const [tokenId, balance] of tokenBalanceMap2) {
        if (tokenId == existingTokenId) {
            console.log('Balance player.b.1996@gmail.com :', balance.toString());
        }

    }

    // console.log('Balance de Cuenta en player.b.96@hotmail.com : ', accountBalance.tokens.toString())
}
main();

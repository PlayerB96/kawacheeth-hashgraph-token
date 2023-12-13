const {
    Client,
    Hbar,
    TokenCreateTransaction,
} = require("@hashgraph/sdk");

require("dotenv").config();

async function main() {
    const operatorKey = process.env.MY_PRIVATE_KEY;
    const operatorId = process.env.MY_ACCOUNT_ID;
    let client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    var createTokenTx = await new TokenCreateTransaction()
        .setTokenName('EXAMPLE 1 BRYAN')
        .setTokenSymbol('CTOKENS')
        .setDecimals(0)
        .setInitialSupply(100)
        .setTreasuryAccountId(operatorId)
        .execute(client)

    var createReceopt = await createTokenTx.getReceipt(client);
    var newTokenid = createReceopt.tokenId;
    console.log(newTokenid.toString())
}
main();

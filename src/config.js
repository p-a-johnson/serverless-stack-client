export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "eu-west-1",
        BUCKET: "notes-app-pj-api-dev-attachmentsbucket-13di03e14fjbm"
    },
    apiGateway: {
        REGION: "eu-west-1",
        URL: "https://hloiv17rd6.execute-api.eu-west-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_aY2u0PJ4H",
        APP_CLIENT_ID: "7u4j7p85ad4m5mfttiabmgch7f",
        IDENTITY_POOL_ID: "eu-west-1:064aed20-faef-4db0-8e69-2178831313da"
    }
};

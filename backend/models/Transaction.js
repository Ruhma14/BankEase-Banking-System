// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//     {
//         accountId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Account",
//             required: true
//         },

//         type: {
//             type: String,
//             enum: ["deposit", "withdraw"],
//             required: true
//         },

//         amount: {
//             type: Number,
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model(
//     "Transaction",
//     transactionSchema
// );

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },

        type: {
            type: String,
            enum: ["deposit", "withdraw"],
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);
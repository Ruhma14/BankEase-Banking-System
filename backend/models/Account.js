// const mongoose = require("mongoose");

// const accountSchema = new mongoose.Schema(
//     {
//         accountHolder: {
//             type: String,
//             required: true,
//             default: "Demo User"
//         },

//         balance: {
//             type: Number,
//             default: 0
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model("Account", accountSchema);

const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        accountHolder: {
            type: String,
            required: true,
            default: "Demo User"
        },

        balance: {
            type: Number,
            default: 0,
            min: 0
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Account", accountSchema);
/**
 * coinflip - A CLI app for gambling imaginary FlipCoins on the outcome of a coin flip.
 */
import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import sqlite3 from "sqlite3";
import ora from "ora";
class Database {
    db;
    constructor() {
        this.db = new sqlite3.Database("coinflip.db");
    }
    async initialize() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(`CREATE TABLE IF NOT EXISTS wallet (balance INTEGER)`, (err) => {
                    if (err)
                        return reject(err);
                });
                this.db.get(`SELECT balance FROM wallet`, (err, row) => {
                    if (err)
                        return reject(err);
                    if (!row) {
                        console.log(chalk.magenta("It looks like you don't have any balance, but don't worry, our LEGAL bank has decided to give you 1000 completely LEGAL FlipCoins to get you started. Enjoy!"));
                        this.db.run(`INSERT INTO wallet (balance) VALUES (?)`, [1000], (err) => {
                            if (err)
                                return reject(err);
                            resolve();
                        });
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    async getBalance() {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT balance FROM wallet`, (err, row) => {
                if (err)
                    return reject(err);
                resolve(row.balance);
            });
        });
    }
    async updateBalance(amount) {
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE wallet SET balance = ?`, [amount], (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
function randomIntIncl(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var CoinSide;
(function (CoinSide) {
    CoinSide[CoinSide["HEADS"] = 0] = "HEADS";
    CoinSide[CoinSide["TAILS"] = 1] = "TAILS";
})(CoinSide || (CoinSide = {}));
var Faq;
(function (Faq) {
    Faq["REAL"] = "Is the gambling real?";
    Faq["TRUST"] = "Can I trust you?";
    Faq["WIN"] = "What happens if I win?";
    Faq["MONEY"] = "How can you afford this?";
    Faq["QUIT"] = "Quit";
})(Faq || (Faq = {}));
function coinSideToString(side) {
    return side === CoinSide.HEADS ? "heads" : "tails";
}
function flipCoin() {
    return Math.random() < 0.5 ? CoinSide.HEADS : CoinSide.TAILS;
}
async function getExtraBalance() {
    const balance = await db.getBalance();
    if (balance != 0)
        return;
    console.log(chalk.magenta("It looks like you have gambled all of the LEGAL FlipCoins we gave you."));
    const { form } = await inquirer.prompt([
        {
            type: "confirm",
            name: "form",
            message: "Would you like to send an application form to our LEGAL bank for more LEGAL FlipCoins?",
            default: true
        }
    ]);
    if (form) {
        const spinner = ora("Submitting your application...").start();
        await new Promise((resolve) => setTimeout(resolve, randomIntIncl(1000, 2500)));
        spinner.text = "Our team is hardly working on your application...";
        await new Promise((resolve) => setTimeout(resolve, randomIntIncl(3500, 4000)));
        spinner.succeed("Application submitted successfully!");
        await db.updateBalance(1000);
    }
    else {
        console.log(chalk.yellow("Okay, maybe you will change your mind next time!"));
    }
}
const COIN = "FlipCoin";
let db;
async function main() {
    db = new Database();
    await db.initialize();
    await getExtraBalance();
    program.name("coinflip").description("A CLI app for gambling imaginary FlipCoins on the outcome of a coin flip.").version("1.0.0");
    // Balance command - show the current balance
    program
        .command("balance")
        .description("Show the current balance")
        .action(() => {
        console.log(chalk.yellow("Fetching balance..."));
        db.getBalance().then((balance) => {
            console.log(chalk.green(`Your current balance is: ${balance} ${COIN}s`));
        });
    });
    // Bet command - bet a certain amount of FlipCoins on the outcome of a coin flip
    program
        .command("bet")
        .description("Bet a certain amount of FlipCoins on the outcome of a coin flip")
        .option("-s, --side <side>", "Heads or tails, h/t for short")
        .option("-a, --amount <amount>", "Amount to bet")
        .action(async (options) => {
        let betAmount;
        const balance = await db.getBalance();
        let amount = options.amount;
        if (!amount || isNaN((betAmount = parseInt(amount))) || betAmount <= 0 || betAmount > balance) {
            const answers = await inquirer.prompt([
                {
                    type: "number",
                    name: "amount",
                    message: `Enter your bet amount (range 1-${balance} ${COIN}s):`,
                    validate: (input) => (input !== undefined && input > 0 && input <= balance) ||
                        `Please enter a valid bet amount.(range 1-${balance} ${COIN}s)`
                }
            ]);
            betAmount = answers.amount;
        }
        let sideOption = options.side?.toLowerCase();
        let side;
        if (sideOption == "heads" || sideOption == "h")
            side = CoinSide.HEADS;
        else if (sideOption == "tails" || sideOption == "t")
            side = CoinSide.TAILS;
        else
            side = undefined;
        if (side === undefined) {
            const answers = await inquirer.prompt({
                type: "list",
                name: "side",
                message: "Choose heads or tails:",
                choices: [
                    { name: "heads", value: CoinSide.HEADS },
                    { name: "tails", value: CoinSide.TAILS }
                ]
            });
            side = answers.side;
        }
        const result = flipCoin();
        if (result === side) {
            console.log(chalk.green(`The coin landed on ${coinSideToString(result)}. You won extra ${betAmount} ${COIN}s!`));
            await db.updateBalance(balance + betAmount);
        }
        else {
            console.log(chalk.red(`The coin landed on ${coinSideToString(result)}. You lost your ${betAmount} ${COIN}s!`));
            await db.updateBalance(balance - betAmount);
        }
    });
    // FAQ command - show frequently asked questions that shouldn't been asked
    program
        .command("faq")
        .description("Show frequently asked questions")
        .action(async () => {
        const { isSure } = await inquirer.prompt([
            {
                type: "confirm",
                name: "isSure",
                message: "Are you sure you want to see the FAQ? It's not really recommended.",
                default: false
            }
        ]);
        if (!isSure) {
            console.log(chalk.yellow("Sure, this is the only wise choice here. Goodbye!"));
            return;
        }
        const spinner = ora("Fetching frequently asked questions...").start();
        await new Promise((resolve) => setTimeout(resolve, randomIntIncl(1500, 2000)));
        spinner.succeed("Fetched frequently asked questions successfully!");
        async function faqSelectLoop() {
            const { faq } = await inquirer.prompt([
                {
                    type: "select",
                    name: "faq",
                    message: "Choose a question to see the answer:",
                    choices: [Faq.REAL, Faq.TRUST, Faq.WIN, Faq.MONEY, Faq.QUIT]
                }
            ]);
            switch (faq) {
                case Faq.REAL:
                    console.log(chalk.cyan("A: No, not for you. Your actions are just privately transmitted through the dark side of the internet (you'd be right, if you guessed Tor, that's why everything is so slow) and some random people are forced to follow your actions, if they do not, we all know, what will happen to them."));
                    break;
                case Faq.TRUST:
                    console.log(chalk.cyan("A: If you trust tech companies, that are potentially selling your data, I don't see a problem to trust us."));
                    break;
                case Faq.WIN:
                    console.log(chalk.cyan("A: If you win, you get money, if you lose, you get nothing. I don't see any problem in here."));
                    break;
                case Faq.MONEY:
                    console.log(chalk.cyan("A: Haven't you ever heard of not asking questions that you don't want answered? No? Okay. So, let's just say we have our ways. It involves a lot of magic and maybe, just maybe, some questionable ethics."));
                    break;
                case Faq.QUIT:
                    console.log(chalk.yellow("Sure, this is the only wise choice here. Goodbye!"));
                    return;
            }
            const { againOrQuit } = await inquirer.prompt([
                {
                    type: "list",
                    name: "againOrQuit",
                    message: "Do you want to go back to the FAQ?",
                    choices: [
                        { name: "Go back", value: true },
                        { name: "Quit", value: false }
                    ]
                }
            ]);
            if (!againOrQuit) {
                console.log(chalk.yellow("Sure, this is the only wise choice here. Goodbye!"));
                return;
            }
            await faqSelectLoop();
        }
        await faqSelectLoop();
    });
    // Flip command - flip a coin and show the result, without betting any FlipCoins
    program
        .command("flip")
        .description("Flip a coin and show the result, without betting any FlipCoins")
        .action(() => {
        const result = flipCoin();
        console.log(chalk.blue(`The coin landed on ${coinSideToString(result)}.`));
    });
    program.parse(process.argv);
}
process.on("uncaughtException", (err) => {
    if (err instanceof Error) {
        if (err.name === "ExitPromptError" && err.message === "User force closed the prompt with SIGINT") {
            console.log(chalk.red("\nProcess interrupted by user! So you are scared now, huh?"));
            process.exit(0);
        }
    }
    else {
        console.error(chalk.red("An unexpected error occurred:", err));
        process.exit(1);
    }
});
main();

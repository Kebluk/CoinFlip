# 🪙 CoinFlip

CLI app made in TS for gambling imaginary FlipCoins on the outcome of a coin flip.

## ⚠️ REMINDER

This CLI app doesn't do anything wrong or questionable, it's just for fun. See the source code, if you don't believe me. Just don't report me to the FBI or Government, please. 😅

## 🎬 Demo

Check out the demo video to see the CoinFlip in action: **[Demo video](CoinFlip-Demo.mp4)**. It contains spoilers, so use wisely! Also you have to explore the FAQ on your on, it's not included in here.

## 📋 Features

-   **Balance storage**: Check your FlipCoin balance thanks to a local SQLite database
-   **Betting system**: Bet your FlipCoins on heads or tails
-   **Bonus for newbies**: Receive 1000 FlipCoins to begin with, as a courtesy of our "LEGAL" bank
-   **Extra money**: Request an application for more FlipCoins if you ran out of them
-   **Bet-less flip**: Just flip the coin without any bets
-   **FAQ**: Access our frequently asked questions (proceed at your own risk)
-   **Colorful interface**: Colors were implemented for the console output for better readability

## 🛠️ Requirements

-   **Node.js** (version 14 or higher is recommended)
-   **npm** (for package management)

## 📦 Dependencies

They will install automatically

-   `commander`
-   `inquirer`
-   `chalk`
-   `sqlite3`
-   `ora`

## 🚀 Installation

There are various ways you can run CoinFlip
Due to the issues with compilation there isn't available any standalone executable
It's also listed on npm, see https://www.npmjs.com/package/@kebluk/coinflip

### Option 1: From source

1. **Clone the repo:**

```bash
git clone https://github.com/Kebluk/coinflip.git
cd coinflip
```

2. **Install required dependencies:**

```bash
npm install
```

3. **Compile TS into JS:**

```bash
npm run build
```

or

```bash
tsc
```

4. **Run the app:**

```bash
node dist/index.js [command]
```

### Option 2: Pre-compiled

-   If there's a `dist` folder with the precompiled JavaScript:

1. **Download/clone the repo:**

```bash
git clone https://github.com/Kebluk/coinflip.git
cd coinflip
```

2. **Install required dependencies:**

```bash
npm install
```

3. **Run the app**

```bash
node dist/index.js [command]

```

## 📚 Usage

A guide how to use each command properly.
If you forget to specify a subcommand you will be given full help page
If you forget to specify any required parameters, you will be asked to fulfill them immediately.

### `balance` - Check you balance

```bash
node dist/index.js balance
```

### `bet` - Bet your FlipCoins

```bash
node dist/index.js bet --side heads --amount 100

# Short form:
node dist/index.js bet -s t -amount 50
```

### `flip` - Just flip the coin

```bash
node dist/index.js flip
```

### `faq` - Shows the Frequently Asked Questions

```bash
node dist/index.js faq
```

## 📄 License

This project is licensed under the **GNU General Public License v3.0**.
See [LICENSE.txt](LICENSE.txt) or visit [https://www.gnu.org/licenses/gpl-3.0.txt](https://www.gnu.org/licenses/gpl-3.0.txt) for more details.

## 🤝 Contributing

There isn't currently a way to contribute directly on the source code itself.
But you are welcome to report any issues, suggest new features or improvements. Just make sure that your contribution follows the harmless but funny spirit of the app.

## 🎯 Disclaimer

This is just a simulation game. It is using imaginary currency, so nor real money is involved. It was made just for fun purposes. Any similarity to real gambling is purely coincidental and should not be taken seriously!

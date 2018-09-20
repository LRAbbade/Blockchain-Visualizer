var blockexplorer = require('blockchain.info/blockexplorer')

blockexplorer.getLatestBlock().then((data) => {
    console.log(data);
});
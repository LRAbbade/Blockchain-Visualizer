const endpoint = '35.237.108.201'
var mostRecentBtn = document.querySelector("#most-recent");
var oldestBtn = document.querySelector("#oldest");
var mostRecentActive;
var numOfBlocks;

init();

function init() {
    numOfBlocks = document.querySelector("#numOfBlocks").placeholder
    mostRecentActive = mostRecentBtn.classList.contains("active");

    console.log(`numOfBlocks: ${numOfBlocks}`);
    console.log(`mostRecentActive: ${mostRecentActive}`);

    mostRecentBtn.addEventListener("click", switchOrding);
    oldestBtn.addEventListener("click", switchOrding);
}

function setBlocksNum() {
    const blocks = document.querySelector("#numOfBlocks").value;
    if (/\d+/.test(blocks)) {
        numOfBlocks = blocks;
    }

    reload();
}

function switchOrding() {
    mostRecentActive = !mostRecentActive;
    mostRecentBtn.classList.toggle("active");
    oldestBtn.classList.toggle("active");
    setBlocksNum();
}

function reload() {
    const ord = mostRecentActive ? "lastBlocks" : "blocks";
    // window.location.href = `http://localhost:5000/${ord}/${numOfBlocks}`;    // for testing
    window.location.href = `http://${endpoint}:5000/${ord}/${numOfBlocks}`;
}

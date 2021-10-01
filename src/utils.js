function sortFreqTable(freqTableIn) {
    var freqs = [];
    for (const [, huffNode] of freqTableIn.entries()) {
        freqs.push(huffNode);
    }

    freqs.sort((a, b) => a.getFreq() - b.getFreq());

    let freqTable = new Map();
    for (let i = 0; i < freqs.length; i++) {
        freqTable.set(freqs[i].getName(), freqs[i]);
    }

    return freqTable;
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    endX() {
        return this.x + this.width;
    }

    endY() {
        return this.y + this.height;
    }
}
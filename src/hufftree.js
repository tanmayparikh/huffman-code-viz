class HuffTree {

    constructor(freqTable) {
        this.freqTable = freqTable;
        this.rootNode = null;
    }

    getFreqTable() {
        return this.freqTable;
    }

    next() {

        this.freqTable = sortFreqTable(this.freqTable);

        if (this.freqTable.size > 1) {

            let freqKeys = Array.from(this.freqTable.keys());

            let firstNode = this.freqTable.get(freqKeys[0]);
            let secondNode = this.freqTable.get(freqKeys[1]);

            let newName = firstNode.getName() + secondNode.getName()
            let newRoot = new HuffNode(
                newName,
                firstNode.getFreq() + secondNode.getFreq(),
                firstNode,
                secondNode);

            this.freqTable.set(newName, newRoot);
            this.freqTable.delete(firstNode.getName());
            this.freqTable.delete(secondNode.getName());

            this.freqTable = sortFreqTable(this.freqTable);

            return true;
        } else {
            return false;
        }
    }

    visualize(x, y, drawEncodedVal = false) {

        let drawX = x;
        let drawY = y;

        textFont(robotoFont, 15);
        let maxDepth = 1;
        let keys = Array.from(this.freqTable.keys());
        for (let i = 0; i < keys.length; i++) {
            let node = this.freqTable.get(keys[i]);
            let height = this.getNodeHeight(node);
            if (height > maxDepth)
                maxDepth = height;
        }

        if (keys.length == 1) {
            drawX = width / 2;
        }

        for (let i = 0; i < keys.length; i++) {
            let huffNode = this.freqTable.get(keys[i]);
            const [rootRect, boundRect] = huffNode.draw(drawX, drawY, 0.25 * maxDepth, i % 2 == 0, true, drawEncodedVal);

            let xScale = maxDepth;
            if (maxDepth > 4)
                xScale *= 2;

            if (boundRect.width <= 0) {
                drawX += rootRect.width + (50 * xScale);
            } else {
                drawX += boundRect.width + (50 * xScale);
            }
        }

        return new Point(drawX, drawY);

    }

    getNodeHeight(node) {

        if (node == null) {
            return 0;
        } else {
            let leftHeight = this.getNodeHeight(node.left);
            let rightHeight = this.getNodeHeight(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    static buildFreqTable(strInput) {
        let dict = new Map();

        for (let i = 0; i < strInput.length; i++) {
            let c = strInput.charAt(i).toString();
            if (dict.has(c)) {
                let huffNode = dict.get(c);
                huffNode.setFreq(huffNode.getFreq() + 1);
            } else {
                dict.set(c, new HuffNode(c, 1));
            }
        }

        return dict;
    }

}
class HuffNode {

    NODE_PADDING = 8;

    constructor(name, frequency, left = null, right = null) {
        this.name = name;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }

    getName() {
        return this.name;
    }

    setName(val) {
        this.name = val;
    }

    getFreq() {
        return this.frequency;
    }

    setFreq(val) {
        this.frequency = val;
    }

    draw(x, y, scale = 1.5, even = false, isLeft = true, drawEncodedVal = false) {

        let rightRect = new Rectangle(0, 0, 0, 0);

        let freqStr = this.frequency.toString();
        if (this.frequency < 1)
            freqStr = "";

        let nameW = floor(textWidth(this.name));
        let numW = floor(textWidth(freqStr));

        let txtW = max(nameW, numW);
        let txtH = floor(textAscent());

        let rectW = txtW + (this.NODE_PADDING * 2);
        let rectH = (txtH * 2) + (this.NODE_PADDING * 2);

        strokeWeight(2);

        fill(0);
        stroke(255, 0, 0);
        rect(x, y, rectW, rectH);

        stroke(255, 0, 0);
        line(x, y + (rectH / 2), x + rectW, y + (rectH / 2));

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);

        text(this.name, x + (rectW / 2), y + (rectH * 0.225));
        text(freqStr, x + (rectW / 2), y + (rectH * 0.70));

        let encode = "0";
        if (!isLeft)
            encode = "1";

        if (drawEncodedVal) {
            textAlign(CENTER, TOP);
            text(encode, x + rectW + 10, y);
        }

        if (this.left != null) {
            let leftX = x - (rectW * 1.5 * scale);
            let leftY = y + (rectH * 1.5);
            if (even)
                leftY = leftY + (rectH * 1.1);

            const [leftRect,] = this.left.draw(leftX, leftY, scale * 0.9, even, true, drawEncodedVal);

            stroke(255, 255, 255);
            noFill();
            strokeWeight(1);
            line(
                floor(x + (rectW * 0.5)),
                floor(y + rectH),
                floor(leftRect.x + (leftRect.width * 0.5)),
                floor(leftRect.y));
        }

        if (this.right != null) {
            let rightX = x + (rectW * 1.5 * scale);
            let rightY = y + (rectH * 1.5);
            if (even)
                rightY = rightY + (rectH * 1.1);

            const [rt,] = this.right.draw(rightX, rightY, scale * 0.9, even, false, drawEncodedVal);
            rightRect = rt;

            stroke(255, 255, 255);
            noFill();
            strokeWeight(1);
            line(
                floor(x + (rectW * 0.5)),
                floor(y + rectH),
                floor(rightRect.x + (rightRect.width * 0.5)),
                floor(rightRect.y));
        }

        return [
            new Rectangle(x, y, rectW, rectH),
            new Rectangle(x, y,
                (rightRect.x + rightRect.width) - x,
                (rightRect.y + rightRect.height) - y)
        ];
    }

}
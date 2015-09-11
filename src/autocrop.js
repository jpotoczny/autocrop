document.addEventListener("DOMContentLoaded", function () {

    var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            imageData, img, n,
            cropTop, cropLeft, cropWidth, cropHeight,
            margin = 10;    // px

    var imgs = document.getElementsByClassName("auto-crop");

    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (img.complete)
            processImg(img);
        else {
            img.addEventListener("load", function (e) {
                processImg(e.currentTarget);
            });
        }
    }

    function processImg(img) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        imageData = ctx.getImageData(0, 0, img.width, img.height);
        for (n = 0; n < img.height; n++)
            if (!isEmptyRow(n)) {
                cropTop = n;
                break;
            }
        for (n = img.height - 1; n > 0; n--)
            if (!isEmptyRow(n)) {
                cropHeight = n - cropTop;
                break;
            }
        for (n = 0; n < img.width; n++)
            if (!isEmptyCol(n)) {
                cropLeft = n;
                break;
            }
        for (n = img.width - 1; n > 0; n--)
            if (!isEmptyCol(n)) {
                cropWidth = n - cropLeft;
                break;
            }
        cropWidth += 2 * margin;
        cropHeight += 2 * margin;
        cropLeft -= margin;
        cropTop -= margin;
        img.setAttribute("style", 'object-fit: none; width: ' + cropWidth + 'px; height: ' + cropHeight + 'px;'
                + ' object-position: top -' + cropTop + 'px left -' + cropLeft + 'px;');
    }


    function isBorder(x, y) {
        var offset = (imageData.width * y + x) * 4;
        return imageData.data[offset] + imageData.data[offset + 1] + imageData.data[offset + 2] > 760 || p.a === 0;
    }

    function isEmptyRow(y) {
        for (x = 0; x < imageData.width; x++)
            if (!isBorder(x, y))
                return false;
        return true;
    }

    function isEmptyCol(x) {
        for (y = 0; y < imageData.height; y++)
            if (!isBorder(x, y))
                return false;
        return true;
    }

});

import { intToHex, getArray, getHexData, getTextData, addSpace } from "./binary.js";

class Png{
    static file;
    static index;
    static end;
    static number;
    static length;
    static string;
    static string2;
    static colourTypeValue;
    static fileend;

    static async png(file){
        Png.fileend = false;
        Png.end = 0;
        Png.file = file;
        let result = await Png.getBinary(8);
        result += " PNG signature";
        while(!Png.fileend) {
            result += await Png.getBinary(4);
            Png.length = Png.number;
            result += " LENGTH: " + Png.length + " byte(s)";
            result += await Png.getBinary(4);
            result += " CHUNK TYPE: " + Png.string;
            result += await Png.chunk();
            result += await Png.getBinary(4);
            result += " CRC";
        }
        return result;
    }

    static async getBinary(end){
        Png.index = Png.end;
        Png.end = Png.index + end;
        Png.number = 0;
        const array = await getArray(Png.file, Png.index, Png.end);
        array.forEach((value, index)=>{
            Png.number += value * 256 ** (array.length - index -1);
        });
        Png.string = getTextData(array);
        let result = "\r\n" + intToHex(Png.index, 4) + " "
        result += getHexData(array);
        result += addSpace(24 - (end * 3));
        result += Png.string;
        result += addSpace(8 - end);
        return result;
    }

    static chunk() {
        switch(Png.string){
            case 'IHDR':
                return Png.ihdr();
            case 'PLTE':
                return Png.plte();
            case 'IDAT':
                return Png.idat();
            case 'IEND':
                return Png.iend();
            case 'tRNS':
                return Png.trns();
            case 'cHRM':
                return Png.chrm();
            case 'gAMA':
                return Png.gama();
            case 'iCCP':
                return Png.iccp();
            case 'sBIT':
                return Png.sbit();
            case 'sRGB':
                return Png.srgb();
            case 'tEXt':
                return Png.text();
            case 'zTXT':
                return Png.ztxt();
            case 'iTXt':
                return Png.itxt();
            case 'bKGD':
                return Png.bkgd();
            case 'hIST':
                return Png.hist();
            case 'pHYs':
                return Png.phys();
            case 'sPLT':
                return Png.splt();
            case 'tIME':
                return Png.time();
        }
    }

    static async ihdr() {
        let result = await Png.getBinary(4) + " Width: " + Png.number + " px";
        result += await Png.getBinary(4) + " Height: " + Png.number + " px";
        result += await Png.getBinary(1) + " Bitdepth: " + Png.number + " bit(s)";
        result += await Png.getBinary(1) + " Colour type: " + Png.number + Png.colourType();
        result += await Png.getBinary(1) + " Compression method: " + Png.number + Png.ihdrCompression();
        result += await Png.getBinary(1) + " Filter method: " + Png.number + Png.filter();
        result += await Png.getBinary(1) + " Interlace method: " + Png.number + Png.interlace();
        return result;
    }

    static colourType() {
        Png.colourTypeValue = Png.number;
        switch(Png.number){
            case 0:
                return "(Grayscale)";
            case 2:
                return "(Truecolour)";
            case 3:
                return "(Indexed-colour)";
            case 4:
                return "(Greyscale with alpha)";
            case 6:
                return "(Truecolour with alpha)";
        }
    }

    static ihdrCompression(){
        switch (Png.number) {
            case 0:
                return "(deflate/inflate compression with a sliding window"
                    + " of at most 32768 bytes)";
        }
    }

    static filter() {
        switch  (Png.number) {
            case 0:
                return "(adaptive filtering with five basic filter types)";
        }
    }

    static interlace() {
        switch (Png.number) {
            case 0:
                return "(no interlace)";
            case 1:
                return "(Adam7 interlace)";
        }
    }

    static async plte(){
        let result = '';
        for (let i = 0; i*3 < Png.length; i ++){
            result += await Png.getBinary(3) + " palette index" + i + ": " + intToHex(Png.number,6);
        }
        return result;
    }

    static idat(){
        const result = "\r\n" + intToHex(Png.end,4) + " omitted                          "
            + "actual image data: " + Png.length + " byte(s)";
        Png.end += Png.length;
        return result;
    }

    static iend(){
        Png.fileend = true;
        return "\r\n" + intToHex(Png.end,4) + "                                  "
            + "the end of the PNG datastream";
    }

    static async trns(){
        switch(Png.colourTypeValue){
            case 0:
                return await Png.getBinary(2) + " Grey sample value: " + intToHex(Png.number,2);
            case 2:
                return await Png.getBinary(2) + " Red sample value: " + intToHex(Png.number,2)
                    + await Png.getBinary(2) + " Blue sample value: " + intToHex(Png.number,2)
                    + await Png.getBinary(2) + " Green sample value: " + intToHex(Png.number,2);
            case 3:
                let result = "";
                for (let i = 0; i < Png.length; i ++){
                    result += await Png.getBinary(1) + " palette index" + i + ": "
                        + intToHex(Png.number,2);
                }
                return result;
        }
    }

    static async chrm(){
        return await Png.getBinary(4) + " White point x: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " White point y: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " Red x: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " Red y: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " Green x: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " Green y: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " Blue x: " + Png.number + "(" + Png.number/100000 + ")"
            + await Png.getBinary(4) + " Blue y: " + Png.number + "(" + Png.number/100000 + ")";
    }

    static async gama(){
        return await Png.getBinary(4) + " Image gamma :" + (100000 / Png.number);
    }

    static async iccp(){
        const i = await Png.getIndexNullSeparator(Png.end, Png.end + Png.length);
        let result = await Png.over8bites(Math.floor(i/8));
        result += await Png.getBinary(i%8) + " Profile name: " + Png.string2 + Png.string;
        result += await Png.getBinary(1) + " Null separator";
        result += await Png.getBinary(1) + " Compression method: "
                + Png.number + Png.compression();
        const length = Png.length - i - 2;
        result += "\r\n" + intToHex(Png.end,4)
                + " omitted                          Compressed profile: "
                + length + " byte(s)";
        Png.end += length;
        return result;
    }

    static async getIndexNullSeparator(start, end){
        let result = 0;
        const array = await getArray(Png.file, start, end);
        while (result< 79 && array[result] != 0) {
            result++;
        }
        return result;
    }

    static async over8bites(repeat){
        Png.string2 = "";
        let result = "";
        while(repeat!==0){
            result += await Png.getBinary(8);
            Png.string2 += Png.string
            repeat--;
        }
        return result;
    }

    static compression(){
        switch(Png.number){
            case 0:
                return "(zlib datastream with deflate compression)";
        }
    }

    static async sbit(){
        switch(Png.colourTypeValue){
            case 0:
                return await Png.getBinary(1) + " significant greyscale bits: " + Png.number
                + " bit(s)";
            case 2:
            case 3:
                return await Png.getBinary(1) + " significant red bits: " + Png.number + " bit(s)"
                    + await Png.getBinary(1) + " significant green bits: " + Png.number + " bit(s)"
                    + await Png.getBinary(1) + " significant blue bits: " + Png.number + " bit(s)";
            case 4:
                return await Png.getBinary(1) + " significant greyscale bits: " + Png.number
                        + " bit(s)"
                        + await Png.getBinary(1) + " significant alpha bits: " + Png.number + " bit(s)";
            case 6:
                return await Png.getBinary(1) + " significant red bits: " + Png.number + " bit(s)"
                    + await Png.getBinary(1) + " significant green bits: " + Png.number + " bit(s)"
                    + await Png.getBinary(1) + " significant blue bits: " + Png.number + " bit(s)"
                    + await Png.getBinary(1) + " significant alpha bits: " + Png.number + " bit(s)";
        }
    }

    static async srgb(){
        return await Png.getBinary(1) + " Rendering intent: " + Png.number + Png.rendering();
    }

    static rendering(){
        switch(Png.number){
            case 0:
                return "(Perceptual -for images preferring good adaptation"
                    + " to the output device gamut at the expense"
                    + " of colorimetric accuracy, such as photographs.)";
            case 1:
                return "(Relative colorimetric -for images requiring colour"
                    + " appearance matching (relative to the output device"
                    + " white point), such as logos.)";
            case 2:
                return "(Saturation -for images preferring preservation of"
                    + " saturation at the expense of hue and lightness,"
                    + " such as charts and graphs.)";
            case 3:
                return "(Absolute colorimetric -for images requiring preservation"
                    + " of absolute colorimetry, such as previews of images destined"
                    + " for a different output device (proofs).)";
        }
    }

    static async text(){
        let i = await Png.getIndexNullSeparator(Png.end, Png.end + Png.length);
        let result = await Png.over8bites(Math.floor(i/8));
        result += await Png.getBinary(i%8) + " Keyword: " + Png.string2 + Png.string
        result += await Png.getBinary(1) + " Null separator"
        i = Png.length - i -1;
        result += await Png.over8bites(Math.floor(i/8));
        result += await Png.getBinary(i%8) + " Text string: " + Png.string2 + Png.string;
        return result;
    }

    static ztxt(){
        Png.end += Png.number;
        return Png.number;
    }

    static async itxt(){
        let i = await Png.getIndexNullSeparator(Png.end, Png.end + Png.length);
        let result = await Png.over8bites(Math.floor(i/8));
        result += await Png.getBinary(i%8) + " Keyword: " + Png.string2 + Png.string
        result += await Png.getBinary(1) + " Null separator";
        result += await Png.getBinary(1) + " Compression flag: " + Png.number
                + Png.compressionFlag();
        result += await Png.getBinary(1) + " Compression method: " + Png.number
                + Png.compression();
        let length = Png.length - i - 3;
        i = await Png.getIndexNullSeparator(Png.end, Png.end + length);
        result += await Png.over8bites(Math.floor(i/8));
        result += await Png.getBinary(i%8) + " Language tag: " + Png.string2 + Png.string;
        result += await Png.getBinary(1) + " Null separator";
        length = length - i -1;
        i = await Png.getIndexNullSeparator(Png.end, Png.end + length);
        result += await Png.over8bites(Math.floor(i/8));
        result += await Png.getBinary(i%8) + " Translated keyword: " + Png.string2 + Png.string;
        result += await Png.getBinary(1) + " Null separator";
        length = length - i - 1;
        result += await Png.over8bites(Math.floor(length/8));
        result += await Png.getBinary(length%8) + " Text string: " + Png.string2 + Png.string;
        return result;
    }

    static compressionFlag(){
        switch(Png.number){
            case 0:
                return "(uncompressed text)";
            case 1:
                return "(compressed text)";
        }
    }

    static async bkgd(){
        switch(Png.colourTypeValue){
            case 0:
            case 4:
                return await Png.getBinary(2) + " default background colour Greyscale: "
                    + Png.number.toString(16).toUpperCase();
            case 2:
            case 6:
                return await Png.getBinary(2) + " default background colour Red: "
                        + Png.number.toString(16).toUpperCase()
                    + await Png.getBinary(2) + " default background colour Green: "
                        + Png.number.toString(16).toUpperCase()
                    + await Png.getBinary(2) + " default background colour Blue: "
                        + Png.number.toString(16).toUpperCase();
            case 3:
                return await Png.getBinary(1) + " Palette index: " + Png.number;
        }
    }

    static hist(){
        Png.end += Png.number;
        return Png.number;
    }

    static async phys(){
        return await Png.getBinary(4) + " Pixels per unit, X axis: " + Png.number
            + await Png.getBinary(4) + " Pixels per unit, Y axis: " + Png.number
            + await Png.getBinary(1) + " Unit specifier: " + Png.number + Png.unit();
    }

    static unit(){
        switch(Png.number){
            case 0:
                return "(unit is unknown)";
            case 1:
                return "(unit is the metre)";
        }
    }

    static splt(){
        Png.end += Png.number;
        return Png.number;
    }

    static async time(){
        return await Png.getBinary(2) + " Year: " + Png.number
            + await Png.getBinary(1) + " Month: " + Png.number
            + await Png.getBinary(1) + " Day: " + Png.number
            + await Png.getBinary(1) + " Hour: " + Png.number
            + await Png.getBinary(1) + " Minute: " + Png.number
            + await Png.getBinary(1) + " Second: " + Png.number;
    }
}

export { Png };

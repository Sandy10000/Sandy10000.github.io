let png = {
  png: function() {
    let result;
    let length;
    result = getBinary(8) + 'PNG signature';
    png.end = 0;
    while(png.end == 0) {
      result += getBinary(4) + 'LENGTH: ' + value + ' byte(s)';
      length = value;
      result += getBinary(4) + 'CHUNK TYPE: ' + ascii
             + png.chunk(ascii, length)
             + getBinary(4) + 'CRC';
    }
    return result;
  },

  end: 0,
  colourTypeValue: '',

  chunk: function(chunk, length) {
    let result;
    switch(chunk){
      case 'IHDR':
        result = png.ihdr();
        break;
      case 'PLTE':
        result = png.plte(length);
        break;
      case 'IDAT':
        result = png.idat(length);
        break;
      case 'IEND':
        result = png.iend();
        break;
      case 'tRNS':
        result = png.trns(length);
        break;
      case 'cHRM':
        result = png.chrm();
        break;
      case 'gAMA':
        result = png.gama();
        break;
       case 'iCCP':
        result = png.iccp(length);
        break;
      case 'sBIT':
        result = png.sbit();
        break;
      case 'sRGB':
        result = png.srgb();
        break;
      case 'tEXt':
        result = png.text(length);
        break;
      case 'zTXT':
        result = png.ztxt(length);
        break;
      case 'iTXt':
        result = png.itxt(length);
        break;
      case 'bKGD':
        result = png.bkgd();
        break;
      case 'hIST':
        result = png.hist(length);
        break;
      case 'pHYs':
        result = png.phys();
        break;
      case 'sPLT':
        result = png.splt(length);
        break;
      case 'tIME':
        result = png.time();
        break;
    }
    return result;
  },

  ihdr: function() {
    let result;
    result = getBinary(4) + 'Width: ' + value + ' px'
           + getBinary(4) + 'Height: ' + value + ' px'
           + getBinary(1) + 'Bitdepth: ' + value + ' bit(s)'
           + getBinary(1) + 'Colour type: ' + value + png.colourType(value)
           + getBinary(1) + 'Compression method: ' + value
             + png.ihdrCompression(value)
           + getBinary(1) + 'Filter method: ' + value + png.filter(value)
           + getBinary(1) + 'Interlace method: ' + value + png.interlace(value);
    return result;
  },

  colourType: function(value) {
    let result;
    switch(value){
      case 0:
        result = '(Grayscale)';
        break;
      case 2:
        result = '(Truecolour)';
        break;
      case 3:
        result = '(Indexed-colour)';
        break;
      case 4:
        result = '(Greyscale with alpha)'
        break;
      case 6:
        result = '(Truecolour with alpha)'
        break;
    }
    png.colourTypeValue = value;
    return result;
  },

  ihdrCompression: function(value) {
    let result;
    switch (value) {
      case 0:
        result = '(deflate/inflate compression with a sliding window'
               + ' of at most 32768 bytes)';
        break;
    }
    return result;
  },

  filter: function(value) {
    let result;
    switch  (value) {
      case 0:
        result = '(adaptive filtering with five basic filter types)';
        break;
    }
    return result;
  },

  interlace: function(value) {
    let result;
    switch (value) {
      case 0:
        result = '(no interlace)';
        break;
      case 1:
        result = '(Adam7 interlace)';
        break;
    }
    return result;
  },

  plte: function(length){
    let result = '';
    for (let i = 0; i*3 < length; i ++){
    result += getBinary(3) + 'palette index' + i + ': ' + intToHex(value,6);
    }
    return result;
  },

  idat: function(length){
    let result;
    result = '\r\n' + intToHex(end,4) + ' omitted                          '
           + 'actual image data: ' + length + ' byte(s)';
    end += length;
    return result;
  },

  iend: function(){
    let result;
    result = '\r\n' + intToHex(end,4) + '                                  '
           + 'the end of the PNG datastream';
    png.end = 1;
    return result;
  },

  trns: function(length){
    let result;
    switch(png.colourTypeValue){
      case 0:
        result = getBinary(2) + 'Grey sample value: ' + intToHex(value,2);
        break;
      case 2:
        result = getBinary(2) + 'Red sample value: ' + intToHex(value,2)
               + getBinary(2) + 'Blue sample value: ' + intToHex(value,2)
               + getBinary(2) + 'Green sample value: ' + intToHex(value,2);
        break;
      case 3:
        result = '';
        for (let i = 0; i < length; i ++){
          result += getBinary(1) + 'palette index' + i + ': '
                 + intToHex(value,2);
        }
        break;
    }
    return result;
  },

  chrm: function(){
    let result;
    result = getBinary(4) + 'White point x: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'White point y: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'Red x: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'Red y: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'Green x: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'Green y: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'Blue x: ' + value + '(' + value/100000 + ')'
           + getBinary(4) + 'Blue y: ' + value + '(' + value/100000 + ')';
    return result;
  },

  gama: function(){
    let result;
    result =  getBinary(4) + 'Image gamma :' + (100000 / value);
    return result;
  },

  iccp: function(length) {
    let result;
    let i = end;
    while (i< 79 && raw[i] != 0) {
      i++;
    }
    length = length - (i - end) - 2;
    result = getBinary(i - end) + 'Profile name: ' + ascii
           + getBinary(1) + 'Null separator'
           + getBinary(1) + 'Compression method: '
             + value + this.compression(value)
           + '\r\n' + intToHex(end,4)
             + ' omitted                          Compressed profile: '
             + length + ' byte(s)';
    end += length;
    return result;
  },

  compression: function(value){
    let result;
    switch(value){
      case 0:
        result = '(zlib datastream with deflate compression)';
        break;
    }
    return result;
  },

  sbit: function(){
    let result;
    switch(png.colourTypeValue){
      case 0:
        result = getBinary(1) + 'significant greyscale bits: ' + value
          + ' bit(s)';
        break;
      case 2:
      case 3:
        result = getBinary(1) + 'significant red bits: ' + value + ' bit(s)'
               + getBinary(1) + 'significant green bits: ' + value + ' bit(s)'
               + getBinary(1) + 'significant blue bits: ' + value + ' bit(s)';
        break;
      case 4:
        result = getBinary(1) + 'significant greyscale bits: ' + value
                 + ' bit(s)'
               + getBinary(1) + 'significant alpha bits: ' + value + ' bit(s)';
        break;
      case 6:
        result = getBinary(1) + 'significant red bits: ' + value + ' bit(s)'
               + getBinary(1) + 'significant green bits: ' + value + ' bit(s)'
               + getBinary(1) + 'significant blue bits: ' + value + ' bit(s)'
               + getBinary(1) + 'significant alpha bits: ' + value + ' bit(s)';
        break;
    }
    return result;
  },

  srgb: function(){
    let result;
    result = getBinary(1) + 'Rendering intent: ' + value + png.rendering(value);
    return result;
  },

  rendering: function(value){
    let result;
    switch(value){
      case 0:
        result = '(Perceptual -for images preferring good adaptation'
               + ' to the output device gamut at the expense'
               + ' of colorimetric accuracy, such as photographs.)';
        break;
      case 1:
        result = '(Relative colorimetric -for images requiring colour'
               + ' appearance matching (relative to the output device'
               + ' white point), such as logos.)';
        break;
      case 2:
        result = '(Saturation -for images preferring preservation of'
               + ' saturation at the expense of hue and lightness,'
               + ' such as charts and graphs.)';
        break;
      case 3:
        result = '(Absolute colorimetric -for images requiring preservation'
               + ' of absolute colorimetry, such as previews of images destined'
               + ' for a different output device (proofs).)';
        break;
    }
    return result;
  },
  
  text: function(length){
    let result;
    let i = end;
    while (i< end + 79 && raw[i] != 0) {
      i++;
    }
    length = length - (i - end) - 1;
    result = getBinary(i - end) + 'Keyword: ' + ascii
           + getBinary(1) + 'Null separator'
           + getBinary(length) + 'Text string: ' + ascii;
    return result;
  },
  
  ztxt: function(length){
    let result;
    result = length;
    end += length;
    return result;
  },

  itxt: function(length){
    let result;
    let i = end;
    while (i< end + 79 && raw[i] != 0) {
      i++;
    }
    length = length - (i - end) - 3;
    result = getBinary(i - end) + 'Keyword: ' + ascii
           + getBinary(1) + 'Null separator'
           + getBinary(1) + 'Compression flag: ' + value
             + png.compressionFlag(value)
           + getBinary(1) + 'Compression method: ' + value
             + png.compression(value);
    i =end;
    while (raw[i] != 0) {
      i++;
    }
    length  = length - (i - end) - 1;
    result += getBinary(i - end) + 'Language tag: ' + ascii
           + getBinary(1) + 'Null separator'
    i = end;
    while (raw[i] != 0) {
      i++;
    }
    length  = length - (i - end) -1;
    result += getBinary(i - end) + 'Translated keyword: ' + ascii
           + getBinary(1) + 'Null separator'
           + getBinary(length) + 'Text string: ' + ascii;
    return result;

  },

  compressionFlag: function(value){
    let result;
    switch(value){
      case 0:
        result = '(uncompressed text)';
        break;
      case 1:
        result = '(compressed text)';
        break;
      }
    return result;
  },

  bkgd: function(length){
    let result;
    switch(png.colourTypeValue){
      case 0:
      case 4:
        result = getBinary(2) + 'default background colour Greyscale: '
               + value.toString(16).toUpperCase();
        break;
      case 2:
      case 6:
        result = getBinary(2) + 'default background colour Red: '
                 + value.toString(16).toUpperCase()
               + getBinary(2) + 'default background colour Green: '
                 + value.toString(16).toUpperCase()
               + getBinary(2) + 'default background colour Blue: '
                 + value.toString(16).toUpperCase();
        break;
      case 3:
        result = getBinary(1) + 'Palette index: ' + value;
        break;
    }
    return result;
},

  hist: function(length){
    let result;
    result = length;
    end += length;
    return result;
  },

  phys: function(){
    let result;
    result = getBinary(4) + 'Pixels per unit, X axis: ' + value
           + getBinary(4) + 'Pixels per unit, Y axis: ' + value
           + getBinary(1) + 'Unit specifier: ' + value + png.unit(value);
    return result;    
  },

  unit: function(value){
    let result;
    switch(value){
      case 0:
        result = '(unit is unknown)';
        break;
      case 1:
        result = '(unit is the metre)';
        break;
    }
    return result;
  },

  splt: function(length){
    let result;
    result = length;
    end += length;
    return result;
  },

  time: function(){
    let result;
    result = getBinary(2) + 'Year: ' + value
           + getBinary(1) + 'Month: ' + value
           + getBinary(1) + 'Day: ' + value
           + getBinary(1) + 'Hour: ' + value
           + getBinary(1) + 'Minute: ' + value
           + getBinary(1) + 'Second: ' + value;
    return result;
  }
}
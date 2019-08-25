$( document ).ready(function() {
	
	//Функция добавления нулей в начало бинарного блока символа
	//Принимает символ utf16
	// @char(string[1])
	function missZero(char) {
		var bin_convert = char.charCodeAt().toString(2);
		var bin_length = bin_convert.length;
		var need_zero = 16 - bin_length;
		while (need_zero > 0) {
			bin_convert = '0' + bin_convert;
			need_zero--;
		}
		return bin_convert;
	}
	
	// Функция формирования строки с бинарным кодом текста
	// Принимает строку символов utf16
	// @str(string)
	function toBinStr(str) {
		var res = '';
		for (var i = 0; i < str.length; i++) {
			res += missZero(str[i]);
		}
		return res;
	}
	
	// Функция формирования массива с бинарным кодом текста
	// 1 ячейка - 1 символ
	// Принимает строку символов utf16
	// @str(string)
	function toBinArr(str) {
		var res = [];
		for (var i = 0; i < str.length; i++) {
			res[i] = missZero(str[i]);
		}
		return res;
	}
	
	// Функция перевода бинарной строки в символьную
	// @str(string)
	function binToStr(str) {
		str = str.replace(/\s+/g, '');
		str = str.match(/.{1,16}/g).join(" ");
		var newBinary = str.split(" ");
		var binaryCode = [];
		for (i = 0; i < newBinary.length; i++) {
			binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
		}
		return binaryCode.join("");
	}
	
	// Функция получения размера сдвига
	// key - str origin
	// val - str bin text
	function inShiftVal(key, val) {
		var shift = toBinStr(key).replace(/0/gi, '').length;
		if (val.length > shift) {
			var res = shift;
		} else if (val.length < shift) {
			if (shift % val.length != 0) {
				var res = shift % val.length;
			} else {
				if (toBinStr(key.charAt(1)).replace(/0/gi, '').length < 16) {
					var res = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
				} else {
					var res = 13;
				}
			}
		} else {
			if (toBinStr(key.charAt(1)).replace(/0/gi, '').length < 16) {
				var res = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
			} else {
				var res = 13;
			}
		}
		return res;
	}
	
	function coding(key, val) {
		var val_bin = toBinStr(val);
		var sift = inShiftVal(key, val_bin);
		var first = val_bin.substr(0, val_bin.length - sift);
		var last = val_bin.substr(-sift);
		var res = [
			last + first,
			'1',
			'2',
			'3'
		];
		return (res)
	}
	
	
	$('.key').focus();
	$('body').on('keyup', '.key', function() {
		var key = $('.key').val();
		var temp1 = toBinStr(key);
		$('.temp1').val(temp1);
	});
	$('body').on('keyup', '.in-step-0', function() {
		var key = $('.key').val();
		var in_val = $('.in-step-0').val();
		
		var step_1 = coding(key, in_val);
		var temp2 = toBinStr(in_val);
		var temp2shift = inShiftVal(key, temp2)
		/*  tests  */
		$('.temp2').val(temp2 + '('+ temp2shift +')');
		$('.in-step-1').val(step_1[0]);
		
	});
});

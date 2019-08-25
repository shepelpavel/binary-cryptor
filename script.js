$( document ).ready(function() {
	
	//Функция добавления нулей в начало бинарного блока символа
	// @char(string[1]) one char utf16
	function missZero(char) {
		var res = char.charCodeAt().toString(2);
		var length = res.length;
		var need_zero = 16 - length;
		while (need_zero > 0) {
			res = '0' + res;
			need_zero--;
		}
		return res;
	}
	
	// Функция формирования строки с бинарным кодом текста
	// @str(string) utf16
	function toBinStr(str) {
		var res = '';
		for (var i = 0; i < str.length; i++) {
			res += missZero(str[i]);
		}
		return res;
	}
	
	// Функция формирования массива с бинарным кодом текста
	// 1 ячейка - 1 символ
	// @str(string) utf16
	function toBinArr(str) {
		var res = [];
		for (var i = 0; i < str.length; i++) {
			res[i] = missZero(str[i]);
		}
		return res;
	}
	
	// Функция перевода бинарной строки в символьную
	// @str(string) binary
	function binToStr(str) {
		str = str.replace(/\s+/g, '');
		str = str.match(/.{1,16}/g).join(" ");
		var tmp_bin = str.split(" ");
		var tmp_arr = [];
		for (i = 0; i < tmp_bin.length; i++) {
			tmp_arr.push(String.fromCharCode(parseInt(tmp_bin[i], 2)));
		}
		return tmp_arr.join("");
	}
	
	// Функция получения размера сдвига
	// @key(string) utf16
	// @val(string) binary
	function inShiftVal(key, val) {
		var shift = toBinStr(key).replace(/0/gi, '').length;
		var res = shift;
		if (val.length < shift) {
			if (shift % val.length != 0) {
				res = shift % val.length;
			} else {
				res = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
				if (res >= 16) res = 13;
			}
		} else if (val.length == shift) {
			res = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
			if (res >= 16) res = 13;
		}
		return res;
	}
	
	// Функция кодирования
	// @key(string) utf16
	// @val(string) utf16
	function coding(key, val) {
		var val_bin = toBinStr(val);
		var sift = inShiftVal(key, val_bin);
		var first = val_bin.substr(0, val_bin.length - sift);
		var last = val_bin.substr(-sift);
		var step1 = last + first;
		var step2 = '2';
		var step3 = '3';
		var step4 = '4';
		var res = [
			step1,
			step2,
			step3,
			step4
		];
		return (res)
	}
	
	// Функция ДЕкодирования
	// @key(string) utf16
	// @val(string) binary
	function decoding(key, val) {
		var step4 = '4';
		var step3 = '3';
		var step2 = '2';
		var step1 = '1';
		var res = [
			step4,
			step3,
			step2,
			step1
		];
		return (res)
	}
	
	
	$('.key').focus();
	$('body').on('keyup', '.key', function() {
		var key = $('.key').val();
		
		/*  tests  */
		var temp1 = toBinStr(key);
		$('.temp1').val(temp1);
	});
	$('body').on('keyup', '.in-step-0', function() {
		var key = $('.key').val();
		var in_val = $('.in-step-0').val();
		
		var code = coding(key, in_val);
		
		/*  tests  */
		var temp2 = toBinStr(in_val);
		var temp2shift = inShiftVal(key, temp2)
		$('.temp2').val(temp2 + '('+ temp2shift +')');
		$('.in-step-1').val(code[0]);
	});
});

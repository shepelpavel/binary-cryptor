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
	
	// Функция получения рандомной бинарной строки
	function randomBinStr() {
		return Math.round(Math.random() * Math.pow(10, 16)).toString(2);
	}
	
	// Функция сдвига при кодировании
	// @key(string) utf16
	// @val(string) binary
	function inShiftVal(key, val) {
		var shift = toBinStr(key).replace(/0/gi, '').length;
		if (val.length < shift) {
			if (shift % val.length != 0) {
				shift = shift % val.length;
			} else {
				shift = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
				if (shift >= 16) shift = 13;
			}
		} else if (val.length == shift) {
			shift = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
			if (shift >= 16) shift = 13;
		}
		var first = val.substr(0, val.length - shift);
		var last = val.substr(-shift);
		var res = last + first;
		return res;
	}
	
	// Функция инъекции мусора
	// @key(string) utf16
	// @val(string) binary
	function injectTrash(key, val) {
		var step2_arr_key = toBinArr(key);
		var string_in = val;
		var last_char = step2_arr_key[0].replace(/0/gi, '').length;
		var res = ''
		while (string_in.length > last_char) {
			$(step2_arr_key).each(function(index, value) {
				var leng_in = string_in.length;
				var value_int = value.replace(/0/gi, '').length;
				var last_char = value_int;
				if (leng_in > value_int) {
					var tmp_start = string_in.substr(0, value_int);
					var tmp_finish = string_in.substring(value_int, leng_in);
					var tmp_random = randomBinStr().substr(0, value_int);
					res += tmp_start + tmp_random;
					string_in = tmp_finish;
				} else {
					return false;
				}
			});
		}
		res += string_in;
		return res;
	}
	
	// Функция реверса битов при кодировании
	// @key(string) utf16
	// @val(string) binary
	function reverseBits(key, val) {
		var step3_arr_key = toBinArr(key);
		var string_in = val;
		var last_char = step3_arr_key[0].replace(/0/gi, '').length;
		var res = ''
		while (string_in.length > last_char) {
			$(step3_arr_key).each(function(index, value) {
				var leng_in = string_in.length;
				var value_int = value.replace(/0/gi, '').length;
				var last_char = value_int;
				if (leng_in > value_int) {
					var tmp_start = string_in.substr(0, value_int-1);
					var tmp_finish = string_in.substring(value_int, leng_in);
					var sym_in = string_in.charAt(value_int-1);
					if (sym_in == '0') {
						var sym_trgt = '1';
					} else {
						var sym_trgt = '0';
					}
					res += tmp_start + sym_trgt;
					string_in = tmp_finish;
				} else {
					return false;
				}
			});
		}
		res += string_in;
		return res;
	}
	
	// Функция кодирования
	// @key(string) utf16
	// @val(string) utf16
	function coding(key, val) {
		var val_bin = toBinStr(val);
		
		var step1 = inShiftVal(key, val_bin);
		var step2 = injectTrash(key, step1);
		var step3 = reverseBits(key, step2);
		
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
		$('.in-step-1').val(code[0]);
		$('.in-step-2').val(code[1]);
		$('.in-step-3').val(code[2]);
		
		/*  tests  */
		var temp2 = toBinArr(key);
		var temp3 = toBinStr(in_val);
		$('.temp2').val(temp2);
		$('.temp3').val(temp3);
	});
});

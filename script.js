$( document ).ready(function() {

	//Функция добавления нулей в начало бинарного блока символа
	//Принимает символ utf8
	function missZero(char) {
		var bin_convert = char.charCodeAt().toString(2);
		var bin_length = bin_convert.length;
		var need_zero = 8 - bin_length;
		while (need_zero > 0) {
			bin_convert = '0' + bin_convert;
			need_zero--;
		}
		return bin_convert;
	}

	// Функция формирования строки с бинарным кодом текста
	// Принимает строку символов utf8
	function toBinStr(str) {
		var res = '';
		for (var i = 0; i < str.length; i++) {
			res += missZero(str[i]);
		}
		return res;
	}

	// Функция формирования массива с бинарным кодом текста
	// 1 ячейка - 1 символ
	// Принимает строку символов utf8
	function toBinArr(str) {
		var res = [];
		for (var i = 0; i < str.length; i++) {
			res[i] = missZero(str[i]);
		}
		return res;
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
				if (toBinStr(key.charAt(1)).replace(/0/gi, '').length < 8) {
					var res = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
				} else {
					var res = 7;
				}
			}
		} else {
			if (toBinStr(key.charAt(1)).replace(/0/gi, '').length < 8) {
				var res = toBinStr(key.charAt(0)).replace(/0/gi, '').length;
			} else {
				var res = 7;
			}
		}
		return res;
	}

	$('.key').focus();
	$('body').on('keyup', '.key', function() {
		var key = $('.key').val();
		/* --- */
		var key_bin_str = toBinStr(key);
		var key_bin_arr = toBinArr(key);
		var key_bin = '';
		for (var i = 0; i < key.length; i++) {
			key_bin += missZero(key[i]) + '(' + key[i].charCodeAt() + ')' + ' ';
		}
		$('.key-bin').val(key_bin);
		$('.key-bin-str').val(key_bin_str);
		$('.key-bin-arr').val(key_bin_arr);
		/* --- */
	});
	$('body').on('keyup', '.in-step-0', function() {
		var key = $('.key').val();
		var in_val = $('.in-step-0').val();
		var in_val_bin = toBinStr(in_val);

		var in_sift = inShiftVal(key, in_val_bin);

		var in_val_bin_first = in_val_bin.substr(0, in_val_bin.length - in_sift);
		var in_val_bin_last = in_val_bin.substr(-in_sift);
		var in_val_bin_res = in_val_bin_last + in_val_bin_first;

		$('.test').val(in_sift);
		$('.in-step-1').val(in_val_bin_res);
	});
});
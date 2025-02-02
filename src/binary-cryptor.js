//Функция добавления нулей в начало бинарного блока символа
// @char(string[1]) one char utf16
function missZero(char) {
	if (char) {
		var res = char.charCodeAt().toString(2);
		var length = res.length;
		var zero = 16 - length;
		while (zero > 0) {
			res = '0' + res;
			zero--;
		}
		return res;
	}
}

// Функция формирования строки с бинарным кодом текста
// @str(string) utf16
function toBinStr(str) {
	if (str) {
		var res = '';
		for (var i = 0; i < str.length; i++) {
			res += missZero(str[i]);
		}
		return res;
	}
}

// Функция формирования массива с бинарным кодом текста
// 1 ячейка - 1 символ
// @str(string) utf16
function toBinArr(str) {
	if (str) {
		var res = [];
		for (var i = 0; i < str.length; i++) {
			res[i] = missZero(str[i]);
		}
		return res;
	}
}

// Функция перевода бинарной строки в символьную
// @str(string) binary
function binToStr(str) {
	if (str) {
		str = str.replace(/[^0-1]/gim, '');
		str = str.replace(/\s+/g, '');
		str = str.match(/.{1,16}/g).join(" ");
		var bin = str.split(" ");
		var arr = [];
		for (i = 0; i < bin.length; i++) {
			arr.push(String.fromCharCode(parseInt(bin[i], 2)));
		}
		return arr.join("");
	}
}

// Функция реверса строки
function reverseString(str) {
	var res = '';
	if (str != '') {
		res = reverseString(str.substr(1)) + str.charAt(0);
	}
	return res;
}

// Функция получения мусорной строки
function trashBinStr(val) {
	var res = reverseString(toBinStr(val.toString(10)));
	return res;
}

// Функция сдвига при кодировании
// @key(string) utf16
// @val(string) binary
function inShiftVal(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
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
}

// Функция сдвига при ДЕкодировании
// @key(string) utf16
// @val(string) binary
function outShiftVal(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
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
		var first = val.substr(0, shift);
		var last = val.substr(shift, val.length);
		var res = last + first;
		return res;
	}
}

// Функция инъекции мусора
// @key(string) utf16
// @val(string) binary
function injectTrash(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
		var key_arr = toBinArr(key);
		var string_in = val;
		var last_char = key_arr[0].replace(/0/gi, '').length;
		var res = ''
		while (string_in.length > last_char) {
			$(key_arr).each(function (index, value) {
				var leng_in = string_in.length;
				var v_int = value.replace(/0/gi, '').length;
				var last_char = v_int;
				if (leng_in > v_int) {
					var start = string_in.substr(0, v_int);
					var finish = string_in.substring(v_int, leng_in);
					var random = trashBinStr(finish.length).substr(0, v_int);
					res += start + random;
					string_in = finish;
				} else {
					return false;
				}
			});
		}
		res += string_in;
		return res;
	}
}

// Функция удаления мусора
// @key(string) utf16
// @val(string) binary
function deleteTrash(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
		var key_arr = toBinArr(key);
		var string_in = val;
		var last_char = key_arr[0].replace(/0/gi, '').length;
		var res = ''
		while (string_in.length > last_char * 2) {
			$(key_arr).each(function (index, value) {
				var leng_in = string_in.length;
				var value_int = value.replace(/0/gi, '').length;
				var last_char = value_int;
				if (leng_in > value_int * 2) {
					var start = string_in.substr(0, value_int * 2);
					var finish = string_in.substring(value_int * 2, leng_in);
					res += start.substr(0, value_int);
					string_in = finish;
				} else {
					return false;
				}
			});
		}
		res += string_in;
		return res;
	}
}

// Функция реверса битов при кодировании
// @key(string) utf16
// @val(string) binary
function reverseBits(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
		var key_arr = toBinArr(key);
		var string_in = val;
		var last_char = key_arr[0].replace(/0/gi, '').length;
		var res = ''
		while (string_in.length > last_char) {
			$(key_arr).each(function (index, value) {
				var leng_in = string_in.length;
				var v_int = value.replace(/0/gi, '').length;
				var last_char = v_int;
				if (leng_in > v_int) {
					var start = string_in.substr(0, v_int - 1);
					var finish = string_in.substring(v_int, leng_in);
					var sym_in = string_in.charAt(v_int - 1);
					if (sym_in == '0') {
						var sym_trgt = '1';
					} else {
						var sym_trgt = '0';
					}
					res += start + sym_trgt;
					string_in = finish;
				} else {
					return false;
				}
			});
		}
		res += string_in;
		return res;
	}
}

// Функция побитового кодирования/декодирования
// @key(string) utf16
// @val(string) binary
// val - 1010
// key - 1001
// res - 1100
function binaryCode(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
		var key_bin = toBinStr(key);
		var key_arr = key_bin.split('');
		var string_in = val;
		var res = '';
		while (string_in.length > 0) {
			$(key_arr).each(function (index, value) {
				if (string_in.length > 0) {
					var start = string_in.charAt(0);
					var finish = string_in.substr(1, string_in.length);
					if (start == value) {
						var bit = '1';
					} else {
						var bit = '0';
					}
					res += bit;
					string_in = finish;
				} else {
					return false;
				}
			});
		}
		return res;
	}
}

// Функция кодирования
// @key(string) utf16
// @val(string) utf16
function coding(key, val) {
	if (key && val) {
		var val_bin = toBinStr(val);
		var step1 = inShiftVal(key, val_bin);
		var step2 = injectTrash(key, step1);
		var step3 = reverseBits(key, step2);
		var step4 = binaryCode(key, step3);
		var res = step4;
		return (res);
	}
}

// Функция ДЕкодирования
// @key(string) utf16
// @val(string) binary
function decoding(key, val) {
	if (key && val) {
		val = val.replace(/[^0-1]/gim, '');
		var step4 = binaryCode(key, val);
		var step3 = reverseBits(key, step4);
		var step2 = deleteTrash(key, step3);
		var step1 = outShiftVal(key, step2);
		var res = binToStr(step1);
		return (res);
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const _days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _enviroments = ['LOCAL', 'DEVELOPMENT', 'TEST', 'HOMOLOGATION', 'PRODUCTION'];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const IsLetter = function (value) { return (value.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/i) == null ? false : true); }
const IsDigit = function (value) { return (value.match(/[0-9]/i) == null ? false : true); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const IsJSON = function (value) { try { JSON.parse(value); return true; } catch { return false; } }
const ParseJSON = function (value) { try { return JSON.parse(value); } catch { return null; } }
const StringifyJSON = function (value) { try { return JSON.stringify(value); } catch { return null; } }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const NewGUID = function () { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const IsFunction = function (value) { return typeof (value) === 'function'; }
const IsString = function (value) { return typeof (value) === 'string'; }
const IsArray = function (value) { return Array.isArray(value); }
const IsNumber = function (value) { return typeof (value) === 'number'; }
const IsBool = function (value) { return typeof (value) === 'boolean'; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StringToBase64 = function (value = '') { return btoa(value); }
const Base64ToString = function (value = '') { return atob(value); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GetMonthName = function (value) { return (value <= 0 || value >= 13 ? null : _months[value - 1]); }
const GetDayName = function (value) { return (value <= 0 || value >= 8 ? null : _days[value - 1]); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const IsNull = function (value) { return (value == null); }
const IsUndefined = function (value) { return (value == undefined); }
const IsNullOrEmpty = function (value) { return (value == null || value == undefined || value == false || value == '' || value == ' '); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ParameterURL = function (key) {
    let params = window.location.search.substr(1).split('&');
    for (var i = 0; i < params.length; i++) { var p = params[i].split('='); if (p[0] == key) { return decodeURIComponent(p[1]); } }
    return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GetElement = function (id) { return document.getElementById(id); }
const GetElements = function (className) { return document.getElementsByClassName(className) }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GetCookie = function (key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) { return decodeURIComponent(c.substring(name.length, c.length)); }
    }
    return null;
}

const SetCookie = function (key, value, durationCookie = null) {
    // Definir data de expiração default:
    let dateTime = new Date(), dateToExpire = new Date();
    dateToExpire.setTime(dateTime.getTime() + (60 * 1000)); //Default 1 Minuto;
    // Duração do Cookie:
    if (durationCookie) {
        var time = (durationCookie.includes('DAY') ? 'DAY' : durationCookie.includes('MIN') ? 'MIN' : durationCookie.includes('HOUR') ? 'HOUR' : null);
        if (time == null) { return; }
        durationCookie = parseInt(durationCookie.replace('DAY', '').replace('MIN', '').replace('HOUR', ''));
        durationCookie = (time == 'DAY' ? (86400 * durationCookie) : time == 'HOUR' ? (3600 * durationCookie) : time == 'MIN' ? (60 * durationCookie) : '');
        dateToExpire.setTime(dateTime.getTime() + (durationCookie * 1000));
    }
    document.cookie = `${key}=${encodeURIComponent(value)};expires=${dateToExpire.toGMTString()}`;
    return true;
}

const DeleteCookie = function (key) {
    if (GetCookie(key) == null) { return 'Cookie não foi encontrado.' }
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

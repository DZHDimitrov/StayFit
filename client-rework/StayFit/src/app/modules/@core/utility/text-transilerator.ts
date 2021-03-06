export const cyrillicToLatin = function (text) {
  text = text
    .replace(/\u042A/g, '')
    .replace(/\u0451/g, 'yo')
    .replace(/\u0439/g, 'i')
    .replace(/\u0446/g, 'ts')
    .replace(/\u0443/g, 'u')
    .replace(/\u043A/g, 'k')
    .replace(/\u0435/g, 'e')
    .replace(/\u043D/g, 'n')
    .replace(/\u0433/g, 'g')
    .replace(/\u0448/g, 'sh')
    .replace(/\u0449/g, 'sht')
    .replace(/\u0437/g, 'z')
    .replace(/\u0445/g, 'h')
    .replace(/\u044A/g, "'u")
    .replace(/\u0410/g, 'a')
    .replace(/\u0444/g, 'f')
    .replace(/\u044B/g, 'i')
    .replace(/\u0432/g, 'v')
    .replace(/\u0430/g, 'a')
    .replace(/\u043F/g, 'p')
    .replace(/\u0440/g, 'r')
    .replace(/\u043E/g, 'o')
    .replace(/\u043B/g, 'l')
    .replace(/\u0434/g, 'd')
    .replace(/\u0436/g, 'zh')
    .replace(/\u044D/g, 'e')
    .replace(/\u044F/g, 'ya')
    .replace(/\u0447/g, 'ch')
    .replace(/\u0441/g, 's')
    .replace(/\u043C/g, 'm')
    .replace(/\u0438/g, 'i')
    .replace(/\u0442/g, 't')
    // .replace(/\u044C/g, "ь")
    .replace(/\u044E/g, 'yu')
    .split(" ")
    .join("_");

  return text;
};

export const latinToCyrillic = (text: string) => {
  text = text?.toLowerCase()
    .replace(/yo/g, 'йо')
    .replace(/zh/g, 'ж')
    .replace(/ts/g, 'ц')
    .replace(/sht/g, 'щ')
    .replace(/sh/g, 'ш')
    .replace(/ya/g, 'я')
    .replace(/ch/g, 'ч')
    .replace(/yu/g, 'ю')
    .replace(/i/g, 'и')
    .replace(/'u/g, 'ъ')
    .replace(/u/g, 'у')
    .replace(/k/g, 'к')
    .replace(/e/g, 'е')
    .replace(/n/g, 'н')
    .replace(/g/g, 'г')
    .replace(/z/g, 'з')
    .replace(/h/g, 'х')
    .replace(/'/g, "'")
    .replace(/a/g, 'а')
    .replace(/p/g, 'п')
    .replace(/f/g, 'ф')
    .replace(/i/g, 'и')
    .replace(/v/g, 'в')
    .replace(/r/g, 'р')
    .replace(/o/g, 'о')
    .replace(/l/g, 'л')
    .replace(/d/g, 'д')
    .replace(/e/g, 'е')
    .replace(/s/g, 'с')
    .replace(/m/g, 'м')
    .replace(/i/g, 'и')
    .replace(/t/g, 'т')
    .replace(/b/g, 'б')
    .split(" ")
    .join("_");
  return text;
};

export const englishToBulgarian = {
  Height:'Височина',

  Weight:'Тегло',

  Fats:'Мазнини',

  Neck:'Врат',

  Shoulders:'Рамене',

  Chest:'Гръдна обиколка',

  Arms:'Мишници',

  Forearms:'Предмишници',

  Waist:'Талия',

  Wrist:'Китка',

  Hips:'Ханш',

  Thighs:'Бедра',

  LeftCalf:'Ляв прасец',
  
  RightCalf:'Десен прасец',

  Ankle:'Глезен'
}

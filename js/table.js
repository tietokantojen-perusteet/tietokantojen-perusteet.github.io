var TABLES = {};

TABLES['Opiskelija'] = {
    schema: "opiskelijanumero, nimi, syntymävuosi, pääaine",
    data: [
	["999999", "Pihla", 1997, "Tietojenkäsittelytiede"],
	["999998", "Joni", 1993, "Tietojenkäsittelytiede"],
	["999997", "Anna", 1991, "Matematiikka"],
	["999996", "Krista", 1990, "Tietojenkäsittelytiede"],
	["999995", "Matti", 1970, "Matematiikka"],
	["999994", "Gandhi", 1869, "Oikeustiede"],
    ]
}

TABLES['Kurssisuoritus'] = {
    schema: "opiskelija, kurssi, päivämäärä, arvosana",
    data: [
	["999999", "Pihla", 1997, "Tietojenkäsittelytiede"],
	["999998", "Joni", 1993, "Tietojenkäsittelytiede"],
	["999997", "Anna", 1991, "Matematiikka"],
	["999996", "Krista", 1990, "Tietojenkäsittelytiede"],
	["999995", "Matti", 1970, "Matematiikka"],
	["999994", "Gandhi", 1869, "Oikeustiede"],
    ]
}

/*
TABLES['students'] = {
  schema: "name, age, address, city, studentnumber",
  data: [
      ["Eero", 3, "Haaga", "Helsinki", "12321"],
      ["Matti", 43,"Malmi", "Helsinki", "12345"],
      ["Arto", 31, "Tapiola", "Espoo", "12431"],
      ["Pekka", 19, "Eira", "Helsinki", "11221"],
      ["Joni", 22, "Kontula", "Helsinki", "11111"],
      ["Jarmo", 23, "Korso", "Vantaa", "11112"]
  ]
}

TABLES['courses'] = {
  schema: "name, credits, id",
  data: [
      ["OhPe", 5, 1],
      ["TiKaPe", 5, 2],
      ["TiRa", 10, 3],
      ["JTKT", 8, 4]
  ]
}

TABLES['participations'] = {
  schema: "id, course_id, studentnumber, grade",
  data: [
      [1, 1, "11111", 5],
      [2, 3, "11111", 3],
      [3, 1, "12431", 1],
      [4, 2, "12431", 0],
      [5, 3, "12345", 5],
      [6, 1, "12345", 4],
      [7, 1, "11112", 5],
      [8, 4, "11111", 3],
      [9, 4, "12345", 0]
  ]
}
*/
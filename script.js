// Function Using Axios for get Endpoint the pryare timies
function getPrayersTimingsOfCity(cityName, countryCode) {
	let params = {
		country: "SY",
		city: cityName, //"Damascus"
		// method: 2
	};
	axios
		.get("https://api.aladhan.com/v1/timingsByCity", {
			params: params,
		})
		.then(function (response) {
			const timings = response.data.data.timings;
			fillTimeForPrayer("fajr-time", timings.Fajr);
			fillTimeForPrayer("sunrise-time", timings.Sunrise);
			fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
			fillTimeForPrayer("asr-time", timings.Asr);
			fillTimeForPrayer("sunset-time", timings.Sunset);
			fillTimeForPrayer("isha-time", timings.Isha);

			// display the Date and Day
			const readableDate = response.data.data.date.readable;
			const weekDay = response.data.data.date.hijri.weekday.ar;
			let date = readableDate + " " + weekDay;
			document.getElementById("date").innerHTML = date;
		})
		.catch(function (error) {
			console.log(error);
		});
}
getPrayersTimingsOfCity("Damascus");

// Function to update prayer times in the HTML
function fillTimeForPrayer(id, time) {
	document.getElementById(id).innerHTML = time;
}

//handlig scroler
let cities = [
	{
		arabicName: "دمشق",
		name: "Damascus",
	},
	{
		arabicName: "حلب",
		name: "Aleppo",
	},
	{
		arabicName: "حمص",
		name: "Homs",
	},
	{
		arabicName: "حماة",
		name: "Hama",
	},
	{
		arabicName: "اللاذقية",
		name: "Latakia",
	},
	{
		arabicName: "طرطوس",
		name: "Tartus",
	},
	{
		arabicName: "الرقة",
		name: "Raqqa",
	},
	{
		arabicName: "دير الزور",
		name: "Deir ez-Zor",
	},
	{
		arabicName: "الحسكة",
		name: "Al-Hasakah",
	},
	{
		arabicName: "درعا",
		name: "Daraa",
	},
	{
		arabicName: "السويداء",
		name: "As-Suwayda",
	},
	{
		arabicName: "إدلب",
		name: "Idlib",
	},
];

let selectElement = document.getElementById("cities-select");
selectElement.innerHTML = ``;

// display city is scroler
for (city of cities) {
	const content = `
    <option>${city.arabicName}</option>
    `;
	selectElement.innerHTML += content;
}

selectElement.addEventListener("change", function () {
	// Update  City name in header
	document.getElementById("city-name").innerHTML = this.value;

	//Update prayer times By choice
	let cityName = "";
	for (city of cities) {
		if (city.arabicName == this.value) {
			cityName = city.name;
		}
	}
	getPrayersTimingsOfCity(cityName);
});

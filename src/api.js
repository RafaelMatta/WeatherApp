export const cityApiOptions = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

export const CITY_API_URL = 'http://localhost:3000';

// fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=BR', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
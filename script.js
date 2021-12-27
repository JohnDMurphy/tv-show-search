const form = document.getElementById('searchForm');
const userInput = document.getElementById('searchInput');
const tbody = document.getElementById('tBody');

form.addEventListener('keyup', async (e) => {
	e.preventDefault();
	tbody.innerText = '';

	const res = await axios.get(
		`https://api.tvmaze.com/search/shows?q=${userInput.value}`
	);

	for (let i = 0; i < res.data.length; i++) {
		const tr = document.createElement('tr');
		const titleName = document.createElement('td');
		const summary = document.createElement('td');
		const image = document.createElement('img');

		image.classList.add('image-box');
		try {
			image.src = await res.data[i].show.image.medium;
		} catch {
			image.src = 'image.png';
		}

		tr.append(image);
		tr.append(titleName);
		titleName.innerText = await res.data[i].show.name;
		tr.append(summary);
		summary.innerHTML = await res.data[i].show.summary;
		summary.classList.add('summary');

		tbody.append(tr);
	}
});

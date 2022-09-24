// Getting the elementId from DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide loading
function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// show new quote
function newQuote() {
	loading();
	// pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	//  Check if author field is blank and replace it with "unknown"
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}
	// check quote length to determine styling
	if (quote.text.length < 100) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	// set Quote, Hide loader
	quoteText.textContent = quote.text;
	complete();
}


// GEt wuotes from APi

async function getQuotes() {
	loading();
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'; 
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch error Here
	}
}

// Eventlistners
newQuoteBtn.addEventListener('click', newQuote);


// on load
getQuotes();

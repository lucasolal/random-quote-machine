function randomNumber(maxNonInclusive) {
  return Math.floor(maxNonInclusive * Math.random());
}

const colors = [
"crimson",
"darkcyan",
"goldenrod",
"indigo",
"saddlebrown",
"steelblue",
"orangered",
"olive",
"blueviolet",
"hotpink",
"darkblue",
"green",
"coral"];

let quotes = {};
const jsonURL =
"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function fetchQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json" },

    url: jsonURL,
    success: res => {
      quotes = JSON.parse(res);
      console.log(quotes);
    } });

}

function fetchAQuote() {
  return quotes.quotes[randomNumber(102)];
}

function showAQuote() {
  quote = fetchAQuote();
  const quoteText = quote["quote"];
  const quoteAuthor = quote["author"];
  $("#quote-box").css("background-color", colors[randomNumber(colors.length)]);
  $(".fader").animate(
  {
    opacity: 0 },

  1000,
  function () {
    $("#text").text('"' + quoteText + '"');
    $("#author").text("- " + quoteAuthor);
    $(this).animate(
    {
      opacity: 1 },

    1000);

  });


  $("#tweet-quote").attr(
  "href",
  "https://twitter.com/intent/tweet?text=" +
  encodeURIComponent('"' + quoteText + '" - ' + quoteAuthor));

}

function btnClick() {
  showAQuote();
}

$(document).ready(() => {
  fetchQuotes().then(() => {
    const quote = fetchAQuote();
    $("#text").text('"' + quote.quote + '"');
    $("#author").text("- " + quote.author);
  });
  $("#new-quote").click(btnClick);
});
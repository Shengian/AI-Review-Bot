const docs = [
  {
    name: "Scenario 1: Vague HR Policy",
    text: "Hey everyone, starting next week the vacation policy is changing. You cant just take days off whenever you feel like it. You need to ask first. Also sick days are different now. If you are sick tell John. Thanks."
  },
  {
    name: "Scenario 2: Terrible Bug Report",
    text: "The login button is broken. I clicked it and nothing happened. I tried it yesterday and it worked but now it doesnt. Please fix asap the clients are getting mad. Dave."
  },
  {
    name: "Scenario 3: Exaggerated Marketing Draft",
    text: "Buy our new shampoo! It will literally make your hair grow 10 feet in one day. No other shampoo in the universe is as good as this one. It's magic and completely scientifically proven by everyone."
  }
];

async function runTests() {
  for (const doc of docs) {
    console.log(`\n\n=== Evaluating ${doc.name} ===`);
    try {
      const response = await fetch('http://localhost:3000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: doc.text })
      });
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Failed:", err);
    }
  }
}

runTests();

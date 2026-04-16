const docs = [
  {
    name: "Doc 1: Angry Customer Service Response",
    text: "Dear customer, we are not refunding your money. It's your own fault you broke the toy. We clearly stated in the manual not to drop it. Stop emailing us."
  },
  {
    name: "Doc 2: Project Status Hiding Failure",
    text: "The project is going great. We are making lots of progress. Some minor delays but nothing to worry about. We will definitely hit the deadline maybe. Everything is fine."
  },
  {
    name: "Doc 3: Bad Code Review Request",
    text: "I fixed the bug. I just deleted the part of the code that was throwing the error so it doesn't crash anymore. Merging this to main now."
  },
  {
    name: "Doc 4: Missing Recipe Ingredients",
    text: "To make the cake, first mix the flour and sugar. Then bake at 350 degrees for an hour. Take it out and let it cool. Enjoy your cake!"
  },
  {
    name: "Doc 5: Emotional Resignation Letter",
    text: "I am quitting. I hate working here. Dave is the worst manager in the history of the world and the coffee in the breakroom tastes like dirt. I am leaving right now and never coming back."
  },
  {
    name: "Doc 6: PERFECT Technical Summary (Trick Test)",
    text: "The new microservice architecture will decouple our user authentication from the main monolith. Authentication will be handled via JWT tokens with a 15-minute expiration, refreshed via HttpOnly secure cookies. This reduces monolith load by 40% and allows independent scaling of the auth cluster."
  },
  {
    name: "Doc 7: Legal Terms Contradiction",
    text: "Users may cancel their subscription at any time for a full refund. All payments are strictly non-refundable under any circumstances. By using the app you agree to this."
  },
  {
    name: "Doc 8: Complete Gibberish",
    text: "asdfasdf jkl;jkl; qwe rqwe rqwe the jumping dog blue sky coffee cup 12345 !@#$%"
  },
  {
    name: "Doc 9: Unrealistic Business Plan",
    text: "We will launch our new social network tomorrow. We expect 1 billion users by Sunday. Our revenue model is just to show one ad a month to each person. We don't need investors, we will be billionaires by next week."
  },
  {
    name: "Doc 10: Vague Requirement Document",
    text: "The new app needs to be fast. It should look good and have buttons that do things. Also make sure it works on phones. That's all the requirements, please start coding."
  }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    console.log(`[${i+1}/10] Testing: ${doc.name}...`);
    try {
      const response = await fetch('http://localhost:3000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: doc.text })
      });
      
      const data = await response.json();
      
      if (!response.ok || data.error) {
        console.error(`  -> Failed with status ${response.status}:`, data.error || data);
        errorCount++;
        errors.push({ name: doc.name, error: data.error || "Unknown server error" });
      } else {
        console.log(`  -> Success. Schema validated successfully.`);
        successCount++;
      }
    } catch (err) {
      console.error(`  -> Network/Parse Error:`, err.message);
      errorCount++;
      errors.push({ name: doc.name, error: err.message });
    }
    
    // Sleep to prevent 429 Rate Limits or 503 Overloads on Free Tier
    await sleep(4000); 
  }

  console.log("\n=== 10-DOCUMENT BATCH TEST COMPLETE ===");
  console.log(`Successful Reviews: ${successCount}`);
  console.log(`Failed Reviews: ${errorCount}`);
  if (errors.length > 0) {
    console.log("Errors Encountered:");
    errors.forEach(e => console.log(` - ${e.name}: ${e.error}`));
  }
}

runTests();

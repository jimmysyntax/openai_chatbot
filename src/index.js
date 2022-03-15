const { Configuration, OpenAIApi } = require('openai');

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const configuration = new Configuration({
  apiKey: "",// your openai.com api key
});

const openai = new OpenAIApi(configuration);

const askAI = async (question) => {
  const completion = await openai.createCompletion('text-davinci-001', {
    prompt: question,
    max_tokens: 250
  });

  const results = completion.data.choices;

  const result = results.map(res => res.text);

  return result;
};

const getQuestion = async () => {
    return new Promise((resolve, reject) => {
        rl.question(": ", answer => {
            resolve(answer);
        })
    })
}

let previousResponses = [];

let previousQuestion = "";

(async () => {

    while (true) {
        let question = await getQuestion();
        if (question === "p") {
            question = previousQuestion;
        } else {
            previousQuestion = question;
            previousResponses = [];
        }

        let formattedQuestion = previousResponses.join(",");
        formattedQuestion += "\n\n";
        formattedQuestion += question;

        const [ response ] = await askAI(formattedQuestion);
        console.log(response);
    }

})();


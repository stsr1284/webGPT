/*  APIreference "makingRequests"
curl https://api.openai.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
 "model": "gpt-3.5-turbo",
 "messages": [{"role": "user", "content": "Say this is a test!"}],
 "temperature": 0.7
}'
*/

export const CallGPT = async ({ prompt }) => {
	console.log("CallGPT\n");
	const messages = [
		{
			role: "system", content: `## INFO ##
		you can add images to the reply by URL, write the image in JSON field
		Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##`
		},
		{ 
			role: "system", content: `You are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order.`
		},
		{
			role: "user",
			content: `1. [title] : Think of the diary title after understanding the [events] separated by """ at the bottom.
			2. [summarize] : summarize events in order with one line sentence.
			3. [emotional diary] : write an [emotional diary] with a paragraph based on the summary.
			4. [evaluates] : the written emotional [evaluates], using explore the unconscious based on the contents of the [emotional diary].
			5. [Psychological analysis] : Psychological analysis is performed using professional psychological knowledge much more detailed anduse a famous quote,
			6. [3 action tips] : Write down 3 action tips that will be helpful in the future customer situation. the three action tips must beconverted into JSON array for
			7. [image] : Create an image by making the contents so far into one keyword.
			
			Translate into korean and Use the output in thw following JSON format:
			{
				title: here is [title],
				summarize: here is [summarize],
				emotional_content: here is [emotional diary],
				emotional_result: here is [evaluates],
				analyesis: here is [Psychological analysis],
				action_list: here is [3 action tips],
			}
			
			[events]:`,
		},
		{
			role: "user",
			content: `
			"""
			${prompt}
			"""`
		}
	];
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
   		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${import.meta.env.VITE_MY_DIARY_KEY}`
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages,
			temperature: 0.7,
			max_tokens: 1000,
		}),
	});
	const responseData = await response.json();
	console.log(">>responseData", responseData);

	const message = responseData.choices[0].message.content;
	console.log("message: ", message);
	return message;
}

import { useState } from "react";
import { CallGPT } from "./api/gpt"

const dummyData = JSON.parse(
  `{ "title": "코딩 강의 후의 고민", "summarize": "코딩 강의를 듣고 프로젝트 버그 해결", "emotional_content": "오늘 코딩 강의를 들었다. 강의 내용은 매우 유익했지만, 프로젝트에서 버그가 많이 발생했다. 스택오버플로에서 검색해보았지만 해결되지 않았다. 그런데, gpt를 활용해서 문제를 해결할 수 있었다. 하지만 이렇게 해결하는 것이 개발 실력 향상에 도움이 될까 고민이다.", "emotional_result": "이 강의를 통해 새로운 기술을 배웠고 문제를 해결할 수 있었지만, 자신의 개발 능력에 대한 의문이 들었다. 왜냐하면 버그를 해결하기 위해 다른 사람의 도움을 받았기 때문이다. 이는 내가 더 많은 경험과 지식을 쌓아야 한다는 것을 알려주는 시간이었다.", "analysis": "이러한 고민은 개발자로서 성장하고자 하는 욕구와 현재의 능력 사이에서의 갈등을 나타낸다. 개발은 끊임없이 새로운 기술과 도구가 등장하기 때문에, 다른 사람의 도움을 받는 것은 당연한 일이다. 하지만 개발자로서의 자신감과 능력을 키우기 위해서는 스스로 문제를 해결하고 발전해 나가야 한다. 이러한 경험은 나에게 중요한 성장 기회가 될 것이다.", "action_list": ["더 많은 개발 경험을 쌓는다.", "새로운 기술과 도구에 대해 학습한다.", "자주 스스로 문제를 해결해보는 시도를 한다."], "image": "coding development" }`
)

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `
      코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음, 스택오버플로에서 검색했지만 해결 안되었어.
      역시 gpt를 통해서 해결했다. 근데 이렇게 해결하는게 개발 실력에 도움될까..?
      `,
      });
      setData(JSON.parse(message));
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  console.log(">>data", data);

  return (
    <>
      <button onClick={handleClickAPICall}>GPT API CALL</button>
      <div>data: {JSON.stringify(data)}</div>
      <div>isLoading: {isLoading ? "lodaing..." : "fin"}</div>
    </>
  )
}

export default App

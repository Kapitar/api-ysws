import JSONPretty from "react-json-pretty";

interface JSONPlaceholderProps {
  data: string | object;
}

export default function JSONPlaceholder({ data }: JSONPlaceholderProps) {
  return (
    <JSONPretty
      id="json-pretty"
      data={data}
      style={{
        width: "100%",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
      }}
      theme={{
        main: "line-height:1.3;color:#66d9ef;word-break:break-word;white-space:pre-wrap;",
        error:
          "line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;",
        key: "color:#f92672;",
        string: "color:#fd971f;",
        value: "color:#a6e22e;",
        boolean: "color:#ac81fe;",
      }}
    ></JSONPretty>
  );
}

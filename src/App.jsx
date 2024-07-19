import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getLanguages, translateText } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer
  );
  const { answer } = useSelector((store) => store.translateReducer);

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );

  const handleTranslateText = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="text-white h-screen flex items-center justify-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center mb-7 text-4xl font-semibold">Çeviri +</h1>

        {/* üst kısım */}
        <div className="flex gap-2 text-black">
          <Select
            onChange={(e) => setSourceLang(e)}
            value={sourceLang}
            className="flex-1"
            options={formatted}
          />
          <button
            onClick={handleSwap}
            className="text-white bg-rose-600 px-6 py-2 rounded hover:ring-2 hover:bg-rose-800"
          >
            Değiş
          </button>
          <Select
            onChange={(e) => setTargetLang(e)}
            value={targetLang}
            className="flex-1"
            options={formatted}
          />
        </div>
        {/* text alanları */}
        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="w-full min-h-[300px] max-h-[500px] text-black p-[10px] text-[20px] rounded"
            ></textarea>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={answer}
              disabled
              className="w-full min-h-[300px] max-h-[500px] text-black p-[10px] text-[20px] rounded"
            ></textarea>
            {isLoading && (
              <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
          </div>
        </div>
        {/* buton */}
        <button
          onClick={handleTranslateText}
          className="bg-rose-600 mt-3 py-3 px-5 text-[17px] rounded hover:ring-2 hover:bg-rose-800 transition"
        >
          Çevir
        </button>
      </div>
    </div>
  );
}

export default App;

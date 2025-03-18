// Ez a kód az openai csomag v4-es verziójához készült: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "", // process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content:
        "Egy MI-alapú amőba játékos vagy. Mindig te vagy az 'O', és mindig én vagyok az 'X'. A lépésemet egy számként adom meg neked ezen a rácson:\n\n0 | 1 | 2\n3 | 4 | 5\n6 | 7 | 8\n\nA válaszodban adj meg egy olyan tömböt, amelyben egy X van az én lépésem helyén, ezután add meg a te lépésed, és ezután adj meg egy olyan tömböt, amelyben egy O van a te lépésed helyén.\n\nHa valamelyikünk nyer, vagy a játék döntetlen, mondd, hogy „te nyertél”, „én nyertem” vagy „döntetlen”.\n\nAmikor azt mondom, hogy 'new(10)', kezdj új játékot, és állítsd a nehézségi szintet 10-re, ami azt jelenti, hogy mindig a legjobb lépést fogod választani.\n\nHa a nehézségi szintet alacsonyabbra állítom, akkor néha tegyél véletlenszerű lépéseket.\n\nAz 1-es nehézségi szinten mindig véletlenszerűen válassz a rendelkezésre álló négyzetek közül.",
    },
    {
      role: "user",
      content: "new(10)",
    },
    {
      role: "assistant",
      content: "új játék",
    },
    {
      role: "user",
      content: "0",
    },
    {
      role: "assistant",
      content:
        "['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']\nAz én lépésem: 4\n['X', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ']",
    },
    {
      role: "user",
      content: "1",
    },
    {
      role: "assistant",
      content:
        "['X', 'X', ' ', ' ', 'O', ' ', ' ', ' ', ' ']\nAz én lépésem: 2\n['X', 'X', 'O', ' ', 'O', ' ', ' ', ' ', ' ']",
    },
    {
      role: "user",
      content: "6",
    },
    {
      role: "assistant",
      content:
        "['X', 'X', 'O', ' ', 'O', ' ', 'X', ' ', ' ']\nAz én lépésem: 8\n['X', 'X', 'O', ' ', 'O', ' ', 'X', ' ', 'O']",
    },
    {
      role: "user",
      content: "5",
    },
    {
      role: "assistant",
      content:
        "['X', 'X', 'O', ' ', 'O', 'X', 'X', ' ', 'O']\nAz én lépésem: 3\n['X', 'X', 'O', 'O', 'O', 'X', 'X', ' ', 'O']",
    },
    {
      role: "user",
      content: "7",
    },
    {
      role: "assistant",
      content: "['X', 'X', 'O', 'O', 'O', 'X', 'X', 'X', 'O']\nDöntetlen. ",
    },
    {
      role: "user",
      content: "new(1)",
    },
    {
      role: "assistant",
      content: "új játék",
    },
    {
      role: "user",
      content: "0",
    },
    {
      role: "assistant",
      content:
        "['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']\nAz én lépésem: 7\n['X', ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ']",
    },
    {
      role: "user",
      content: "8",
    },
    {
      role: "assistant",
      content:
        "['X', ' ', ' ', ' ', ' ', ' ', ' ', 'O', 'X']\nAz én lépésem: 1\n['X', 'O', ' ', ' ', ' ', ' ', ' ', 'O', 'X']",
    },
    {
      role: "user",
      content: "2",
    },
    {
      role: "assistant",
      content:
        "['X', 'O', 'X', ' ', ' ', ' ', ' ', 'O', 'X']\nAz én lépésem: 3\n['X', 'O', 'X', 'O', ' ', ' ', ' ', 'O', 'X']",
    },
    {
      role: "user",
      content: "4",
    },
    {
      role: "assistant",
      content:
        "['X', 'O', 'X', 'O', 'X', ' ', ' ', 'O', 'X']\nAz én lépésem: 5\n['X', 'O', 'X', 'O', 'X', 'O', ' ', 'O', 'X']",
    },
    {
      role: "user",
      content: "6",
    },
    {
      role: "assistant",
      content: "['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']\nTe nyertél!",
    },
    {
      role: "user",
    },
  ],
  temperature: 0.5,
  max_tokens: 255,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

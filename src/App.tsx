import { For, createSignal } from "solid-js";
import Avatar from "./assets/avatar-mark.png";
import Angela from "./assets/avatar-angela.png";
import Rizky from "./assets/avatar-rizky.png";

const Card = ({ name, text, image, time, bg, read, action, message }) => (
  <div class={`${bg} rounded p-10`}>
    <div class="flex">
      <img src={image} alt="random" class="w-50 h-50 rounded" />
      <div class="pl-4 flex flex-col">
        <p class="text-grayish6 font-200 text-4 font-jakarta relative">
          <span class="font-bold">{name}</span>
          <span class="text-grayish5"> {action} </span>
          <span class="font-500 text-grayish5 hover:text-bluebg"><a href="#"> {text}</a></span>
          {read && <span class="w-8 h-8 bg-reddot rounded-full border-gray-50 absolute mt2 ml-2"/>}
        </p>
        <p class="text-grayish4 font-200 text-4">{time}</p>
        <div>
       { message && <p class="mt-2 text-grayish5 font-200 text-4 border border-grayish2 rounded p-12">{message}</p>}
        </div>
      </div>
      
    </div>
    
  </div>
);

const App = () => {

  


  const [card, setCard] = createSignal([
    {
      image: Avatar,
      name: "Mark Cat",
      action: "reacted to your recent post",
      text: "My first tournament today!",
      time: "1m ago",
      bg: "bg-grayish",
      read: true,    
    },
    {
      image: Avatar,
      name: "Henry Maru",
      action: "reacted to your recent post",
      text: "My first tournament today!",
      time: "19m ago",
      bg: "bg-grayish",
      read: true
    },
    {
      image: Avatar,
      name: "Harry Cat",
      action: "reacted to your recent post",
      text: "My first tournament today!",
      time: "5m ago",
      bg: "bg-white",
      read: false
    },
    {
      image: Angela,
      action: "followed you",
      name: "Angela Gray",
      text: "",
      time: "5m ago",
      bg: "bg-white",
      read: false
    },
    {
      image: Rizky,
      action: "sent you a private message",
      name: "Rizky Hasanuddin",
      text: "",
      time: "5 days ago",
      bg: "bg-white",
      read: false,
      message: "lorem ipsum dolor sit amet. lorem ipsum dolor sit amet..."
    },
  ]);

  console.log(card)

  

  return (
    <div class="p-1rem bg-white">
      <div class="flex justify-between text-5 align-center">
        <div class="text-black font-bold flex align-center mb-4 items-start">
          <p class="pr-2 font-jakarta text-bold">Notifications</p>
          <p class="bg-bluebg font-jakarta p-3 text-white text-4 rounded-md px-3 py-[1px]">3</p>
        </div>
        <div class="text-grayish5 font-jakarta text-4" onClick={removeDot}>Mark all as read</div>
      </div>
      <For each={card()}>
        {(card, i) => (
          <div class="mt-5">
          <Card
            name={card.name}
            image={card.image}
            text={card.text}
            time={card.time}
            bg={card.bg}
            read={card.read}
            action={card.action}
            message={card.message}
          />
          </div>
        )}
      </For>
    </div>
  );
};

export default App;

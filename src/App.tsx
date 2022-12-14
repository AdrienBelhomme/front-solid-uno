import { For, createSignal, createEffect } from "solid-js";
import Avatar from "./assets/avatar-mark.png";
import Angela from "./assets/avatar-angela.png";
import Rizky from "./assets/avatar-rizky.png";
import Kimberly from "./assets/avatar-kimberly.png";
import Anna from "./assets/avatar-anna.png";
import chess from "./assets/image-chess.png";

const Card = (props) => (
  <div class={`${props.bg} rounded-md p-16`}>
    <div class="flex">
      <img src={props.image} alt="random" class="w-45 h-45 rounded" />
      <div class="pl-4 flex flex-col">
        
        <div class="text-grayish6 font-200 text-4 font-jakarta relative">
        <p class="relative">
          <span class="font-bold">{props.name}</span>
          <span class="text-grayish5"> {props.action} </span>
          <span class="font-800 text-grayish5 hover:text-bluebg">
            <a href="#"> {props.text}</a>
          </span>
          {props.link && <span class="font-800 text-grayish5 hover:text-bluebg">
            <a href="#"> {props.link}</a>
          </span>}
          {props.read && (
            <span class="w-8 h-8 bg-reddot rounded-full border-gray-50 absolute mt2 ml-2" />
          )}
          </p>
        </div>
        <p class="text-grayish4 font-200 text-4">{props.time}</p>
        {props.picture && <img src={props.picture} alt="random" class="w-20 h-20 rounded" />}
        <div>
          {props.message && (
            <p class="mt-2 text-grayish5 font-200 text-4 border border-grayish2 rounded p-12">
              {props.message}
            </p>
          )}
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
      link: "",
      time: "1m ago",
      bg: "bg-grayish",
      read: true,
      picture: "",
    },
    {
      image: Avatar,
      name: "Henry Maru",
      action: "reacted to your recent post",
      text: "My first tournament today!",
      link: "",
      time: "19m ago",
      bg: "bg-grayish",
      read: true,
      picture: "",
    },
    {
      image: Anna,
      name: "Anna Kim",
      action: "left the group",
      text: "",
      link: "chess club",
      time: "5m ago",
      bg: "bg-grayish",
      read: true,
      picture: "",
    },
    {
      image: Angela,
      action: "followed you",
      name: "Angela Gray",
      text: "",
      link: "",
      time: "5m ago",
      bg: "bg-white",
      read: false,
      picture: "",
    },
    {
      image: Rizky,
      action: "sent you a private message",
      name: "Rizky Hasanuddin",
      text: "",
      link: "",
      time: "5 days ago",
      bg: "bg-white",
      read: false,
      message: "lorem ipsum dolor sit amet. lorem ipsum dolor sit amet...",
      picture: "",
    },
    {
      image: Kimberly,
      action: "commented on your picture",
      name: "Kimberly Smith",
      text: "",
      link: "",
      time: "5 days ago",
      bg: "bg-white",
      read: false,
      message: "",
      picture: chess,
    },
  ]);

  console.log(card());
  console.log(card()[0]);
  console.log(card()[0].read);

  /* const removeDot = () => {
    createEffect(() => {
      console.log("clicked");
      for (let i = 0; i < card().length; i++) {
        card()[i].read = false;
        console.log(card()[i].read);
      }
    });
  }; */


  const [read, setRead] = createSignal(true);


  const removeDot = () => {
    setCard(card().map(cards => {
        return {
          ...cards,
          read: false,
          bg: "bg-white",
        }
      }))
    }


    const [notification, setNotification] = createSignal(card().filter((cards) => cards.read).length);


    createEffect(() => {
      setNotification(card().filter((cards) => cards.read).length);
  });

  
  

  return (
    <div class="p-1rem md:p-2.5rem bg-white">
      <div class="flex justify-between text-5 align-center">
        <div class="text-black font-bold flex align-center mb-4 items-start">
          <p class="pr-2 font-jakarta text-bold">Notifications</p>
          <p class="bg-bluebg font-jakarta p-3 text-white text-4 rounded-md px-3 py-[1px]">
            {notification()}
          </p>
        </div>
        <div class="text-grayish5 font-jakarta text-4" onClick={removeDot}>
          Mark all as read
        </div>
      </div>
      <For each={card()}>
        {(cards, i) => (
          <div class="mt-3 md:mt-2">
            <Card
              name={cards.name}
              image={cards.image}
              text={cards.text}
              time={cards.time}
              bg={cards.bg}
              read={cards.read}
              action={cards.action}
              message={cards.message}
              picture={cards.picture}
              link={cards.link}
            />
          </div>          
        )}
      </For>
    </div>
  );
};

export default App;

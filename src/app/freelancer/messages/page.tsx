"use client";
// import Navbar from "../../components/Layout/Navbar";
// import threedots from "@/assets/icons/three-dots-icon.png";
// import search from "@/assets/icons/search.png";
// import people from "@/assets/icons/people.png";
// import files from "@/assets/icons/files.png";
// import notepad from "@/assets/icons/notepad.png";
import cross from "@/assets/icons/cross.png";
// import phone from '../../components/images/phone.png'
import iicon from "@/assets/icons/iicon.svg";
import paper from "@/assets/icons/paper.svg";
// import paperpin from '../../components/images/paperpin.svg'
// import attherate from '../../components/images/attherate.svg'
// import smiley from '../../components/images/smiley.svg'
import vthreedots from "@/assets/icons/vthreedots.svg";
// import AudioVisualizer from './AudioVisualizer'
// import file_example_MP3_5MG from '../../components/images/file_example_MP3_5MG.mp3'
// import AudioMessages from './AudioMessages'
// import Drawer from '@mui/material/Drawer';
// import { useSelector } from "react-redux";
// import useWebSocket, { ReadyState } from "react-use-websocket";
import useWebSocket from "react-use-websocket";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, useMemo, useCallback, ChangeEvent, KeyboardEvent } from "react";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import { errorLog } from "@/utils/errorLog";
import Image from "next/image";
// import { useRouter } from "next/navigation";

interface IUserProfile {
  id: number;
  Company_Name: string;
  first_Name: string;
  last_Name: string;
  email: string;
  contact: string;
  Address: string;
  images_logo: string;
  social_media: string;
  about: string;
  DOB: string | null;
  Company_Establish: string | null;
  gender: string;
  map: string;
}

interface IFreelancerDetails {
  id: number;
  email: string;
  first_Name: string;
  last_Name: string;
  contact: string;
  Address: string;
  DOB: string | null;
  gender: string;
  experience: number;
  type: string;
  images_logo: string;
  qualification: string;
  social_media: string;
  map: string;
  skills: string;
  category: string;
  Language: string;
  hourly_rate: number;
  experience_level: string;
  about: string;
}

// interface IHirerFreelancerDetails {
//   hirer: number;
//   freelancer: number;
//   freelancerDetails: IFreelancerDetails;
// }

interface IUser {
  id: number;
  password: string;
  last_login: string | null;
  date_of_creation: string;
  is_verified: boolean;
  images_logo: string;
  type: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  is_hirer: boolean;
  is_superuser: boolean;
  Company_Name: string;
  is_freelancer: boolean;
  is_owner: boolean;
  first_Name: string;
  last_Name: string;
  experience: number;
  qualification: string;
  contact: string;
  about: string;
  Company_Establish: string | null;
  skills: string;
  social_media: string;
  Block: boolean;
  map: string;
  Address: string;
  DOB: string | null;
  category: string;
  Language: string;
  hourly_rate: string;
  experience_level: string;
  gender: string;
}

interface IChatMessage {
  id: string;
  conversation: string;
  name: string;
  from_user: IUser;
  to_user: IUser;
  content: string;
  timestamp: string;
  read: boolean;
}

interface IConvouser {
  id: number;
  last_login: string | null;
  is_verified: boolean;
  images_logo: string;
  type: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  is_hirer: boolean;
  Company_Name: string;
  is_freelancer: boolean;
  is_owner: boolean;
  first_Name: string;
  last_Name: string;
  experience: number;
  qualification: string;
  contact: string;
  about: string;
  Company_Establish: string | null;
  skills: string; // JSON string, consider parsing it to an array
  social_media: string;
  Block: boolean;
  map: string;
  Address: string;
  DOB: string | null;
  category: string;
  Language: string; // JSON string, consider parsing it to an array
  hourly_rate: string;
  experience_level: string;
  gender: string;
}

const Messages = () => {
  // const audioSrc = {file_example_MP3_5MG}
  // const location = useLocation();
  // const router = useRouter();
  // const logindata = useSelector((state) => state.login.login_data) || JSON.parse(localStorage.getItem("logindata"));
  const logindata: IUserProfile = {
    id: 5,
    Company_Name: "",
    first_Name: "sachin",
    last_Name: "sharma",
    email: "sachinsharmaece@gmail.com",
    contact: "",
    Address: "",
    images_logo: "/media/images_logo/admin-profle.png",
    social_media: "",
    about: "",
    DOB: null,
    Company_Establish: null,
    gender: "",
    map: "",
  };
  // const conversationName = location.state && location.state.conversationName;
  const conversationName = useMemo(
    () => ({
      hirer: 5,
      freelancer: 4,
      freelancerDetails: {
        id: 4,
        email: "sachinsharmapeace@gmail.com",
        first_Name: "sachin",
        last_Name: "sharma",
        contact: "",
        Address: "",
        DOB: null,
        gender: "",
        experience: 0,
        type: "FREELANCER",
        images_logo: "/media/images_logo/profile8.jfif",
        qualification: "B.E",
        social_media: "",
        map: "",
        skills: "['Python']",
        category: "",
        Language: "['Hindi']",
        hourly_rate: 0,
        experience_level: "",
        about: "",
      },
    }),
    []
  );
  //console.log("conversationName : ",conversationName)
  //console.log("logindata :", logindata)
  // const [welcomeMessage, setWelcomeMessage] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(2);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  // const [name, setName] = useState(logindata.id);
  const name = useState(logindata.id);
  const [messageHistory, setMessageHistory] = useState<IChatMessage[]>([]);
  const [conversations, setConversations] = useState<IChatMessage[]>([]);
  const [backup, setbackup] = useState([]);
  const [convouser, setConvouser] = useState<IFreelancerDetails | IConvouser | null>(null);
  //console.log("--------------",messageHistory)
  const chatid = logindata.id;
  // const { sendJsonMessage } = useWebSocket("ws://13.233.123.209:8000/4__2");

  const [conversation, setConversation] = useState<string | null>(null);
  useEffect(() => {
    if (conversationName) {
      const names = [conversationName.hirer, conversationName.freelancer].sort();
      setConversation(`${names[0]}__${names[1]}`);
      setConvouser(conversationName.freelancerDetails);
      //console.log("names -------- ",names,conversation)
    }
  }, [conversationName]);
  //console.log("names -------- ",conversationName,"-----",conversation)
  // useEffect(() => {
  const chat_data = useCallback(
    (chatid: number) => {
      axios
        .get(`https://www.api.alanced.com/chat/conversations/${chatid}`)
        .then((response) => {
          if (response.data.status === 200) {
            const Data = response.data.data;
            setConversations(Data);
            setbackup(Data);
            //console.log("conversations",conversations)
            //console.log("--------------------",response.data.data[0].name);
            if (conversationName !== null) {
              for (let i = 0; i < response.data.data.length; i++) {
                //console.log("================ >",response.data.data[i].name)
                if (
                  conversationName.freelancer === response.data.data[i].from_user.id ||
                  conversationName.freelancer === response.data.data[i].to_user.id
                ) {
                  setConvouser(
                    response.data.data[i].from_user.id !== logindata.id
                      ? response.data.data[i].from_user
                      : response.data.data[i].to_user
                  );
                  //console.log(conversationName.freelancer,"------",response.data.data[i].from_user.id,"-----",response.data.data[i].to_user.id)
                }
              }
            }
            if (conversationName === null) {
              setConvouser(
                Data[0].from_user.id !== logindata.id ? Data[0].from_user : Data[0].to_user
              );
            }
            if (conversationName === null) {
              setConversation(Data[0].name);
            }
          } else {
            //console.log(response.data.message || 'Error fetching project');
          }
        })
        .catch((err) => {
          errorLog(err.message);
        });
    },
    [conversationName, logindata.id]
  );
  // }, [logindata.id]);
  useEffect(() => {
    chat_data(chatid);
  }, [chat_data, chatid, logindata.id]);
  //console.log("conversations",conversations)
  // `ws://13.233.123.209:8000/${conversation}`
  // const { readyState, sendJsonMessage } = useWebSocket(
  const { sendJsonMessage } = useWebSocket(`wss://api.alanced.com:8001/${conversation}`, {
    onOpen: () => {
      //console.log("Connected!");
    },
    onClose: () => {
      //console.log("Disconnected!");
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      //console.log("data :",data)
      switch (data.type) {
        case "welcome_message":
          // setWelcomeMessage(data.message);
          break;
        case "chat_message_echo":
          // setMessageHistory((prev) => [...prev, data.message]);
          setMessageHistory((prev) => [data.message, ...prev]);
          //console.log("message from chat_message_echo : ",messageHistory,"-------", data.message)
          break;
        case "last_50_messages":
          if (data !== undefined) {
            setMessageHistory(data.messages.slice());
            setHasMoreMessages(data.has_more);
            //console.log("message from last_50_messages : ",messageHistory,"-------", data.messages)
          }

          break;
        default:
          errorLog("Unknown message type!");
          break;
      }
    },
  });

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  //console.log("connection status -------------- ",connectionStatus)

  function filterconvo(query: string) {
    if (!query) {
      chat_data(chatid);
    }
    const list = query.split(" ");
    const querys = list[1];
    //console.log("query",query.split(" "),querys)
    const filteredConversations = backup.filter((conversation: IChatMessage) =>
      conversation.from_user.id !== logindata.id
        ? conversation.from_user.first_Name.toLowerCase().includes(query.toLowerCase()) ||
          (!querys
            ? conversation.from_user.last_Name.toLowerCase().includes(query.toLowerCase())
            : conversation.from_user.last_Name.toLowerCase().includes(querys.toLowerCase()))
        : conversation.to_user.first_Name.toLowerCase().includes(query.toLowerCase()) ||
          (!querys
            ? conversation.to_user.last_Name.toLowerCase().includes(query.toLowerCase())
            : conversation.to_user.last_Name.toLowerCase().includes(querys.toLowerCase()))
    );

    // Update state with the filtered conversations
    setConversations(filteredConversations);
  }

  // useEffect(() => {
  //   // Attach scroll event listener
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     // Detach scroll event listener on component unmount
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [messageHistory, hasMoreMessages]);

  // const handleScroll = () => {
  //   // Check if the user has scrolled to the bottom
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     fetchMessages();
  //   }
  // };

  const fetchMessages = async () => {
    const apiRes = await fetch(
      `https://www.api.alanced.com/chat/messages/?conversation=${conversation}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (apiRes.status === 200) {
      const data = await apiRes.json();
      setHasMoreMessages(data.next !== null);
      setPage(page + 1);
      if (data.results.length > 0) {
        // for (let i = 0; i < data.results.length; i++){
        //   //console.log("iiiiiiiii",data.results[i])
        setMessageHistory((prev) => [...prev, ...data.results]);
        // }
      } else {
        setHasMoreMessages(false);
      }
      //console.log(" Message fetched ------ >", data.results)
    }
  };

  function handleChangeMessage(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }
  //console.log("message -------- ",message)
  // function handleChangeName(e){
  //   setName(e.target.value);
  // }

  const [time, setTime] = useState(new Date());
  //console.log("time :",time)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  function formatTimeStamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }

  const formatDate = (dateString: string) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString.slice(0, 10));
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  };

  function convoname(name: string, user: IConvouser) {
    setConversation(name);
    setPage(2);
    setConvouser(user);
    //console.log("convo name : ", name)
    //console.log("convo user : ",convouser)
  }
  //console.log("convo user : ",convouser)
  // useEffect(() => {
  //   //console.log("convo name after update:", conversation);
  // }, [conversation]);
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key is pressed
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && message.length > 0) {
      // Prevent the default behavior (e.g., form submission)
      e.preventDefault();
      // Call the submit function
      handleSubmit();
    }
    if (message.trim() === "" && e.key === "Enter") {
      e.preventDefault();
      // Optionally, you can alert the user, or simply do nothing
      // alert("Please enter some text before pressing Enter.");
      return; // Exit the function
    }
    if ((e.shiftKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  function handleSubmit() {
    // setName("manoj")
    sendJsonMessage({
      type: "chat_message",
      message,
      name,
    });
    // setName("");
    setMessage("");
    fetchMessages();
    chat_data(chatid);
    //console.log("connection status -------------- ",connectionStatus)
  }

  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="container-sm rounded-lg shadow-lg">
        {/* <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div class="font-semibold text-2xl">GoingChat</div>
      <div class="w-1/2">
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
        />
      </div>
      <div
        class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
      >
        RA
      </div>
    </div> */}

        <div className="flex flex-row justify-between border-t-2 bg-white">
          <div className="flex h-[86.1vh] w-2/5 flex-col overflow-y-auto border-r-2">
            <div className="flex items-center justify-between border-b-2 px-2 py-3">
              <span className="font-cardo float-left text-lg font-semibold">Chats</span>
              {/* <Image
                height={15}
                width={15}
                className="float-right"
                src={threedots}
                alt=""
              ></Image> */}
            </div>
            <div className="border-b-2 px-2 py-4">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-gray-300 p-2 pl-10 pr-4 text-sm text-gray-900 outline-none"
                  placeholder="Search"
                  onChange={(e) => filterconvo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              {conversations !== null ? (
                conversations.map((convo, index) => (
                  // <>{convo.from_user.id != logindata.id ?
                  <button
                    key={index}
                    onClick={() =>
                      convoname(
                        convo.name,
                        convo.from_user.id !== logindata.id ? convo.from_user : convo.to_user
                      )
                    }
                    className="w-full flex cursor-pointer flex-row items-center justify-center border-b-2 px-2 py-4 hover:bg-blue-50 active:bg-blue-100"
                  >
                    <div className="ml-4 w-1/4">
                      <div className="relative">
                        <Image
                          height={100}
                          width={100}
                          src={
                            convo.from_user.id !== logindata.id
                              ? convo.from_user.images_logo &&
                                convo.from_user.images_logo === "/static/images/blank.png"
                                ? "https://www.api.alanced.com" + "/media/images/blank.png"
                                : "https://www.api.alanced.com" + convo.from_user.images_logo
                              : convo.to_user.images_logo &&
                                  convo.to_user.images_logo === "/static/images/blank.png"
                                ? "https://www.api.alanced.com" + "/media/images/blank.png"
                                : "https://www.api.alanced.com" + convo.to_user.images_logo
                          }
                          className="h-12 w-12 rounded-full object-cover"
                          alt=""
                        />
                        <span className="absolute bottom-0 left-8 h-3 w-3 rounded-full border-[3px] border-blue-400 bg-white dark:border-gray-800"></span>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="font-cardo w-fit text-lg font-semibold text-[#031136]">
                        {convo.from_user.id !== logindata.id ? (
                          <>
                            {convo.from_user.first_Name} {convo.from_user.last_Name}
                          </>
                        ) : (
                          <>
                            {convo.to_user.first_Name} {convo.to_user.last_Name}
                          </>
                        )}
                      </div>
                      <div className="flex-row">
                        <span className="float-left w-full text-left text-xs text-[#8A8A8A]">
                          {convo.from_user.id !== logindata.id ? (
                            <>{convo.from_user.category}</>
                          ) : (
                            <>{convo.to_user.category}</>
                          )}
                        </span>
                        <span className="float-left text-[10px] text-[#8A8A8A]">
                          {convo.content.length >= 45
                            ? convo.content.substring(0, 45) + "..."
                            : convo.content}
                        </span>
                      </div>
                    </div>
                  </button>
                  // : <></>}
                  // </>
                ))
              ) : (
                <></>
              )}
            </div>
            {/* <div
          class="flex flex-row py-4 px-2 items-center border-b-2"
        >
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">MERN Stack</div>
            <span class="text-gray-500">Lusi : Thanks Everyone</span>
          </div>
        </div>
        <div class="flex flex-row py-4 px-2 items-center border-b-2">
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Javascript Indonesia</div>
            <span class="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        <div class="flex flex-row py-4 px-2 items-center border-b-2">
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Javascript Indonesia</div>
            <span class="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        <div class="flex flex-row py-4 px-2 items-center border-b-2">
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Javascript Indonesia</div>
            <span class="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div> */}
          </div>

          <div className="flex w-full flex-col justify-between">
            <div className="flex h-16 items-center justify-between border-b-2 p-2">
              <div>
                <div className="flex w-fit items-center gap-2">
                  <div className="h-3 w-3 rounded-full border-2 border-[#07BC00]"></div>
                  <span className="font-cardo text-[20px] text-[#031136]">
                    {convouser?.first_Name} {convouser?.last_Name}
                  </span>
                </div>
                <span className="float-left ml-5 text-[12px] text-[#8A8A8A]">
                  {/* 3:06 PM EDTAlgorithm and Software Developer */}
                  {/* {convouser?.category} */}
                  {convouser && "category" in convouser ? convouser.category : ""}
                </span>
              </div>
              <div className="float-right flex items-center gap-2">
                {/* <img className="h-[19px] w-[19px]" src={phone}/> */}
                <Image
                  height={100}
                  width={100}
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={iicon}
                  alt=""
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="px-2">
              <div
                id="scrollableDiv"
                className="flex h-[56vh] flex-col-reverse overflow-y-auto pr-2"
              >
                {/* <div class="flex justify-between mb-4">
          <div className="flex justify-start">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="flex-row">
            <div
              class="ml-2 py-3 px-4 text-left w-[45vw] rounded-lg text-[#0A142F]"
            >
              Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            </div>
            <span className="text-xs text-[#D7D7D7] float-left ml-6">Yesterday at 8:00 pm</span>
            </div>
            </div>
            <img className="w-fit h-fit" src={vthreedots}/>
          </div>
          <div class="flex justify-end mb-4">
            <div className="flex-row">
            <div
              class="mr-2 py-3 px-4 w-[45vw] text-left bg-[#F6FAFD] rounded-md text-[#0A142F]"
            >
              Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            </div>
            <span className="text-xs text-[#D7D7D7] float-right mr-3">Yesterday at 8:00 pm</span>
            </div>
            {/* <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            /> */}
                {/* <img className="w-fit h-fit" src={vthreedots}/>
          </div> */}
                {/* <div class="flex justify-between mb-4">
            <div className="flex justify-start">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="flex-row">
            <div
              class="ml-2 py-3 px-4 text-left w-[45vw] rounded-lg text-[#0A142F]"
            >
              Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            </div>
            <span className="text-xs text-[#D7D7D7] float-left ml-6">Yesterday at 8:00 pm</span>
            </div>
            </div>
            <img className="h-fit w-fit" src={vthreedots} alt=""/>
          </div> */}
                <InfiniteScroll
                  dataLength={messageHistory.length}
                  next={() => fetchMessages()}
                  hasMore={hasMoreMessages}
                  loader={<h1>Loading...</h1>}
                  inverse={true}
                  className="flex flex-col-reverse"
                  scrollableTarget="scrollableDiv"
                  endMessage={<p>no more messages...</p>}
                >
                  {messageHistory !== null ? (
                    messageHistory.map((message, index) => (
                      <div
                        key={index}
                        className={
                          message.from_user.id === logindata.id
                            ? "mb-4 flex justify-end"
                            : "mb-4 flex justify-between"
                        }
                      >
                        <div className="flex-row">
                          <div
                            // className="min:w-fit max:w-[45vw] mr-2 rounded-md bg-[#F6FAFD] px-4 py-3 text-left text-[#0A142F]"   for use
                            className={
                              message.from_user.id === logindata.id
                                ? "min:w-fit max:w-[45vw] mr-2 rounded-md bg-[#F6FAFD] px-4 py-3 text-left text-[#0A142F]"
                                : "mr-2 w-[45vw] rounded-md px-4 py-3 text-left text-[#0A142F]"
                            }
                          >
                            {/* Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  */}
                            {message.content}
                          </div>
                          <span
                            className={`float-right mr-3 text-xs text-[#D7D7D7] ${
                              message.from_user.id === logindata.id ? "float-right" : "float-left"
                            }`}
                          >
                            {formatDate(message.timestamp)} {formatTimeStamp(message.timestamp)}
                          </span>
                        </div>
                        {/* <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            /> */}
                        <Image
                          height={100}
                          width={100}
                          className="h-fit w-fit"
                          src={vthreedots}
                          alt=""
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </InfiniteScroll>
                {/* {hasMoreMessages && <p>Loading...</p>}
      {!hasMoreMessages && <p>No more messages...</p>} */}
                <div className="mb-4 flex justify-end">
                  {/* <div className="flex-row">
            <AudioMessages/>
            <span className="text-xs text-[#D7D7D7] float-right mr-3">Yesterday at 8:00 pm</span>
            </div> */}
                  {/* <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            /> */}
                  {/* <img className="w-fit h-fit mt-2 ml-2" src={vthreedots}/> */}
                </div>

                {/* <AudioVisualizer audioSrc={file_example_MP3_5MG}/> */}
                {/* <AudioMessages/> */}
                {/* <div class="flex justify-end mb-4">
            <div>
              <div
                class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Magnam, repudiandae.
              </div>

              <div
                class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, reiciendis!
              </div>
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div> */}
                {/* <div class="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              happy holiday guys!
            </div>
          </div> */}
              </div>
              <div className="py-3 pb-1">
                {/* <input
            class="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          /> */}
                <div className="rounded-lg border-2 border-[#E7E8F2] p-1 pb-2">
                  <textarea
                    rows={3}
                    className="block w-full resize-none p-2.5 text-sm outline-none"
                    name="message"
                    value={message}
                    required
                    maxLength={511}
                    onChange={handleChangeMessage}
                    onKeyDown={handleKeyDown}
                    placeholder="Type Message Here ..."
                  ></textarea>
                  <div className="mr-2 flex justify-end gap-2">
                    {/* <img src={smiley}/>
            <img src={attherate}/>
            <img src={paperpin}/> */}
                    <button
                      disabled={message.length === 0 ? true : false}
                      onClick={handleSubmit}
                    >
                      <Image
                        height={100}
                        width={100}
                        className="cursor-pointer border-l-2 border-[#D9D9D9] pl-2"
                        src={paper}
                        alt=""
                        style={{ height: "3vh", width: "3vw" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`h-[86.1vh] overflow-hidden border-l-2 transition-all duration-500 ease-in-out ${
              isClicked ? "w-2/5" : "w-0 pl-8"
            }`}
          >
            <div
              className={`transition-opacity duration-300 ease-in-out ${
                isClicked ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                height={15}
                width={15}
                className="float-right mr-6 mt-6 cursor-pointer"
                src={cross}
                alt=""
                onClick={handleClick}
              />
              <div className="flex w-full flex-col items-center border-b-2">
                {/* <div class="font-semibold text-xl py-4">Mern Stack Group</div> */}
                <Image
                  height={100}
                  width={100}
                  src={
                    convouser?.images_logo && convouser.images_logo !== "/static/images/blank.png"
                      ? `https://www.api.alanced.com${convouser.images_logo}`
                      : "https://www.api.alanced.com/media/images/blank.png"
                  }
                  className="mt-12 h-28 w-28 rounded-full object-cover"
                  alt=""
                />
                <div className="font-cardo pt-4 text-xl">
                  {convouser?.first_Name} {convouser?.last_Name}
                </div>
                <div className="text-sm text-[#797979]">
                  {/* 5:18 AM GMT+10 (4.5 h ahead) */}
                  {time.toLocaleTimeString()} IST
                </div>
                <div className="mb-6 text-xs text-[#0A142F]">
                  {/* UI Designer - Complex Topics, Simple Designs */}
                  {/* {convouser?.category} */}
                  {convouser && "category" in convouser ? convouser.category : ""}
                </div>
              </div>
              {/* <div className="flex flex-col items-start pl-6 pt-6">
                <span className="font-cardo mb-2 text-lg">Recent files</span>
                <div className="flex items-center py-2">
                  <Image
                    height={100}
                    width={100}
                    className="mr-2 h-3.5 w-3.5"
                    src={search}
                    alt=""
                  />

                  <span className="text-[#8A8A8A]">Search Messages</span>
                </div>
                <div className="flex items-center py-2">
                  <Image
                    height={100}
                    width={100}
                    className="mr-2 h-4 w-4"
                    src={people}
                    alt=""
                  />

                  <span className="text-[#8A8A8A]">People</span>
                </div>
                <div className="flex items-center py-2">
                  <Image
                    height={100}
                    width={100}
                    className="mr-2 h-4 w-4"
                    src={files}
                    alt=""
                  />

                  <span className="text-[#8A8A8A]">Files & Links</span>
                </div>
                <div className="flex items-center py-2">
                  <Image
                    height={100}
                    width={100}
                    className="mr-2 h-4 w-4"
                    src={notepad}
                    alt=""
                  />

                  <span className="text-[#8A8A8A]">Personal Notepad</span>
                </div>
              </div> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Messages;

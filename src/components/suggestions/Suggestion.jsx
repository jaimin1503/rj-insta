import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar";

export default function Suggestion() {
  const data = [
    {
      id: "660a42c96fac49d9bfb35b11",
      name: "Jaimin",
      username: "Jaimin_15",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703326732/nlixnatx1orjebu5jbqr.jpg",
    },
    {
      id: "65769c40d8026b1f74aaa53b",
      name: "Ranjeet",
      username: "Ranjeet_62",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1702476419/fyouzysyu8oooxhwhs22.jpg",
    },
    {
      id: "65769cb449dc5125fb92ac99",
      name: "Hardik",
      username: "Hardik_12",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703060075/trwfcbtn6uakawkv718o.jpg",
    },
    {
      id: "6575dbc8ac0833b9ef3645f5",
      name: "Ashish",
      username: "Ashish007",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703177734/bdathabk1f7auzqydlzb.jpg",
    },
    {
      id: "657859f0bffee8e91147b12c",
      name: "Dakshil",
      username: "Dakshil_10",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703060204/cmje5f2jkc0vyjh72ytb.jpg",
    },
    {
      id: "65769cb449dc5125fb92ac99",
      username: "john_smith",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1702633260/pqagdjf4g9byuvgj79t3.jpg",
      name: "John Smith",
    },
    {
      id: "65769cb449dc5125fb92ac99",
      username: "emily_johnson",
      image:
        "https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg",
      name: "Emily Johnson",
    },
    {
      id: "65769c40d8026b1f74aaa53b",
      username: "alex_doe",
      image:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1711929600&semt=sph",
      name: "Alex Doe",
    },
    {
      id: "65769c40d8026b1f74aaa53b",
      username: "sarah_adams",
      image:
        "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
      name: "Sarah Adams",
    },
    {
      id: "65769c40d8026b1f74aaa53b",
      username: "michael_brown",
      image:
        "https://img.freepik.com/premium-photo/close-up-young-handsome-bearded-shirtless-man-standing-isolated-white_171337-71977.jpg",
      name: "Michael Brown",
    },
  ];
  const Suggestion = [];
  const indexs = [];
  while (indexs.length < 5) {
    const index = Math.floor(Math.random() * data.length);
    if (!indexs.includes(index)) {
      indexs.push(index);
    }
  }
  for (const i in indexs) {
    Suggestion.push(data[i]);
  }
  return (
    <>
      <div className="w-80 h-screen border-l">
        <p className="p-5 text-xl font-semibold border-b">Suggestions</p>
        {Suggestion?.map((profile) => {
          return (
            <Link key={profile.id} to={`/viewprofile/${profile.id}`}>
              <UserAvatar profile={profile} key={profile.id} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

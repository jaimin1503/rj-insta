import image from "./assets/jatuu.jpg";

export default function UserAvatar({ profile }) {
  const data = [
    {
      id: 1,
      name: "Jaimin",
      username: "Jaimin_15",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703326732/nlixnatx1orjebu5jbqr.jpg",
    },
    {
      id: 2,
      name: "Ranjeet",
      username: "Ranjeet_62",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1702476419/fyouzysyu8oooxhwhs22.jpg",
    },
    {
      id: 3,
      name: "Hardik",
      username: "Hardik_12",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703060075/trwfcbtn6uakawkv718o.jpg",
    },
    {
      id: 4,
      name: "Ashish",
      username: "Ashish007",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703177734/bdathabk1f7auzqydlzb.jpg",
    },
    {
      id: 5,
      name: "Dakshil",
      username: "Dakshil_10",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1703060204/cmje5f2jkc0vyjh72ytb.jpg",
    },
    {
      username: "john_smith",
      image:
        "http://res.cloudinary.com/daqldosvw/image/upload/v1702633260/pqagdjf4g9byuvgj79t3.jpg",
      name: "John Smith",
    },
    {
      username: "emily_johnson",
      image:
        "https://st.depositphotos.com/1770836/1372/i/450/depositphotos_13720689-stock-photo-young-businesswoman.jpg",
      name: "Emily Johnson",
    },
    {
      username: "alex_doe",
      image:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1711929600&semt=sph",
      name: "Alex Doe",
    },
    {
      username: "sarah_adams",
      image:
        "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
      name: "Sarah Adams",
    },
    {
      username: "michael_brown",
      image:
        "https://img.freepik.com/premium-photo/close-up-young-handsome-bearded-shirtless-man-standing-isolated-white_171337-71977.jpg",
      name: "Michael Brown",
    },
  ];
}
return (
  <>
    <div className=" flex items-center p-3">
      <div className="image pr-2">
        <img
          className=" w-[44px] h-[44px] object-cover rounded-full"
          src={image}
          alt="image"
        />
      </div>
      <div className="info">
        <p>Jaimin_15</p>
        <p className=" text-sm">Jaimin Viramgama</p>
      </div>
    </div>
  </>
);

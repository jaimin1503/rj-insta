const Grid = (props) => {
  return (
    <div>
      <svg
        fill={props.stroke}
        className=" h-6 w-6 cursor-pointer"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>grid</title>
        <path d="M3 9.75h5c0.966-0.001 1.749-0.784 1.75-1.75v-5c-0.001-0.966-0.784-1.749-1.75-1.75h-5c-0.966 0.001-1.749 0.784-1.75 1.75v5c0.001 0.966 0.784 1.749 1.75 1.75h0zM2.75 3c0-0.138 0.112-0.25 0.25-0.25h5c0.138 0 0.25 0.112 0.25 0.25v5c-0 0.138-0.112 0.25-0.25 0.25h-5c-0.138-0-0.25-0.112-0.25-0.25v-0zM13.5 9.75h5c0.966-0.001 1.749-0.784 1.75-1.75v-5c-0.001-0.966-0.784-1.749-1.75-1.75h-5c-0.966 0.001-1.749 0.784-1.75 1.75v5c0.001 0.966 0.784 1.749 1.75 1.75h0zM13.25 3c0-0.138 0.112-0.25 0.25-0.25h5c0 0 0 0 0 0 0.138 0 0.25 0.112 0.25 0.25 0 0 0 0 0 0v0 5c0 0 0 0 0 0 0 0.138-0.112 0.25-0.25 0.25-0 0-0 0-0 0h-5c-0.138-0-0.25-0.112-0.25-0.25v-0zM24 9.723h4.973c0.966-0.001 1.749-0.784 1.75-1.75v-4.973c-0.001-0.966-0.784-1.749-1.75-1.75h-4.973c-0.966 0.001-1.749 0.784-1.75 1.75v4.973c0.001 0.966 0.784 1.749 1.75 1.75h0zM23.75 3c0-0 0-0 0-0 0-0.138 0.112-0.25 0.25-0.25 0 0 0 0 0 0h4.973c0 0 0 0 0 0 0.138 0 0.25 0.112 0.25 0.25 0 0 0 0 0 0v0 4.973c0 0 0 0 0 0 0 0.138-0.112 0.25-0.25 0.25-0 0-0 0-0 0h-4.973c-0 0-0 0-0 0-0.138 0-0.25-0.112-0.25-0.25 0-0 0-0 0-0v0zM3.014 20.25h5c0.966-0.001 1.749-0.784 1.75-1.75v-5c-0.001-0.966-0.784-1.749-1.75-1.75h-5c-0.966 0.001-1.749 0.784-1.75 1.75v5c0.001 0.966 0.784 1.749 1.75 1.75h0zM2.764 13.5c0-0.138 0.112-0.25 0.25-0.25h5c0.138 0 0.25 0.112 0.25 0.25v5c0 0 0 0 0 0 0 0.138-0.112 0.25-0.25 0.25-0 0-0 0-0 0h-5c-0 0-0 0-0 0-0.138 0-0.25-0.112-0.25-0.25 0-0 0-0 0-0v0zM13.514 20.25h5c0.966-0.001 1.749-0.784 1.75-1.75v-5c-0.001-0.966-0.784-1.749-1.75-1.75h-5c-0.966 0.001-1.749 0.784-1.75 1.75v5c0.001 0.966 0.784 1.749 1.75 1.75h0zM13.264 13.5c0-0.138 0.112-0.25 0.25-0.25h5c0 0 0 0 0 0 0.138 0 0.25 0.112 0.25 0.25 0 0 0 0 0 0v0 5c0 0 0 0 0 0.001 0 0.138-0.112 0.249-0.249 0.249-0 0-0.001 0-0.001 0h-5c-0 0-0 0-0 0-0.138 0-0.25-0.112-0.25-0.25 0-0 0-0 0-0v0zM24.014 20.223h4.973c0.966-0.001 1.749-0.784 1.75-1.75v-4.973c-0.001-0.966-0.784-1.749-1.75-1.75h-4.973c-0.966 0.001-1.749 0.784-1.75 1.75v4.973c0.001 0.966 0.784 1.749 1.75 1.75h0zM23.764 13.5c0-0 0-0 0-0 0-0.138 0.112-0.25 0.25-0.25 0 0 0 0 0 0h4.973c0 0 0 0 0 0 0.138 0 0.25 0.112 0.25 0.25 0 0 0 0 0 0v0 4.973c0 0 0 0 0 0.001 0 0.138-0.112 0.249-0.249 0.249-0 0-0.001 0-0.001 0h-4.973c-0 0-0 0-0.001 0-0.138 0-0.249-0.112-0.249-0.249 0-0 0-0.001 0-0.001v0zM8.027 22.25h-5c-0.966 0.001-1.749 0.784-1.75 1.75v5c0.001 0.966 0.784 1.749 1.75 1.75h5c0.966-0.001 1.749-0.784 1.75-1.75v-5c-0.001-0.966-0.784-1.749-1.75-1.75h-0zM8.277 29c0 0 0 0 0 0 0 0.138-0.112 0.25-0.25 0.25-0 0-0 0-0 0h-5c-0 0-0 0-0 0-0.138 0-0.25-0.112-0.25-0.25 0-0 0-0 0-0v0-5c0-0 0-0 0-0 0-0.138 0.112-0.25 0.25-0.25 0 0 0 0 0 0h5c0 0 0 0 0 0 0.138 0 0.25 0.112 0.25 0.25 0 0 0 0 0 0v0zM18.527 22.25h-5c-0.966 0.001-1.749 0.784-1.75 1.75v5c0.001 0.966 0.784 1.749 1.75 1.75h5c0.966-0.001 1.749-0.784 1.75-1.75v-5c-0.001-0.966-0.784-1.749-1.75-1.75h-0zM18.777 29c0 0 0 0 0 0.001 0 0.138-0.112 0.249-0.249 0.249-0 0-0.001 0-0.001 0h-5c-0 0-0 0-0 0-0.138 0-0.25-0.112-0.25-0.25 0-0 0-0 0-0v0-5c0-0 0-0 0-0 0-0.138 0.112-0.25 0.25-0.25 0 0 0 0 0 0h5c0 0 0 0 0.001 0 0.138 0 0.249 0.112 0.249 0.249 0 0 0 0.001 0 0.001v-0zM29 22.25h-4.973c-0.966 0.001-1.749 0.784-1.75 1.75v4.973c0.001 0.966 0.784 1.749 1.75 1.75h4.973c0.966-0.001 1.749-0.784 1.75-1.75v-4.973c-0.001-0.966-0.784-1.749-1.75-1.75h-0zM29.25 28.973c0 0 0 0 0 0.001 0 0.138-0.112 0.249-0.249 0.249-0 0-0.001 0-0.001 0h-4.973c-0 0-0 0-0.001 0-0.138 0-0.249-0.112-0.249-0.249 0-0 0-0.001 0-0.001v0-4.973c0-0 0-0 0-0.001 0-0.138 0.112-0.249 0.249-0.249 0 0 0.001 0 0.001 0h4.973c0 0 0 0 0.001 0 0.138 0 0.249 0.112 0.249 0.249 0 0 0 0.001 0 0.001v-0z"></path>
      </svg>
    </div>
  );
};
export default Grid;

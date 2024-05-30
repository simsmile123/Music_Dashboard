import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import "../styles/likedsongs.css";

const LikedSongs = () => {
  const { userData } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);
  const [artistInfo, setArtistInfo] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/spotify/liked-tracks",
          {
            params: { access_token: accessToken },
          }
        );
        setLikedSongs(response.data.items);
      } catch (error) {
        console.error("Error fetching liked songs", error);
      }
    };

    if (accessToken) {
      fetchLikedSongs();
    }
  }, [accessToken]);

  return (
    <>
      <div className="liked-songs-header">
        <h1 id="liked-songs-base">Liked Songs</h1>
        {/* <p> {user.username} {user.songs-liked}</p> */}
      </div>
      <div className="liked-songs-list">{/* Import UI library table*/}</div>
    </>
  );
};

export default LikedSongs;

// import React, { useCallback } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Tooltip,
// } from "@nextui-org/react";
// // import { EditIcon, DeleteIcon, EyeIcon } from "./EditIcon";
// // import { columns, users } from "./data";
// import "/src/styles/likedsongs.css";

// export const LikedSongs = () => {
//   const statusColorMap = {
//     active: "success",
//     paused: "danger",
//     vacation: "warning",
//   };

//   const renderCell = useCallback((user, columnKey) => {
//     const cellValue = user[columnKey];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{ radius: "lg", src: user.avatar }}
//             description={user.email}
//             name={cellValue}
//           />
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-sm capitalize">{cellValue}</p>
//             <p className="text-bold text-sm capitalize text-default-400">
//               {user.team}
//             </p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip
//             className="capitalize"
//             color={statusColorMap[user.status]}
//             size="sm"
//             variant="flat"
//           >
//             {cellValue}
//           </Chip>
//         );
//         //   case "actions":
//         //     return (
//         //       <div className="relative flex items-center gap-2">
//         //         <Tooltip content="Details">
//         //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//         //             <EyeIcon />
//         //           </span>
//         //         </Tooltip>
//         //         <Tooltip content="Edit user">
//         //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//         //             <EditIcon />
//         //           </span>
//         //         </Tooltip>
//         //         {/* <Tooltip color="danger" content="Delete user">
//         //           <span className="text-lg text-danger cursor-pointer active:opacity-50">
//         //             <DeleteIcon />
//         //           </span>
//         //         </Tooltip> */}
//         //       </div>
//         //     );
//         //   default:
//         return cellValue;
//     }
//   }, []);

//   return (
//     <>
//       <h1>Liked Songs</h1>
//       <Table
//         className="custom-table"
//         aria-label="Example table with custom cells"
//       >
//         <TableHeader>
//           {columns.map((column) => (
//             <TableColumn key={column.uid} className="custom-table-header">
//               {column.name}
//             </TableColumn>
//           ))}
//         </TableHeader>
//         <TableBody items={users}>
//           {(item) => (
//             <TableRow key={item.id} className="custom-table-row">
//               {Object.keys(columns).map((columnKey) => (
//                 <TableCell
//                   key={columnKey}
//                   className={
//                     columnKey === "actions"
//                       ? "custom-actions-cell"
//                       : "custom-table-cell"
//                   }
//                 >
//                   {renderCell(item, columnKey)}
//                 </TableCell>
//               ))}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

// export default LikedSongs;

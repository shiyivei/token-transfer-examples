import * as iotex from "../iotex";
import { useEffect, useState } from "react";

// function FComponent() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>
//         {count}
//       </button>
//     </div>
//   );
// }

const Contract_owner = ({
  owner,
  setOwner,
}: {
  owner: any;
  setOwner: any;
}) => {
  const [loading, setLoading] = useState(false);
  const getOwner = async () => {
    const owner =
      await iotex.get_contractBalance();
    console.log(
      "-------- contract owner --------:",
      owner
    );
    if (owner) {
      setOwner(owner);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  return <>{owner}</>;
};

export default Contract_owner;

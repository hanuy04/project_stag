
import middleware from "@/utils/verifyUser";


const handler = async (req, res) => {
  if (req.method === "GET") {
    return res.json("sukses");
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default middleware(handler, ["student", "osis", "teacher"]);

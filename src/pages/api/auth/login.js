import AuthController from "@/server/controller/AuthController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await AuthController.login(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { verifyToken } from "../utils/securityHelpers";


export const authenticateToken = (req: any, res: any,next:any) => {
  const authHeader = req.headers["authentication"];
  if (!authHeader) {
    return req.status(401).json({ Message: "Token is not provided." });
  }
  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);
  if (!userData) {
    return res.status(401).json({ Message: "Invalid token found." });
  }
  const userDataWithType = userData as any;
  req.userId = userDataWithType.id;
  next()
};
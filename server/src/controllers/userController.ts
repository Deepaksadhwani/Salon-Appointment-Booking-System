import { getUser, insertUser } from "../services/userService";
import {
  generateToken,
  hashPassword,
  verifyingPassword,
} from "../utils/securityHelpers";
import { signinSchema, signupSchema } from "../utils/zodSchemas";

/*-------------------------signup----------------------------- */

export const signupController = async (req: any, res: any) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ Message: parsed.error });
  }
  const response = await getUser(parsed.data.email);
  if (response) {
    return res.status(400).json({ Message: `User already exists.` });
  }
  try {
    let { fullName, password, email } = parsed.data;
    password = await hashPassword(password, 10);

    const userData = await insertUser(email, fullName, password);
    console.log(fullName);
    const token = generateToken(userData.id);
    res.setHeader("authorization", `bearer ${token}`);
    res.status(201).json({
      Message: "Your account is successfully created.",
      data: { name: userData.fullName, email: userData.email },
    });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
};

/*-------------------------signin----------------------------- */

export const signinController = async (req: any, res: any) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ Message: parsed.error });
  }
  try {
    const response = await getUser(parsed.data.email);
    if (response) {
      const isValid = await verifyingPassword(
        req.body.password,
        response.password
      );
      if (isValid) {
        const token = generateToken(response.id);
        res.setHeader("authorization", `bearer ${token}`);
        res.status(200).json({
          Message: "Logged In successfully",
          data: {
            name: response.fullName,
            email: response.email,
            photoUrl: response.photoUrl,
            role: response.role,
          },
        });
      } else {
        res.status(404).json({ Message: "Invalid password entered." });
      }
    } else {
      res.status(404).json({ Message: "User does not exist." });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
};

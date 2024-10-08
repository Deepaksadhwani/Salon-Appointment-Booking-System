import dotenv from "dotenv";
dotenv.config();
/*---------------------------Updating User Profile------------------------*/

import {
  getUserProfileData,
  updateUserProfile,
} from "../services/profileService";
import { updateUserSchema } from "../utils/zodSchemas";

export const updateUserProfileController = async (req: any, res: any) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(404)
      .json({ Message: "Input is missing.", data: parsed.error });
  }

  const id = req.userId;
  const { fullName, photoUrl, role } = parsed.data;
  let updateRole = role;
  if (role == process.env.ADMIN_SECRECT_KEY) {
    updateRole = "admin";
  }
  try {
    const response = await updateUserProfile(
      id,
      fullName,
      photoUrl,
      updateRole
    );
    res.status(201).json({
      Message: "Your profile detail has been updated.",
      data: { fullName: response.fullName, photoUrl: response.photoUrl },
    });
  } catch (error) {
    res.status(500).json({ Message: "Internal Server found." });
  }
};

/*------------------fetching updated userData of profile-----------------*/

export const getUserProfileDataController = async (req: any, res: any) => {
  try {
    const id = req.userId;
    const data = await getUserProfileData(id);
    res.status(200).json({ Message: "User info successfully fetched.", data });
  } catch (error) {
    res.status(500).json({ Message: "Internal server Error." });
  }
};

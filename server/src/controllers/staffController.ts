import { addStaffMember, fetchAllStaff } from "../services/staffService";
import { StaffMemberSchema } from "../utils/zodSchemas";

export const addStaffMemberController = async (req: any, res: any) => {
  const parsed = StaffMemberSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ Message: "Invalid input found.", data: parsed.error });
  }
  try {
    const response = await addStaffMember(parsed.data);
    if (response) {
      res.status(201).json({ Message: "Staff has been successfully added." });
    } else {
      res.status(500).json({ Message: "Unable to insert in Database." });
    }
  } catch (error) {
    res.status(500).status("Internal server error.");
  }
};

/*----------------------get all staff---------------------------*/
export const fetchAllStaffController = async (req: any, res: any) => {
  try {
    const response = await fetchAllStaff();
    if (response) {
      res.status(201).json({ Message: "Staff has been successfully fetched.",data:response });
    } else {
      res.status(500).json({ Message: "Unable to fetch from Database." });
    }
  } catch (error) {
    res.status(500).status("Internal server error.");
  }
};
